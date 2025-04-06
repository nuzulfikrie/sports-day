<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $sportHouse->name }} - Sports Day</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6" style="border-left: 8px solid {{ $sportHouse->color }}">
            <div class="flex items-center mb-6">
                <img src="{{ $sportHouse->logo }}" alt="{{ $sportHouse->name }}" class="w-24 h-24 rounded-full mr-6">
                <div>
                    <h1 class="text-3xl font-bold">{{ $sportHouse->name }}</h1>
                    <p class="text-gray-600">Color: <span
                            style="color: {{ $sportHouse->color }}">{{ $sportHouse->color }}</span></p>
                </div>
            </div>

            <div class="mb-8">
                <h2 class="text-2xl font-bold mb-4">Events</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    @foreach ($sportHouse->events as $event)
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="text-xl font-semibold mb-2">{{ $event->name }}</h3>
                            <p class="text-gray-600 mb-2">Age Group: {{ $event->ageGroup->name }}</p>
                            <p class="text-gray-600 mb-2">Venue: {{ $event->venue }}</p>
                            <p class="text-gray-600 mb-2">Place: {{ $event->place }}</p>
                            <p class="text-gray-600 mb-2">
                                Time: {{ $event->start_time->format('M d, H:i') }} -
                                {{ $event->end_time->format('H:i') }}
                            </p>
                            <div class="flex justify-between mt-4">
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

            <div class="text-center">
                <a href="{{ route('sports-houses.index') }}"
                    class="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                    Back to Sports Houses
                </a>
            </div>
        </div>
    </div>
</body>

</html>
