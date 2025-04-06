<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\User;
use App\Models\Event;
use App\Models\Student;
use App\Models\SportHouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Admin dashboard with system-wide statistics
     */
    public function dashboard()
    {
        // Get system-wide statistics
        $stats = [
            'tenants' => [
                'total' => Tenant::count(),
                'active' => Tenant::where('status', 'active')->count(),
                'latest' => Tenant::latest()->take(5)->get()
            ],
            'users' => [
                'total' => User::count(),
                'active' => User::where('status', 'active')->count(),
                'admins' => User::where('is_admin', true)->count()
            ],
            'events' => [
                'total' => Event::count(),
                'active' => Event::where('status', 'in_progress')->count(),
                'completed' => Event::where('status', 'completed')->count()
            ],
            'students' => [
                'total' => Student::count()
            ],
            'houses' => [
                'total' => SportHouse::count()
            ]
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }

    /**
     * Display a listing of all users
     */
    public function users(Request $request)
    {
        $query = User::with('tenant');

        // Filter by tenant if specified
        if ($request->has('tenant_id') && $request->tenant_id) {
            $query->where('tenant_id', $request->tenant_id);
        }

        $users = $query->paginate(15)->appends($request->all());

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new user
     */
    public function createUser()
    {
        $tenants = Tenant::where('status', 'active')->get();

        return Inertia::render('Admin/Users/Form', [
            'tenants' => $tenants
        ]);
    }

    /**
     * Store a newly created user
     */
    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', Password::defaults()],
            'password_confirmation' => 'required|same:password',
            'tenant_id' => 'required|exists:tenants,id',
            'is_admin' => 'boolean',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'tenant_id' => $validated['tenant_id'],
            'is_admin' => $validated['is_admin'] ?? false,
        ]);

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified user
     */
    public function showUser(User $user)
    {
        $user->load('tenant');

        // Get user's recent activity (placeholder - you would need to implement an activity tracking system)
        $activity = []; // This would come from an actual activity log

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'activity' => $activity
        ]);
    }

    /**
     * Show the form for editing a user
     */
    public function editUser(User $user)
    {
        $tenants = Tenant::where('status', 'active')->get();

        return Inertia::render('Admin/Users/Form', [
            'user' => $user,
            'tenants' => $tenants
        ]);
    }

    /**
     * Update the specified user
     */
    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'tenant_id' => 'required|exists:tenants,id',
            'is_admin' => 'boolean',
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ]);

        $data = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'tenant_id' => $validated['tenant_id'],
            'is_admin' => $validated['is_admin'] ?? false,
        ];

        if (!empty($validated['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }

        $user->update($data);

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user
     */
    public function destroyUser(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }

    /**
     * Display a listing of all tenants
     */
    public function tenants()
    {
        $tenants = Tenant::withCount(['users', 'sportHouses', 'events', 'students'])
            ->paginate(15);

        return Inertia::render('Admin/Tenants/Index', [
            'tenants' => $tenants
        ]);
    }

    /**
     * Display a specific tenant
     */
    public function showTenant(Tenant $tenant)
    {
        // Get tenant statistics
        $stats = [
            'users_count' => $tenant->users()->count(),
            'sport_houses_count' => $tenant->sportHouses()->count(),
            'events_count' => $tenant->events()->count(),
            'students_count' => $tenant->students()->count(),
        ];

        return Inertia::render('Admin/Tenants/Show', [
            'tenant' => $tenant,
            'stats' => $stats
        ]);
    }

    /**
     * Show the form for creating a new tenant
     */
    public function createTenant()
    {
        return Inertia::render('Admin/Tenants/Form');
    }

    /**
     * Store a newly created tenant
     */
    public function storeTenant(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $tenant = Tenant::create($validated);

        return redirect()->route('admin.tenants.index')->with('success', 'Tenant created successfully.');
    }

    /**
     * Show the form for editing a tenant
     */
    public function editTenant(Tenant $tenant)
    {
        return Inertia::render('Admin/Tenants/Form', [
            'tenant' => $tenant
        ]);
    }

    /**
     * Update the specified tenant
     */
    public function updateTenant(Request $request, Tenant $tenant)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $tenant->update($validated);

        return redirect()->route('admin.tenants.index')->with('success', 'Tenant updated successfully.');
    }

    /**
     * Remove the specified tenant
     */
    public function destroyTenant(Tenant $tenant)
    {
        // Check if tenant has users, events, etc. before deleting
        if ($tenant->users()->count() > 0 || $tenant->events()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete tenant with associated users or events.');
        }

        $tenant->delete();

        return redirect()->route('admin.tenants.index')->with('success', 'Tenant deleted successfully.');
    }

    /**
     * System settings page
     */
    public function settings()
    {
        return Inertia::render('Admin/Settings');
    }

    /**
     * Reports dashboard
     */
    public function reports()
    {
        return Inertia::render('Admin/Reports');
    }

    /**
     * Event management for admin
     */
    public function events()
    {
        $events = Event::with(['tenant', 'ageGroup', 'sportHouse'])
            ->withCount('participants')
            ->paginate(15);

        return Inertia::render('Admin/Events/Index', [
            'events' => $events
        ]);
    }

    /**
     * Age groups management for admin
     */
    public function ageGroups()
    {
        $ageGroups = \App\Models\AgeGroup::with('tenant')
            ->withCount('students', 'events')
            ->paginate(15);

        return Inertia::render('Admin/AgeGroups/Index', [
            'ageGroups' => $ageGroups
        ]);
    }

    /**
     * Teams management for admin
     */
    public function teams()
    {
        $teams = SportHouse::with(['tenant', 'events'])
            ->withCount('students')
            ->paginate(15);

        return Inertia::render('Admin/Teams/Index', [
            'teams' => $teams
        ]);
    }
}
