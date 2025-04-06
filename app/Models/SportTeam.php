<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SportTeam extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'age_group_id', 'sport_house_id'];

    public function ageGroup(): BelongsTo
    {
        return $this->belongsTo(AgeGroup::class);
    }

    public function sportHouse(): BelongsTo
    {
        return $this->belongsTo(SportHouse::class);
    }

    public function events(): BelongsToMany
    {
        return $this->belongsToMany(Event::class, 'event_team')
            ->withPivot('score')
            ->withTimestamps();
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'sport_team_student')
            ->withTimestamps();
    }
}
