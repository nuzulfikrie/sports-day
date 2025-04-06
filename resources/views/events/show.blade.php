<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $event->name }} - Sports Day</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h1 class="text-3xl font-bold mb-2">{{ $event->name }}</h1>
                    <p class="text-gray-600">Sports House: <span
                            style="color: {{ $event->sportsHouse->color }}">{{ $event->sportsHouse->name }}</span></p>
                    <p class="text-gray-600">Age Group: {{ $event->ageGroup->name }}</p>
                </div>
                <div class="text-right">
                    <a href="{{ route('events.edit', $event) }}"
                        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Edit Event
                    </a>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <h2 class="text-xl font-bold mb-4">Event Details</h2>
                    <div class="space-y-2">
                        <p><span class="font-semibold">Venue:</span> {{ $event->venue }}</p>
                        <p><span class="font-semibold">Place:</span> {{ $event->place }}</p>
                        <p><span class="font-semibold">Start Time:</span> {{ $event->start_time->format('M d, Y H:i') }}
                        </p>
                        <p><span class="font-semibold">End Time:</span> {{ $event->end_time->format('M d, Y H:i') }}</p>
                        <p><span class="font-semibold">Description:</span> {{ $event->description }}</p>
                    </div>
                </div>

                <div>
                    <h2 class="text-xl font-bold mb-4">Participants</h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2 text-left">Name</th>
                                    <th class="px-4 py-2 text-left">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($event->students as $student)
                                    <tr>
                                        <td class="px-4 py-2">{{ $student->name }}</td>
                                        <td class="px-4 py-2">{{ $student->pivot->score ?? '-' }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="flex justify-between">
                <a href="{{ route('events.index') }}"
                    class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                    Back to Events
                </a>
                <a href="{{ route('live.show', $event) }}"
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    View Live Results
                </a>
            </div>
        </div>
    </div>
</body>

</html>
