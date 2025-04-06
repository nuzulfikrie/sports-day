<?php

namespace App\Http\Controllers;

use App\Models\SportTeam;
use App\Models\SportHouse;
use App\Models\AgeGroup;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SportTeamController extends Controller
{
    public function index()
    {
        $teams = SportTeam::with(['sportHouse', 'ageGroup', 'events'])
            ->whereHas('sportHouse', function ($query) {
                $query->where('tenant_id', Auth::user()->tenant_id);
            })
            ->withCount(['students', 'events'])
            ->get();

        return Inertia::render('Teams/Index', [
            'teams' => $teams,
        ]);
    }

    public function create()
    {
        $sportHouses = SportHouse::where('tenant_id', Auth::user()->tenant_id)->get();
        $ageGroups = AgeGroup::where('tenant_id', Auth::user()->tenant_id)->get();

        return Inertia::render('Teams/Form', [
            'sportHouses' => $sportHouses,
            'ageGroups' => $ageGroups,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sport_house_id' => 'required|exists:sport_houses,id',
            'age_group_id' => 'required|exists:age_groups,id',
            'student_ids' => 'required|array|exists:students,id',
        ]);

        $team = SportTeam::create($validated);
        $team->students()->attach($request->student_ids);

        return redirect()->route('teams.index')
            ->with('success', 'Team created successfully.');
    }

    public function show(SportTeam $team)
    {
        $team->load([
            'sportHouse',
            'ageGroup',
            'students.sportHouse',
            'events' => function ($query) {
                $query->orderBy('start_time', 'asc');
            },
        ]);

        return Inertia::render('Teams/Show', [
            'team' => $team,
        ]);
    }

    public function edit(SportTeam $team)
    {
        $sportHouses = SportHouse::where('tenant_id', Auth::user()->tenant_id)->get();
        $ageGroups = AgeGroup::where('tenant_id', Auth::user()->tenant_id)->get();
        $students = Student::where('tenant_id', Auth::user()->tenant_id)
            ->whereHas('ageGroups', function ($query) use ($team) {
                $query->where('id', $team->age_group_id);
            })
            ->get();

        return Inertia::render('Teams/Form', [
            'team' => $team->load('students'),
            'sportHouses' => $sportHouses,
            'ageGroups' => $ageGroups,
            'students' => $students,
        ]);
    }

    public function update(Request $request, SportTeam $team)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sport_house_id' => 'required|exists:sport_houses,id',
            'age_group_id' => 'required|exists:age_groups,id',
            'student_ids' => 'required|array|exists:students,id',
        ]);

        $team->update($validated);
        $team->students()->sync($request->student_ids);

        return redirect()->route('teams.index')
            ->with('success', 'Team updated successfully.');
    }

    public function destroy(SportTeam $team)
    {
        $team->delete();

        return redirect()->route('teams.index')
            ->with('success', 'Team deleted successfully.');
    }

    public function getAvailableStudents(AgeGroup $ageGroup)
    {
        $students = Student::where('tenant_id', Auth::user()->tenant_id)
            ->whereHas('ageGroups', function ($query) use ($ageGroup) {
                $query->where('id', $ageGroup->id);
            })
            ->with('sportHouse')
            ->get();

        return response()->json(['students' => $students]);
    }
}
