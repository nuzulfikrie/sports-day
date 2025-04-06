<?php

namespace Database\Seeders;

use App\Models\AgeGroup;
use App\Models\Tenant;
use Illuminate\Database\Seeder;

class AgeGroupSeeder extends Seeder
{
    public function run(): void
    {
        $ageGroups = [
            [
                'name' => 'Tahun 1',
                'min_age' => 7,
                'max_age' => 7,
                'description' => 'Standard 1 students',
                'max_participants_per_event' => 4,
                'max_events_per_student' => 3,
            ],
            [
                'name' => 'Tahun 2',
                'min_age' => 8,
                'max_age' => 8,
                'description' => 'Standard 2 students',
                'max_participants_per_event' => 4,
                'max_events_per_student' => 3,
            ],
            [
                'name' => 'Tahun 3',
                'min_age' => 9,
                'max_age' => 9,
                'description' => 'Standard 3 students',
                'max_participants_per_event' => 4,
                'max_events_per_student' => 3,
            ],
            [
                'name' => 'Tahun 4',
                'min_age' => 10,
                'max_age' => 10,
                'description' => 'Standard 4 students',
                'max_participants_per_event' => 4,
                'max_events_per_student' => 3,
            ],
            [
                'name' => 'Tahun 5',
                'min_age' => 11,
                'max_age' => 11,
                'description' => 'Standard 5 students',
                'max_participants_per_event' => 4,
                'max_events_per_student' => 3,
            ],
            [
                'name' => 'Tahun 6',
                'min_age' => 12,
                'max_age' => 12,
                'description' => 'Standard 6 students',
                'max_participants_per_event' => 4,
                'max_events_per_student' => 3,
            ],
        ];

        // Create age groups for each tenant
        Tenant::all()->each(function ($tenant) use ($ageGroups) {
            foreach ($ageGroups as $group) {
                AgeGroup::create([
                    'tenant_id' => $tenant->id,
                    ...$group,
                ]);
            }
        });
    }
}
