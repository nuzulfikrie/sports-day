<?php

namespace App\Http\Controllers;

use App\Models\AgeGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AgeGroupController extends Controller
{
    public function index()
    {
        $ageGroups = AgeGroup::with(['events', 'students'])
            ->where('tenant_id', Auth::user()->tenant_id)
            ->withCount(['events', 'students'])
            ->get();

        return Inertia::render('AgeGroups/Index', [
            'ageGroups' => $ageGroups,
        ]);
    }

    public function create()
    {
        return Inertia::render('AgeGroups/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'min_age' => 'required|integer|min:5|max:20',
            'max_age' => 'required|integer|min:5|max:20|gte:min_age',
            'description' => 'nullable|string',
            'max_participants_per_event' => 'required|integer|min:1|max:100',
            'max_events_per_student' => 'required|integer|min:1|max:20',
        ]);

        AgeGroup::create([
            ...$validated,
            'tenant_id' => Auth::user()->tenant_id,
        ]);

        return redirect()->route('age-groups.index')
            ->with('success', 'Age group created successfully.');
    }

    public function show(AgeGroup $ageGroup)
    {
        $ageGroup->load([
            'events' => function ($query) {
                $query->orderBy('start_time', 'asc');
            },
            'students.sportHouse',
            'sportTeams',
        ]);

        return Inertia::render('AgeGroups/Show', [
            'ageGroup' => $ageGroup,
        ]);
    }

    public function edit(AgeGroup $ageGroup)
    {
        return Inertia::render('AgeGroups/Form', [
            'ageGroup' => $ageGroup,
        ]);
    }

    public function update(Request $request, AgeGroup $ageGroup)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'min_age' => 'required|integer|min:5|max:20',
            'max_age' => 'required|integer|min:5|max:20|gte:min_age',
            'description' => 'nullable|string',
            'max_participants_per_event' => 'required|integer|min:1|max:100',
            'max_events_per_student' => 'required|integer|min:1|max:20',
        ]);

        $ageGroup->update($validated);

        return redirect()->route('age-groups.index')
            ->with('success', 'Age group updated successfully.');
    }

    public function destroy(AgeGroup $ageGroup)
    {
        $ageGroup->delete();

        return redirect()->route('age-groups.index')
            ->with('success', 'Age group deleted successfully.');
    }
}
