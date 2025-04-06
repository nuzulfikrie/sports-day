<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\SportHouseController;
use App\Http\Controllers\LiveResultsController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AgeGroupController;
use App\Http\Controllers\SportTeamController;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Sports houses routes
    Route::get('/sports-houses', [SportHouseController::class, 'index'])->name('sports-houses.index');
    Route::get('/sports-houses/{sportHouse}', [SportHouseController::class, 'show'])->name('sports-houses.show');

    // Event management routes
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');
    Route::get('/events/{event}/edit', [EventController::class, 'edit'])->name('events.edit');
    Route::put('/events/{event}', [EventController::class, 'update'])->name('events.update');
    Route::delete('/events/{event}', [EventController::class, 'destroy'])->name('events.destroy');

    // Score update route
    Route::post('/events/{event}/scores', [ScoreController::class, 'updateScore'])
        ->name('events.scores.update');

    // Live results routes
    Route::get('/live', [LiveResultsController::class, 'index'])->name('live.index');
    Route::get('/live/{event}', [ScoreController::class, 'showLiveResults'])
        ->name('live.show');

    // Student management routes
    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::get('/students/create', [StudentController::class, 'create'])->name('students.create');
    Route::post('/students', [StudentController::class, 'store'])->name('students.store');
    Route::get('/students/{student}', [StudentController::class, 'show'])->name('students.show');
    Route::get('/students/{student}/edit', [StudentController::class, 'edit'])->name('students.edit');
    Route::put('/students/{student}', [StudentController::class, 'update'])->name('students.update');
    Route::delete('/students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');

    // Age group management routes
    Route::get('/age-groups', [AgeGroupController::class, 'index'])->name('age-groups.index');
    Route::get('/age-groups/create', [AgeGroupController::class, 'create'])->name('age-groups.create');
    Route::post('/age-groups', [AgeGroupController::class, 'store'])->name('age-groups.store');
    Route::get('/age-groups/{ageGroup}', [AgeGroupController::class, 'show'])->name('age-groups.show');
    Route::get('/age-groups/{ageGroup}/edit', [AgeGroupController::class, 'edit'])->name('age-groups.edit');
    Route::put('/age-groups/{ageGroup}', [AgeGroupController::class, 'update'])->name('age-groups.update');
    Route::delete('/age-groups/{ageGroup}', [AgeGroupController::class, 'destroy'])->name('age-groups.destroy');

    // Sport team management routes
    Route::get('/teams', [SportTeamController::class, 'index'])->name('teams.index');
    Route::get('/teams/create', [SportTeamController::class, 'create'])->name('teams.create');
    Route::post('/teams', [SportTeamController::class, 'store'])->name('teams.store');
    Route::get('/teams/{team}', [SportTeamController::class, 'show'])->name('teams.show');
    Route::get('/teams/{team}/edit', [SportTeamController::class, 'edit'])->name('teams.edit');
    Route::put('/teams/{team}', [SportTeamController::class, 'update'])->name('teams.update');
    Route::delete('/teams/{team}', [SportTeamController::class, 'destroy'])->name('teams.destroy');
    Route::get('/teams/available-students/{ageGroup}', [SportTeamController::class, 'getAvailableStudents'])
        ->name('teams.available-students');

    // Admin routes - protected by admin middleware
    Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

        // User management
        Route::get('/users', [AdminController::class, 'users'])->name('users.index');
        Route::get('/users/create', [AdminController::class, 'createUser'])->name('users.create');
        Route::post('/users', [AdminController::class, 'storeUser'])->name('users.store');
        Route::get('/users/{user}', [AdminController::class, 'showUser'])->name('users.show');
        Route::get('/users/{user}/edit', [AdminController::class, 'editUser'])->name('users.edit');
        Route::put('/users/{user}', [AdminController::class, 'updateUser'])->name('users.update');
        Route::delete('/users/{user}', [AdminController::class, 'destroyUser'])->name('users.destroy');

        // Tenant management
        Route::get('/tenants', [AdminController::class, 'tenants'])->name('tenants.index');
        Route::get('/tenants/create', [AdminController::class, 'createTenant'])->name('tenants.create');
        Route::post('/tenants', [AdminController::class, 'storeTenant'])->name('tenants.store');
        Route::get('/tenants/{tenant}', [AdminController::class, 'showTenant'])->name('tenants.show');
        Route::get('/tenants/{tenant}/edit', [AdminController::class, 'editTenant'])->name('tenants.edit');
        Route::put('/tenants/{tenant}', [AdminController::class, 'updateTenant'])->name('tenants.update');
        Route::delete('/tenants/{tenant}', [AdminController::class, 'destroyTenant'])->name('tenants.destroy');

        // Event management
        Route::get('/events', [AdminController::class, 'events'])->name('events.index');

        // Age groups management
        Route::get('/age-groups', [AdminController::class, 'ageGroups'])->name('age-groups.index');

        // Sport houses/teams management
        Route::get('/teams', [AdminController::class, 'teams'])->name('sport-houses.index');

        // Reports
        Route::get('/reports', [AdminController::class, 'reports'])->name('reports');

        // Settings
        Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
    });
});
