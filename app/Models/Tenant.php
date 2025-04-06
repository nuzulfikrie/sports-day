<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tenant extends Model
{
    use HasFactory;

    protected $table = 'tenants';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'email',
        'logo',
        'address',
        'phone',
        'website'
    ];

    protected $casts = [
        'logo' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function teams(): HasMany
    {
        return $this->hasMany(Team::class);
    }

    public function sportsHouses(): HasMany
    {
        return $this->hasMany(SportHouse::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function ageGroups(): HasMany
    {
        return $this->hasMany(AgeGroup::class);
    }

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }
}
