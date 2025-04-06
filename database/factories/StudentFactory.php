<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\Tenant;
use App\Models\SportHouse;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition(): array
    {
        // Common Malaysian names by gender
        $maleNames = [
            'Ahmad',
            'Muhammad',
            'Ali',
            'Hassan',
            'Ibrahim',
            'Ismail',
            'Zainal',
            'Azman',
        ];

        $femaleNames = [
            'Siti',
            'Aishah',
            'Fatimah',
            'Nor',
            'Nur',
            'Zainab',
            'Aminah',
            'Rahmah'
        ];

        $surnames = [
            'Abdullah',
            'Ahmad',
            'Ali',
            'Hassan',
            'Ibrahim',
        ];

        // Common Malaysian class formats (e.g., 1A, 2B, etc.)
        $classes = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C', '5A', '5B', '5C', '6A', '6B', '6C'];

        $age = $this->faker->numberBetween(7, 12); // Primary school age range
        $class = $this->faker->randomElement($classes);
        $studentId = str_pad($this->faker->unique()->numberBetween(1, 999), 3, '0', STR_PAD_LEFT) . $class;

        // Randomly determine gender first
        $gender = $this->faker->randomElement(['male', 'female']);

        // Generate name based on gender
        $firstName = $this->faker->randomElement($gender === 'male' ? $maleNames : $femaleNames);
        $surname = $this->faker->randomElement($surnames);
        $name = $firstName . ' ' . ($gender === 'male' ? 'bin' : 'binti') . ' ' . $surname;

        // Height and weight ranges based on typical Malaysian primary school children
        $height = match ($age) {
            7 => $this->faker->numberBetween(115, 130),
            8 => $this->faker->numberBetween(120, 135),
            9 => $this->faker->numberBetween(125, 140),
            10 => $this->faker->numberBetween(130, 145),
            11 => $this->faker->numberBetween(135, 150),
            12 => $this->faker->numberBetween(140, 155),
            default => $this->faker->numberBetween(120, 150),
        };

        $weight = match ($age) {
            7 => $this->faker->numberBetween(20, 30),
            8 => $this->faker->numberBetween(22, 32),
            9 => $this->faker->numberBetween(24, 35),
            10 => $this->faker->numberBetween(26, 38),
            11 => $this->faker->numberBetween(28, 42),
            12 => $this->faker->numberBetween(30, 45),
            default => $this->faker->numberBetween(25, 40),
        };

        // Generate emergency contact name based on relationship
        $relationship = $this->faker->randomElement(['Father', 'Mother', 'Guardian', 'Other']);
        $emergencyContactName = match ($relationship) {
            'Father' => $this->faker->randomElement($maleNames) . ' bin ' . $this->faker->randomElement($surnames),
            'Mother' => $this->faker->randomElement($femaleNames) . ' binti ' . $this->faker->randomElement($surnames),
            default => $this->faker->randomElement(array_merge($maleNames, $femaleNames)) .
                ' ' . ($this->faker->boolean ? 'bin' : 'binti') . ' ' .
                $this->faker->randomElement($surnames),
        };

        return [
            'tenant_id' => Tenant::factory(),
            'sport_house_id' => SportHouse::factory(),
            'name' => $name,
            'age' => $age,
            'student_id' => $studentId,
            'class' => $class,
            'gender' => $gender,
            'height' => $height,
            'weight' => $weight,
            'blood_type' => $this->faker->randomElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
            'allergies' => $this->faker->optional(0.2)->sentence(), // 20% chance of having allergies
            'emergency_contact' => '01' . $this->faker->numberBetween(1, 9) . '-' . $this->faker->numerify('#######'),
            'emergency_contact_name' => $emergencyContactName,
            'emergency_contact_relationship' => $relationship,
        ];
    }

    /**
     * Configure the factory to create students for a specific tenant.
     */
    public function forTenant(Tenant $tenant): static
    {
        return $this->state(fn(array $attributes) => [
            'tenant_id' => $tenant->id,
        ]);
    }

    /**
     * Configure the factory to create students for a specific sports house.
     */
    public function forSportHouse(SportHouse $sportHouse): static
    {
        return $this->state(fn(array $attributes) => [
            'sport_house_id' => $sportHouse->id,
        ]);
    }

    /**
     * Configure the factory to create male students.
     */
    public function male(): static
    {
        return $this->state(function (array $attributes) {
            $maleNames = [
                'Ahmad',
                'Muhammad',
                'Ali',
                'Hassan',
                'Ibrahim',
                'Ismail',
                'Zainal',
                'Azman',
            ];
            $surname = explode(' bin ', $attributes['name'])[1] ?? explode(' binti ', $attributes['name'])[1] ?? 'Abdullah';
            return [
                'gender' => 'male',
                'name' => $this->faker->randomElement($maleNames) . ' bin ' . $surname,
            ];
        });
    }

    /**
     * Configure the factory to create female students.
     */
    public function female(): static
    {
        return $this->state(function (array $attributes) {
            $femaleNames = [
                'Siti',
                'Aishah',
                'Fatimah',
                'Nor',
                'Nur',
                'Zainab',
                'Aminah',
                'Rahmah'
            ];
            $surname = explode(' bin ', $attributes['name'])[1] ?? explode(' binti ', $attributes['name'])[1] ?? 'Abdullah';
            return [
                'gender' => 'female',
                'name' => $this->faker->randomElement($femaleNames) . ' binti ' . $surname,
            ];
        });
    }
}
