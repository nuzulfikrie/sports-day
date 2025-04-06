<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Events - Sports Day</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold">Events</h1>
            <a href="{{ route('events.create') }}" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create Event
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach ($events as $event)
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-xl font-bold mb-4">{{ $event->name }}</h2>
                    <div class="mb-4">
                        <p class="text-gray-600">Sports House: {{ $event->sportsHouse->name }}</p>
                        <p class="text-gray-600">Age Group: {{ $event->ageGroup->name }}</p>
                        <p class="text-gray-600">Venue: {{ $event->venue }}</p>
                        <p class="text-gray-600">Place: {{ $event->place }}</p>
                        <p class="text-gray-600">Start Time: {{ $event->start_time->format('Y-m-d H:i') }}</p>
                        <p class="text-gray-600">End Time: {{ $event->end_time->format('Y-m-d H:i') }}</p>
                    </div>
                    <div class="flex justify-between">
                        <a href="{{ route('events.show', $event) }}" class="text-blue-500 hover:text-blue-600">
                            View Details
                        </a>
                        <a href="{{ route('live.show', $event) }}" class="text-green-500 hover:text-green-600">
                            Live Results
                        </a>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</body>

</html>
