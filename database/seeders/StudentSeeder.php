<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\SportHouse;
use App\Models\AgeGroup;
use App\Models\Tenant;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class StudentSeeder extends Seeder
{
    private $faker;

    public function __construct()
    {
        $this->faker = Faker::create('ms_MY'); // Malaysian locale
    }

    public function run(): void
    {
        $tenants = Tenant::all();
        $sportHouses = SportHouse::all();
        $ageGroups = AgeGroup::all();

        foreach ($tenants as $tenant) {
            // Create students for each age group and sport house combination
            foreach ($ageGroups as $ageGroup) {
                // Calculate ages in this group
                $ages = range($ageGroup->min_age, $ageGroup->max_age);

                foreach ($sportHouses as $sportHouse) {
                    foreach ($ages as $age) {
                        // Create 3 male and 3 female students for each age
                        Student::factory()
                            ->count(3)
                            ->forTenant($tenant)
                            ->forSportHouse($sportHouse)
                            ->male()
                            ->create([
                                'age' => $age,
                                'class' => $this->getClassForAge($age),
                            ]);

                        Student::factory()
                            ->count(3)
                            ->forTenant($tenant)
                            ->forSportHouse($sportHouse)
                            ->female()
                            ->create([
                                'age' => $age,
                                'class' => $this->getClassForAge($age),
                            ]);
                    }
                }
            }
        }
    }

    private function getClassForAge(int $age): string
    {
        // Map age to standard class in Malaysian primary school
        $classMap = [
            7 => '1',
            8 => '2',
            9 => '3',
            10 => '4',
            11 => '5',
            12 => '6',
        ];

        $standard = $classMap[$age] ?? '1';
        $section = $this->faker->randomElement(['A', 'B', 'C']);

        return $standard . $section;
    }
}
