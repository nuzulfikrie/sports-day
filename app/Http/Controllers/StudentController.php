<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\SportHouse;
use App\Models\AgeGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::with(['sportHouse', 'ageGroups'])
            ->where('tenant_id', Auth::user()->tenant_id)
            ->get();

        return Inertia::render('Students/Index', [
            'students' => $students,
        ]);
    }

    public function create()
    {
        $sportHouses = SportHouse::where('tenant_id', Auth::user()->tenant_id)->get();
        $ageGroups = AgeGroup::where('tenant_id', Auth::user()->tenant_id)->get();

        return Inertia::render('Students/Form', [
            'sportHouses' => $sportHouses,
            'ageGroups' => $ageGroups,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'student_id' => 'required|string|max:50|unique:students,student_id',
            'age' => 'required|integer|min:5|max:20',
            'class' => 'required|string|max:20',
            'gender' => 'required|in:male,female',
            'sport_house_id' => 'required|exists:sport_houses,id',
            'height' => 'nullable|integer|min:50|max:250',
            'weight' => 'nullable|integer|min:15|max:150',
            'blood_type' => 'nullable|string|max:5',
            'allergies' => 'nullable|string',
            'emergency_contact' => 'required|string|max:20',
            'emergency_contact_name' => 'required|string|max:255',
            'emergency_contact_relationship' => 'required|string|max:50',
            'age_group_ids' => 'required|array|exists:age_groups,id',
        ]);

        $student = Student::create([
            ...$validated,
            'tenant_id' => Auth::user()->tenant_id,
        ]);

        $student->ageGroups()->attach($request->age_group_ids);

        return redirect()->route('students.index')
            ->with('success', 'Student created successfully.');
    }

    public function show(Student $student)
    {
        $student->load(['sportHouse', 'ageGroups', 'events', 'sportTeams']);

        return Inertia::render('Students/Show', [
            'student' => $student,
        ]);
    }

    public function edit(Student $student)
    {
        $sportHouses = SportHouse::where('tenant_id', Auth::user()->tenant_id)->get();
        $ageGroups = AgeGroup::where('tenant_id', Auth::user()->tenant_id)->get();

        return Inertia::render('Students/Form', [
            'student' => $student,
            'sportHouses' => $sportHouses,
            'ageGroups' => $ageGroups,
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'student_id' => 'required|string|max:50|unique:students,student_id,' . $student->id,
            'age' => 'required|integer|min:5|max:20',
            'class' => 'required|string|max:20',
            'gender' => 'required|in:male,female',
            'sport_house_id' => 'required|exists:sport_houses,id',
            'height' => 'nullable|integer|min:50|max:250',
            'weight' => 'nullable|integer|min:15|max:150',
            'blood_type' => 'nullable|string|max:5',
            'allergies' => 'nullable|string',
            'emergency_contact' => 'required|string|max:20',
            'emergency_contact_name' => 'required|string|max:255',
            'emergency_contact_relationship' => 'required|string|max:50',
            'age_group_ids' => 'required|array|exists:age_groups,id',
        ]);

        $student->update($validated);
        $student->ageGroups()->sync($request->age_group_ids);

        return redirect()->route('students.index')
            ->with('success', 'Student updated successfully.');
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Student deleted successfully.');
    }
}
