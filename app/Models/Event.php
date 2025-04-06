<?php

namespace App\Models;

use App\Models\SportHouse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    /*
     * @var array
     */
    protected $fillable = [
        'tenant_id',
        'sport_house_id',
        'age_group_id',
        'name',
        'category',
        'type',
        'venue',
        'place',
        'description',
        'status',
        'max_participants',
        'points',
        'start_time',
        'end_time',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'max_participants' => 'integer',
        'points' => 'integer',
    ];

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function sportHouse(): BelongsTo
    {
        return $this->belongsTo(SportHouse::class, 'sport_house_id');
    }

    public function ageGroup(): BelongsTo
    {
        return $this->belongsTo(AgeGroup::class);
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'event_student')
            ->withPivot('team_id', 'score', 'position', 'medal', 'remarks')
            ->withTimestamps();
    }

    public function sportTeams(): BelongsToMany
    {
        return $this->belongsToMany(SportTeam::class, 'event_team')
            ->withPivot('score')
            ->withTimestamps();
    }

    public function isFull(): bool
    {
        if (!$this->max_participants) {
            return false;
        }
        return $this->students()->count() >= $this->max_participants;
    }

    public function getMedalColor(int $position): ?string
    {
        return match ($position) {
            1 => 'gold',
            2 => 'silver',
            3 => 'bronze',
            default => null,
        };
    }
}
