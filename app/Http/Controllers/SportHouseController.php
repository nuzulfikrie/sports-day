<?php

namespace App\Http\Controllers;

use App\Models\SportHouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class SportHouseController extends Controller
{
    public function index()
    {

        //if role not admin only show sport houses that the user is a coach of
        if (Auth::user()->role !== 'admin') {

            $sportHouses = SportHouse::where('tenant_id', Auth::user()->tenant_id)->get();
        } else {

            $sportHouses = SportHouse::with(['events' => function ($query) {
                $query->where('start_time', '>', now())
                    ->orderBy('start_time', 'asc');
            }])->with('tenant')
                ->withCount(['students', 'events'])
                ->withSum('events', 'points')

                ->get();
        }

        return Inertia::render('SportHouses/Index', [
            'sportHouses' => $sportHouses,
        ]);
    }

    public function show(SportHouse $sportHouse)
    {
        $sportHouse->load(['events' => function ($query) {
            $query->orderBy('start_time', 'asc');
        }, 'students.ageGroup']);

        return Inertia::render('SportHouses/Show', [
            'sportHouse' => $sportHouse,
        ]);
    }
}
