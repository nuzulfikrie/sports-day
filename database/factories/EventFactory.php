<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\SportHouse;
use App\Models\AgeGroup;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition(): array
    {
        // Common Malaysian school sports events with categories and types
        $events = [
            [
                'name' => 'Larian 100m',
                'category' => 'Track',
                'type' => 'Individual',
                'description' => '100 meter sprint race',
                'venue' => 'Track Field',
                'place' => 'Lane 1',
                'max_participants' => 8,
                'points' => 10,
            ],
            [
                'name' => 'Lompat Jauh',
                'category' => 'Field',
                'type' => 'Individual',
                'description' => 'Long jump competition',
                'venue' => 'Jump Pit Area',
                'place' => 'Pit 1',
                'max_participants' => 6,
                'points' => 8,
            ],
            [
                'name' => 'Larian Berganti-ganti 4x100m',
                'category' => 'Track',
                'type' => 'Team',
                'description' => '4x100 meters relay race',
                'venue' => 'Track Field',
                'place' => 'Lanes 1-4',
                'max_participants' => 16,
                'points' => 15,
            ],
            [
                'name' => 'Lompat Tinggi',
                'category' => 'Field',
                'type' => 'Individual',
                'description' => 'High jump competition',
                'venue' => 'High Jump Area',
                'place' => 'Mat 1',
                'max_participants' => 6,
                'points' => 8,
            ],
            [
                'name' => 'Lempar Cakera',
                'category' => 'Field',
                'type' => 'Individual',
                'description' => 'Discus throw competition',
                'venue' => 'Throwing Field',
                'place' => 'Circle 1',
                'max_participants' => 6,
                'points' => 8,
            ],
            [
                'name' => 'Larian 200m',
                'category' => 'Track',
                'type' => 'Individual',
                'description' => '200 meter sprint race',
                'venue' => 'Track Field',
                'place' => 'Lane 2',
                'max_participants' => 8,
                'points' => 12,
            ],
            [
                'name' => 'Larian 400m',
                'category' => 'Track',
                'type' => 'Individual',
                'description' => '400 meter race',
                'venue' => 'Track Field',
                'place' => 'Lane 3',
                'max_participants' => 6,
                'points' => 15,
            ],
            [
                'name' => 'Larian Berganti-ganti 4x400m',
                'category' => 'Track',
                'type' => 'Team',
                'description' => '4x400 meters relay race',
                'venue' => 'Track Field',
                'place' => 'Lanes 1-4',
                'max_participants' => 16,
                'points' => 20,
            ],
        ];

        $event = $this->faker->randomElement($events);
        $startTime = Carbon::now()->addDays(rand(1, 7))->setHour(rand(8, 15))->setMinute(0);

        return [
            'sport_house_id' => SportHouse::factory(),
            'age_group_id' => AgeGroup::factory(),
            'name' => $event['name'],
            'category' => $event['category'],
            'type' => $event['type'],
            'description' => $event['description'],
            'venue' => $event['venue'],
            'place' => $event['place'],
            'max_participants' => $event['max_participants'],
            'points' => $event['points'],
            'start_time' => $startTime,
            'end_time' => (clone $startTime)->addHours(rand(1, 3)),
            'status' => $this->faker->randomElement(['upcoming', 'ongoing', 'completed']),
        ];
    }

    /**
     * Configure the factory to create events for a specific sports house.
     */
    public function forSportHouse(SportHouse $sportHouse): static
    {
        return $this->state(fn(array $attributes) => [
            'sport_house_id' => $sportHouse->id,
        ]);
    }

    /**
     * Configure the factory to create events for a specific age group.
     */
    public function forAgeGroup(AgeGroup $ageGroup): static
    {
        return $this->state(fn(array $attributes) => [
            'age_group_id' => $ageGroup->id,
        ]);
    }

    public function upcoming(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'upcoming',
            'start_time' => Carbon::now()->addDays(rand(1, 7)),
            'end_time' => Carbon::now()->addDays(rand(1, 7))->addHours(rand(1, 3)),
        ]);
    }

    public function ongoing(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'ongoing',
            'start_time' => Carbon::now()->subHours(rand(1, 3)),
            'end_time' => Carbon::now()->addHours(rand(1, 3)),
        ]);
    }

    public function completed(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'completed',
            'start_time' => Carbon::now()->subDays(rand(1, 7)),
            'end_time' => Carbon::now()->subDays(rand(1, 7))->addHours(rand(1, 3)),
        ]);
    }
}
