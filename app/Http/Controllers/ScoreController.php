<?php

namespace App\Http\Controllers;

use App\Events\ScoreUpdated;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class ScoreController extends Controller
{
    public function updateScore(Request $request, Event $event): JsonResponse
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'score' => 'required|integer|min:0',
            'team_id' => 'nullable|exists:teams,id',
            'position' => 'nullable|integer|min:1',
            'remarks' => 'nullable|string|max:255',
        ]);

        // Update student score in event
        $event->students()->updateExistingPivot($request->student_id, [
            'score' => $request->score,
            'team_id' => $request->team_id,
            'position' => $request->position,
            'medal' => $request->position ? $event->getMedalColor($request->position) : null,
            'remarks' => $request->remarks,
        ]);

        // Calculate total score
        $totalScore = $event->students()->sum('event_student.score');

        // Calculate countdown
        $now = Carbon::now();
        $countdown = $event->status === 'ongoing' && $now->between($event->start_time, $event->end_time)
            ? $now->diff($event->end_time)->format('%H:%I:%S')
            : '00:00:00';

        // Prepare scores array with positions and medals
        $scores = $event->students->map(fn($student) => [
            'student_id' => $student->id,
            'name' => $student->name,
            'score' => $student->pivot->score,
            'team_id' => $student->pivot->team_id,
            'position' => $student->pivot->position,
            'medal' => $student->pivot->medal,
            'remarks' => $student->pivot->remarks,
        ])->all();

        // Broadcast update
        ScoreUpdated::dispatch($event, $scores, $totalScore, $countdown);

        return response()->json([
            'message' => 'Score updated successfully',
            'total_score' => $totalScore,
            'countdown' => $countdown,
        ]);
    }

    public function showLiveResults(Event $event)
    {
        $now = Carbon::now();
        $countdown = $event->status === 'ongoing' && $now->between($event->start_time, $event->end_time)
            ? $now->diff($event->end_time)->format('%H:%I:%S')
            : '00:00:00';

        $initialScores = $event->students->map(fn($student) => [
            'student_id' => $student->id,
            'name' => $student->name,
            'score' => $student->pivot->score,
            'team_id' => $student->pivot->team_id,
            'position' => $student->pivot->position,
            'medal' => $student->pivot->medal,
            'remarks' => $student->pivot->remarks,
        ]);

        return Inertia::render('Events/LiveResults', [
            'event' => $event,
            'initialScores' => $initialScores,
            'totalScore' => $event->students->sum('pivot.score'),
            'countdown' => $countdown,
        ]);
    }
}
