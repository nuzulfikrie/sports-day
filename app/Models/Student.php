<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'sport_house_id',
        'name',
        'age',
        'student_id',
        'class',
        'gender',
        'height',
        'weight',
        'blood_type',
        'allergies',
        'emergency_contact',
        'emergency_contact_name',
        'emergency_contact_relationship',
    ];

    protected $casts = [
        'age' => 'integer',
        'height' => 'integer',
        'weight' => 'integer',
    ];

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function sportHouse(): BelongsTo
    {
        return $this->belongsTo(SportHouse::class);
    }

    public function events(): BelongsToMany
    {
        return $this->belongsToMany(Event::class, 'event_student')
            ->withPivot(['score', 'position', 'medal', 'remarks'])
            ->withTimestamps();
    }

    public function ageGroups(): BelongsToMany
    {
        return $this->belongsToMany(AgeGroup::class, 'age_group_student')
            ->withTimestamps();
    }

    public function sportTeams(): BelongsToMany
    {
        return $this->belongsToMany(SportTeam::class, 'sport_team_student')
            ->withTimestamps();
    }

    public function getBmiAttribute(): ?float
    {
        if (!$this->height || !$this->weight) {
            return null;
        }

        // BMI = weight (kg) / (height (m))²
        $heightInMeters = $this->height / 100;
        return round($this->weight / ($heightInMeters * $heightInMeters), 2);
    }

    public function getFullEmergencyContactAttribute(): ?string
    {
        if (!$this->emergency_contact_name || !$this->emergency_contact) {
            return null;
        }

        return sprintf(
            '%s (%s) - %s',
            $this->emergency_contact_name,
            $this->emergency_contact_relationship,
            $this->emergency_contact
        );
    }
}
