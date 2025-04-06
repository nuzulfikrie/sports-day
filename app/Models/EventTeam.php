<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventTeam extends Model
{
    protected $table = 'event_team';

    protected $fillable = [
        'event_id',
        'sport_team_id',
        'score',
    ];

    protected $casts = [
        'score' => 'integer',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function sportTeam(): BelongsTo
    {
        return $this->belongsTo(SportTeam::class);
    }
}
