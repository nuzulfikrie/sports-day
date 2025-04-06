<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Event - Sports Day</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-2xl mx-auto">
            <h1 class="text-3xl font-bold mb-8">Edit Event</h1>

            <form action="{{ route('events.update', $event) }}" method="POST" class="bg-white rounded-lg shadow-lg p-6">
                @csrf
                @method('PUT')

                <div class="mb-4">
                    <label for="name" class="block text-gray-700 font-bold mb-2">Event Name</label>
                    <input type="text" name="name" id="name" class="w-full px-3 py-2 border rounded-lg"
                        value="{{ $event->name }}" required>
                </div>

                <div class="mb-4">
                    <label for="sport_house_id" class="block text-gray-700 font-bold mb-2">Sports House</label>
                    <select name="sport_house_id" id="sport_house_id" class="w-full px-3 py-2 border rounded-lg"
                        required>
                        @foreach ($sportHouses as $sportHouse)
                            <option value="{{ $sportHouse->id }}"
                                {{ $event->sport_house_id == $sportHouse->id ? 'selected' : '' }}>
                                {{ $sportHouse->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-4">
                    <label for="age_group_id" class="block text-gray-700 font-bold mb-2">Age Group</label>
                    <select name="age_group_id" id="age_group_id" class="w-full px-3 py-2 border rounded-lg" required>
                        @foreach ($ageGroups as $ageGroup)
                            <option value="{{ $ageGroup->id }}"
                                {{ $event->age_group_id == $ageGroup->id ? 'selected' : '' }}>
                                {{ $ageGroup->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-4">
                    <label for="venue" class="block text-gray-700 font-bold mb-2">Venue</label>
                    <input type="text" name="venue" id="venue" class="w-full px-3 py-2 border rounded-lg"
                        value="{{ $event->venue }}" required>
                </div>

                <div class="mb-4">
                    <label for="place" class="block text-gray-700 font-bold mb-2">Place</label>
                    <input type="text" name="place" id="place" class="w-full px-3 py-2 border rounded-lg"
                        value="{{ $event->place }}" required>
                </div>

                <div class="mb-4">
                    <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea name="description" id="description" class="w-full px-3 py-2 border rounded-lg" rows="4">{{ $event->description }}</textarea>
                </div>

                <div class="mb-4">
                    <label for="start_time" class="block text-gray-700 font-bold mb-2">Start Time</label>
                    <input type="datetime-local" name="start_time" id="start_time"
                        class="w-full px-3 py-2 border rounded-lg"
                        value="{{ $event->start_time->format('Y-m-d\TH:i') }}" required>
                </div>

                <div class="mb-4">
                    <label for="end_time" class="block text-gray-700 font-bold mb-2">End Time</label>
                    <input type="datetime-local" name="end_time" id="end_time"
                        class="w-full px-3 py-2 border rounded-lg" value="{{ $event->end_time->format('Y-m-d\TH:i') }}"
                        required>
                </div>

                <div class="flex justify-between">
                    <a href="{{ route('events.show', $event) }}"
                        class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                        Cancel
                    </a>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Update Event
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>

</html>
