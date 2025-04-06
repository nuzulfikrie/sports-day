<?php

namespace Database\Factories;

use App\Models\AgeGroup;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class AgeGroupFactory extends Factory
{
    protected $model = AgeGroup::class;

    public function definition(): array
    {
        // Common Malaysian primary school age groups
        $ageGroups = [
            [
                'name' => 'Tahun 1',
                'min_age' => 7,
                'max_age' => 7,
                'description' => 'Standard 1 students',
            ],
            [
                'name' => 'Tahun 2',
                'min_age' => 8,
                'max_age' => 8,
                'description' => 'Standard 2 students',
            ],
            [
                'name' => 'Tahun 3',
                'min_age' => 9,
                'max_age' => 9,
                'description' => 'Standard 3 students',
            ],
            [
                'name' => 'Tahun 4',
                'min_age' => 10,
                'max_age' => 10,
                'description' => 'Standard 4 students',
            ],
            [
                'name' => 'Tahun 5',
                'min_age' => 11,
                'max_age' => 11,
                'description' => 'Standard 5 students',
            ],
            [
                'name' => 'Tahun 6',
                'min_age' => 12,
                'max_age' => 12,
                'description' => 'Standard 6 students',
            ],
        ];

        $ageGroup = $this->faker->randomElement($ageGroups);

        return [
            'tenant_id' => Tenant::factory(),
            'name' => $ageGroup['name'],
            'min_age' => $ageGroup['min_age'],
            'max_age' => $ageGroup['max_age'],
            'description' => $ageGroup['description'],
            'max_participants_per_event' => $this->faker->numberBetween(2, 4),
            'max_events_per_student' => $this->faker->numberBetween(2, 4),
        ];
    }

    /**
     * Configure the factory to create age groups for a specific tenant.
     */
    public function forTenant(Tenant $tenant): static
    {
        return $this->state(fn(array $attributes) => [
            'tenant_id' => $tenant->id,
        ]);
    }

    public function year1(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Tahun 1',
            'min_age' => 7,
            'max_age' => 7,
            'description' => 'Standard 1 students',
        ]);
    }

    public function year2(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Tahun 2',
            'min_age' => 8,
            'max_age' => 8,
            'description' => 'Standard 2 students',
        ]);
    }

    public function year3(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Tahun 3',
            'min_age' => 9,
            'max_age' => 9,
            'description' => 'Standard 3 students',
        ]);
    }

    public function year4(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Tahun 4',
            'min_age' => 10,
            'max_age' => 10,
            'description' => 'Standard 4 students',
        ]);
    }

    public function year5(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Tahun 5',
            'min_age' => 11,
            'max_age' => 11,
            'description' => 'Standard 5 students',
        ]);
    }

    public function year6(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Tahun 6',
            'min_age' => 12,
            'max_age' => 12,
            'description' => 'Standard 6 students',
        ]);
    }
}
