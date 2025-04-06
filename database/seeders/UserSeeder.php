<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@sportsday.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create users for each tenant
        Tenant::all()->each(function ($tenant) {
            // Create tenant admin
            User::create([
                'name' => "{$tenant->name} Admin",
                'email' => "admin@{$tenant->name}.com",
                'password' => Hash::make('password'),
                'role' => 'tenant_admin',
                'tenant_id' => $tenant->id,
            ]);

            // Create teacher users
            for ($i = 1; $i <= 3; $i++) {
                User::create([
                    'name' => "Teacher {$i} {$tenant->name}",
                    'email' => "teacher{$i}@{$tenant->name}.com",
                    'password' => Hash::make('password'),
                    'role' => 'teacher',
                    'tenant_id' => $tenant->id,
                ]);
            }

            // Create student users
            for ($i = 1; $i <= 5; $i++) {
                User::create([
                    'name' => "Student {$i} {$tenant->name}",
                    'email' => "student{$i}@{$tenant->name}.com",
                    'password' => Hash::make('password'),
                    'role' => 'student',
                    'tenant_id' => $tenant->id,
                ]);
            }
        });
    }
}
