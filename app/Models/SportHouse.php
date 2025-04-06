<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SportHouse extends Model
{
    use HasFactory;

    protected $table = 'sport_houses';

    protected $fillable = [
        'tenant_id',
        'name',
        'color',
        'logo',
    ];

    protected $casts = [
        'logo' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    public function sportTeams(): HasMany
    {
        return $this->hasMany(SportTeam::class);
    }
}
