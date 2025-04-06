<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\SportHouse;
use App\Models\AgeGroup;
use App\Models\SportTeam;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $sportHouses = SportHouse::all();
        $ageGroups = AgeGroup::all();

        // Track Events
        $trackEvents = [
            [
                'base_name' => 'Larian 100m',
                'category' => 'Track',
                'type' => 'Individual',
                'description' => '100 meter sprint race',
                'venue' => 'Track Field',
                'place' => 'Lane 1',
                'max_participants' => 8,
                'points' => 10,
                'status' => 'upcoming',
                'start_time' => Carbon::now()->addDays(1)->setHour(8)->setMinute(0),
                'end_time' => Carbon::now()->addDays(1)->setHour(8)->setMinute(30),
            ],
            [
                'base_name' => 'Larian 200m',
                'category' => 'Track',
                'type' => 'Individual',
                'description' => '200 meter sprint race',
                'venue' => 'Track Field',
                'place' => 'Lane 2',
                'max_participants' => 8,
                'points' => 12,
                'status' => 'upcoming',
                'start_time' => Carbon::now()->addDays(1)->setHour(9)->setMinute(0),
                'end_time' => Carbon::now()->addDays(1)->setHour(9)->setMinute(30),
            ],
            [
                'base_name' => 'Larian 400m',
                'category' => 'Track',
                'type' => 'Individual',
                'description' => '400 meter race',
                'venue' => 'Track Field',
                'place' => 'Lane 3',
                'max_participants' => 6,
                'points' => 15,
                'status' => 'upcoming',
                'start_time' => Carbon::now()->addDays(1)->setHour(10)->setMinute(0),
                'end_time' => Carbon::now()->addDays(1)->setHour(10)->setMinute(45),
            ],
        ];

        // Field Events
        $fieldEvents = [
            [
                'base_name' => 'Lompat Jauh',
                'category' => 'Field',
                'type' => 'Individual',
                'description' => 'Long jump competition',
                'venue' => 'Jump Pit Area',
                'place' => 'Pit 1',
                'max_participants' => 6,
                'points' => 8,
                'status' => 'upcoming',
                'start_time' => Carbon::now()->addDays(1)->setHour(8)->setMinute(0),
                'end_time' => Carbon::now()->addDays(1)->setHour(9)->setMinute(30),
            ],
            [
                'base_name' => 'Lompat Tinggi',
                'category' => 'Field',
                'type' => 'Individual',
                'description' => 'High jump competition',
                'venue' => 'High Jump Area',
                'place' => 'Mat 1',
                'max_participants' => 6,
                'points' => 8,
                'status' => 'upcoming',
                'start_time' => Carbon::now()->addDays(1)->setHour(10)->setMinute(0),
                'end_time' => Carbon::now()->addDays(1)->setHour(11)->setMinute(30),
            ],
            [
                'base_name' => 'Lempar Cakera',
                'category' => 'Field',
                'type' => 'Individual',
                'description' => 'Discus throw competition',
                'venue' => 'Throwing Field',
                'place' => 'Circle 1',
                'max_participants' => 6,
                'points' => 8,
                'status' => 'upcoming',
                'start_time' => Carbon::now()->addDays(2)->setHour(8)->setMinute(0),
                'end_time' => Carbon::now()->addDays(2)->setHour(9)->setMinute(30),
            ],
        ];

        // Relay Events
        $relayEvents = [
            [
                'base_name' => 'Larian Berganti-ganti 4x100m',
                'category' => 'Track',
                'type' => 'Team',
                'description' => '4x100 meters relay race',
                'venue' => 'Track Field',
                'place' => 'Lanes 1-4',
                'max_participants' => 16,
                'points' => 15,
                'status' => 'upcoming',
                'start_time' => Carbon::now()->addDays(2)->setHour(10)->setMinute(0),
                'end_time' => Carbon::now()->addDays(2)->setHour(11)->setMinute(0),
            ],
            [
                'base_name' => 'Larian Berganti-ganti 4x400m',
                'category' => 'Track',
                'type' => 'Team',
                'description' => '4x400 meters relay race',
                'venue' => 'Track Field',
                'place' => 'Lanes 1-4',
                'max_participants' => 16,
                'points' => 20,
                'status' => 'upcoming',
                'start_time' => Carbon::now()->addDays(2)->setHour(11)->setMinute(30),
                'end_time' => Carbon::now()->addDays(2)->setHour(13)->setMinute(0),
            ],
        ];

        // Create events for each sport house and age group
        foreach ($sportHouses as $sportHouse) {
            foreach ($ageGroups as $ageGroup) {
                // Helper function to create event
                $createEvent = function ($eventData) use ($sportHouse, $ageGroup) {
                    $data = $eventData;
                    $baseName = $data['base_name'];
                    unset($data['base_name']);

                    Event::create([
                        'tenant_id' => $sportHouse->tenant_id,
                        'sport_house_id' => $sportHouse->id,
                        'age_group_id' => $ageGroup->id,
                        'name' => "{$baseName} - {$sportHouse->name} ({$ageGroup->name})",
                        ...$data,
                    ]);
                };

                // Create track events
                foreach ($trackEvents as $event) {
                    $createEvent($event);
                }

                // Create field events
                foreach ($fieldEvents as $event) {
                    $createEvent($event);
                }

                // Create relay events
                foreach ($relayEvents as $event) {
                    $createEvent($event);
                }
            }
        }

        $this->createSportTeamForEachEvent();
    }

    //after event seeder, create sport team for each event
    public function createSportTeamForEachEvent()
    {
        $events = Event::where('type', 'Team')->get();

        foreach ($events as $event) {
            // Create a team for this event's sport house and age group
            $team = SportTeam::create([
                'sport_house_id' => $event->sport_house_id,
                'age_group_id' => $event->age_group_id,
                'name' => "{$event->sportHouse->name} Team - {$event->name}",
            ]);

            // Create the event-team relationship with initial score
            DB::table('event_team')->insert([
                'event_id' => $event->id,
                'sport_team_id' => $team->id,
                'score' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
