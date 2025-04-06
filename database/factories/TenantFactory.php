<?php

namespace Database\Factories;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class TenantFactory extends Factory
{
    protected $model = Tenant::class;

    public function definition(): array
    {
        // Common Malaysian school names
        $schoolTypes = ['SK', 'SJK(C)', 'SJK(T)'];
        $schoolNames = [
            'Taman Melawati',
            'Taman Sri Rampai',
            'Taman Tun Dr Ismail',
            'Bangsar',
            'Bukit Damansara',
            'Seri Hartamas',
            'Taman Desa',
            'Setiawangsa',
            'Ampang Hilir',
            'Taman Permata'
        ];

        $schoolType = $this->faker->randomElement($schoolTypes);
        $schoolName = $this->faker->randomElement($schoolNames);

        return [
            'name' => $schoolType . ' ' . $schoolName,
            'description' => 'Primary School in ' . $schoolName,
            'status' => 'active',
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}
