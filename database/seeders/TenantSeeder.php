<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    public function run(): void
    {
        Tenant::create([
            'name' => 'SMK Seri Permata',
            'email' => 'admin@smkseripermata.edu.my',
            'logo' => 'https://via.placeholder.com/150',
            'address' => '123 Jalan Pendidikan, 43000 Kajang, Selangor',
            'phone' => '+603-8736 1234',
            'website' => 'https://smkseripermata.edu.my',
        ]);
    }
} 