<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sports Houses - Sports Day</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Sports Houses</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @foreach ($sportHouses as $sportHouse)
                <div class="bg-white rounded-lg shadow-lg p-6" style="border-left: 8px solid {{ $sportHouse->color }}">
                    <div class="flex items-center mb-4">
                        <img src="{{ $sportHouse->logo }}" alt="{{ $sportHouse->name }}"
                            class="w-16 h-16 rounded-full mr-4">
                        <h2 class="text-xl font-bold">{{ $sportHouse->name }}</h2>
                    </div>

                    <div class="mb-4">
                        <h3 class="font-semibold mb-2">Upcoming Events</h3>
                        <ul class="space-y-2">
                            @foreach ($sportHouse->events->take(3) as $event)
                                <li class="text-sm">
                                    <a href="{{ route('events.show', $event) }}"
                                        class="text-blue-500 hover:text-blue-600">
                                        {{ $event->name }}
                                    </a>
                                    <span class="text-gray-500">
                                        ({{ $event->start_time->format('M d, H:i') }})
                                    </span>
                                </li>
                            @endforeach
                        </ul>
                    </div>

                    <div class="text-center">
                        <a href="{{ route('events.index', ['sports_house' => $sportHouse->id]) }}"
                            class="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                            View All Events
                        </a>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</body>

</html>
