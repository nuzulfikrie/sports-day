<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AgeGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'name',
        'min_age',
        'max_age',
        'description',
        'max_participants_per_event',
        'max_events_per_student',
    ];

    protected $casts = [
        'min_age' => 'integer',
        'max_age' => 'integer',
        'max_participants_per_event' => 'integer',
        'max_events_per_student' => 'integer',
    ];

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'age_group_student')
            ->withTimestamps();
    }

    public function sportTeams(): HasMany
    {
        return $this->hasMany(SportTeam::class);
    }

    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'age_group_student')
            ->withTimestamps();
    }

    public function isEligible(int $age): bool
    {
        return $age >= $this->min_age && $age <= $this->max_age;
    }

    public function canAddMoreParticipants(Event $event): bool
    {
        return $event->participants()->where('age_group_id', $this->id)->count() < $this->max_participants_per_event;
    }

    public function canStudentJoinMoreEvents(Student $student): bool
    {
        return $student->events()->where('age_group_id', $this->id)->count() < $this->max_events_per_student;
    }
}
