<?php

namespace Database\Seeders;

use App\Models\SportHouse;
use App\Models\Tenant;
use Illuminate\Database\Seeder;

class SportsHouseSeeder extends Seeder
{
    public function run(): void
    {
        $sportHouses = [
            [
                'name' => 'Rumah Merah',
                'color' => '#FF0000',
                'description' => 'Red House - Symbolizing courage and strength',
                'motto' => 'Berani dan Berjaya',
                'logo' => 'https://via.placeholder.com/150x150/FF0000/FFFFFF?text=Merah',
                'total_points' => 0,
                'total_gold' => 0,
                'total_silver' => 0,
                'total_bronze' => 0,
            ],
            [
                'name' => 'Rumah Biru',
                'color' => '#0000FF',
                'description' => 'Blue House - Symbolizing wisdom and loyalty',
                'motto' => 'Bijaksana dan Setia',
                'logo' => 'https://via.placeholder.com/150x150/0000FF/FFFFFF?text=Biru',
                'total_points' => 0,
                'total_gold' => 0,
                'total_silver' => 0,
                'total_bronze' => 0,
            ],
            [
                'name' => 'Rumah Kuning',
                'color' => '#FFFF00',
                'description' => 'Yellow House - Symbolizing joy and optimism',
                'motto' => 'Gembira dan Berjaya',
                'logo' => 'https://via.placeholder.com/150x150/FFFF00/000000?text=Kuning',
                'total_points' => 0,
                'total_gold' => 0,
                'total_silver' => 0,
                'total_bronze' => 0,
            ],
            [
                'name' => 'Rumah Hijau',
                'color' => '#00FF00',
                'description' => 'Green House - Symbolizing growth and harmony',
                'motto' => 'Berkembang dan Harmoni',
                'logo' => 'https://via.placeholder.com/150x150/00FF00/FFFFFF?text=Hijau',
                'total_points' => 0,
                'total_gold' => 0,
                'total_silver' => 0,
                'total_bronze' => 0,
            ],
        ];

        // Create sport houses for each tenant
        Tenant::all()->each(function ($tenant) use ($sportHouses) {
            foreach ($sportHouses as $house) {
                SportHouse::create([
                    'tenant_id' => $tenant->id,
                    ...$house,
                ]);
            }
        });
    }
}
