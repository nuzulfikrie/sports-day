<?php

namespace App\Http\Controllers;

use App\Events\DashboardStatsUpdated;
use App\Models\Event;
use App\Models\SportHouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $sportHouses = SportHouse::where('tenant_id', Auth::user()->tenant_id)
            ->withCount(['students', 'events'])
            ->withSum('events', 'points')
            ->get()
            ->map(function ($house) {
                return [
                    'id' => $house->id,
                    'name' => $house->name,
                    'total_points' => $house->events_sum_points ?? 0,
                ];
            });

        $events = Event::with(['sportHouse', 'ageGroup'])
            ->whereHas('sportHouse', function ($query) {
                $query->where('tenant_id', Auth::user()->tenant_id);
            })
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'name' => $event->name,
                    'date' => $event->start_time,
                    'status' => $event->status,
                ];
            });

        // Broadcast the dashboard update event
        broadcast(new DashboardStatsUpdated($sportHouses, $events))->toOthers();

        return Inertia::render('Dashboard', [
            'sportHouses' => $sportHouses,
            'events' => $events,
        ]);
    }
}
