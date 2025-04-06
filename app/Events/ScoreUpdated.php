<?php

namespace App\Events;

use App\Models\Event;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ScoreUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Event $event,
        public array $scores,
        public int $totalScore,
        public string $countdown
    ) {}

    public function broadcastOn(): array
    {
        return [
            new Channel("tenant.{$this->event->sportsHouse->tenant_id}.event.{$this->event->id}"),
        ];
    }

    public function broadcastAs(): string
    {
        return 'score.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'event_id' => $this->event->id,
            'scores' => $this->scores,
            'total_score' => $this->totalScore,
            'countdown' => $this->countdown,
            'venue' => $this->event->venue,
            'place' => $this->event->place,
            'age_group' => $this->event->ageGroup->name,
        ];
    }
}
