<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LiveResultsController extends Controller
{
    public function index()
    {
        $events = Event::with(['sportHouse', 'ageGroup'])
            ->whereHas('sportHouse', function ($query) {
                $query->where('tenant_id', Auth::user()->tenant_id);
            })
            ->where('status', 'ongoing')
            ->get();

        return Inertia::render('LiveResults/Index', [
            'events' => $events,
        ]);
    }
}
