<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\SportHouse;
use App\Models\AgeGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with(['sportHouse', 'ageGroup'])
            ->whereHas('sportHouse', function ($query) {
                $query->where('tenant_id', Auth::user()->tenant_id);
            })
            ->get();

        return Inertia::render('Events/Index', [
            'events' => $events,
        ]);
    }

    public function create()
    {
        $sportHouses = SportHouse::where('tenant_id', Auth::user()->tenant_id)->get();
        $ageGroups = AgeGroup::where('tenant_id', Auth::user()->tenant_id)->get();

        return Inertia::render('Events/Form', [
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
            'venue' => 'required|string|max:255',
            'place' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);

        $event = Event::create($validated);

        return redirect()->route('events.index')
            ->with('success', 'Event created successfully.');
    }

    public function show(Event $event)
    {
        $event->load(['sportHouse', 'ageGroup', 'students']);

        return Inertia::render('Events/Show', [
            'event' => $event,
        ]);
    }

    public function edit(Event $event)
    {
        $sportHouses = SportHouse::where('tenant_id', Auth::user()->tenant_id)->get();
        $ageGroups = AgeGroup::where('tenant_id', Auth::user()->tenant_id)->get();

        return Inertia::render('Events/Form', [
            'event' => $event,
            'sportHouses' => $sportHouses,
            'ageGroups' => $ageGroups,
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sport_house_id' => 'required|exists:sport_houses,id',
            'age_group_id' => 'required|exists:age_groups,id',
            'venue' => 'required|string|max:255',
            'place' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);

        $event->update($validated);

        return redirect()->route('events.index')
            ->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return redirect()->route('events.index')
            ->with('success', 'Event deleted successfully.');
    }
}
