<?php

namespace Database\Factories;

use App\Models\SportTeam;
use App\Models\Event;
use App\Models\AgeGroup;
use App\Models\SportHouse;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class SportTeamFactory extends Factory
{
    protected $model = SportTeam::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->words(3, true),
            'event_id' => Event::factory(),
            'age_group_id' => AgeGroup::factory(),
            'sport_house_id' => SportHouse::factory(),
            'tenant_id' => Tenant::factory(),
        ];
    }

    public function forEvent(Event $event): static
    {
        return $this->state(fn(array $attributes) => [
            'event_id' => $event->id,
            'age_group_id' => $event->age_group_id,
            'sport_house_id' => $event->sport_house_id,
            'tenant_id' => $event->sportHouse->tenant_id,
        ]);
    }
}
