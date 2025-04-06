<?php

namespace Database\Factories;

use App\Models\SportHouse;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class SportHouseFactory extends Factory
{
    protected $model = SportHouse::class;

    public function definition(): array
    {
        // Common Malaysian-themed house names and colors
        $houses = [
            [
                'name' => 'Rumah Merah',
                'color' => '#FF0000',
                'description' => 'Red House - Symbolizing courage and strength',
                'motto' => 'Berani dan Berjaya',
                'logo' => 'https://via.placeholder.com/150x150/FF0000/FFFFFF?text=Merah',
            ],
            [
                'name' => 'Rumah Biru',
                'color' => '#0000FF',
                'description' => 'Blue House - Symbolizing wisdom and loyalty',
                'motto' => 'Bijaksana dan Setia',
                'logo' => 'https://via.placeholder.com/150x150/0000FF/FFFFFF?text=Biru',
            ],
            [
                'name' => 'Rumah Kuning',
                'color' => '#FFFF00',
                'description' => 'Yellow House - Symbolizing joy and optimism',
                'motto' => 'Gembira dan Berjaya',
                'logo' => 'https://via.placeholder.com/150x150/FFFF00/000000?text=Kuning',
            ],
            [
                'name' => 'Rumah Hijau',
                'color' => '#00FF00',
                'description' => 'Green House - Symbolizing growth and harmony',
                'motto' => 'Berkembang dan Harmoni',
                'logo' => 'https://via.placeholder.com/150x150/00FF00/FFFFFF?text=Hijau',
            ],
        ];

        $house = $this->faker->randomElement($houses);

        return [
            'tenant_id' => Tenant::factory(),
            'name' => $house['name'],
            'color' => $house['color'],
            'description' => $house['description'],
            'motto' => $house['motto'],
            'logo' => $house['logo'],
            'total_points' => $this->faker->numberBetween(0, 1000),
            'total_gold' => $this->faker->numberBetween(0, 50),
            'total_silver' => $this->faker->numberBetween(0, 50),
            'total_bronze' => $this->faker->numberBetween(0, 50),
        ];
    }

    /**
     * Configure the factory to create sports houses for a specific tenant.
     */
    public function forTenant(Tenant $tenant): static
    {
        return $this->state(fn(array $attributes) => [
            'tenant_id' => $tenant->id,
        ]);
    }

    public function redHouse(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Rumah Merah',
            'color' => '#FF0000',
            'description' => 'Red House - Symbolizing courage and strength',
            'motto' => 'Berani dan Berjaya',
            'logo' => 'https://via.placeholder.com/150x150/FF0000/FFFFFF?text=Merah',
        ]);
    }

    public function blueHouse(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Rumah Biru',
            'color' => '#0000FF',
            'description' => 'Blue House - Symbolizing wisdom and loyalty',
            'motto' => 'Bijaksana dan Setia',
            'logo' => 'https://via.placeholder.com/150x150/0000FF/FFFFFF?text=Biru',
        ]);
    }

    public function yellowHouse(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Rumah Kuning',
            'color' => '#FFFF00',
            'description' => 'Yellow House - Symbolizing joy and optimism',
            'motto' => 'Gembira dan Berjaya',
            'logo' => 'https://via.placeholder.com/150x150/FFFF00/000000?text=Kuning',
        ]);
    }

    public function greenHouse(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Rumah Hijau',
            'color' => '#00FF00',
            'description' => 'Green House - Symbolizing growth and harmony',
            'motto' => 'Berkembang dan Harmoni',
            'logo' => 'https://via.placeholder.com/150x150/00FF00/FFFFFF?text=Hijau',
        ]);
    }
}
