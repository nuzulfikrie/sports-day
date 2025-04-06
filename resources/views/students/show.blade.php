<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Student Details') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-lg font-medium">{{ $student->name }}</h3>
                        <div class="flex space-x-4">
                            <a href="{{ route('students.edit', $student) }}"
                                class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                Edit Student
                            </a>
                            <a href="{{ route('students.index') }}"
                                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Back to List
                            </a>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <h4 class="text-lg font-medium mb-4">Personal Information</h4>
                            <dl class="grid grid-cols-1 gap-4">
                                <div>
                                    <dt class="text-sm font-medium text-gray-500">Student ID</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{ $student->student_id }}</dd>
                                </div>
                                <div>
                                    <dt class="text-sm font-medium text-gray-500">Name</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{ $student->name }}</dd>
                                </div>
                                <div>
                                    <dt class="text-sm font-medium text-gray-500">Class</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{ $student->class }}</dd>
                                </div>
                                <div>
                                    <dt class="text-sm font-medium text-gray-500">Age</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{ $student->age }}</dd>
                                </div>
                            </dl>
                        </div>

                        <div class="bg-gray-50 p-6 rounded-lg">
                            <h4 class="text-lg font-medium mb-4">Sports House</h4>
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 rounded-full"
                                    style="background-color: {{ $student->sportsHouse->color }}"></div>
                                <div>
                                    <h5 class="font-medium">{{ $student->sportsHouse->name }}</h5>
                                    <p class="text-sm text-gray-500">House Color: {{ $student->sportsHouse->color }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8">
                        <h4 class="text-lg font-medium mb-4">Participating Events</h4>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Event</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Team</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Score</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    @foreach ($student->events as $event)
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap">{{ $event->name }}</td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                {{ $event->pivot->team_id ? $event->teams->find($event->pivot->team_id)->name : 'Individual' }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">{{ $event->pivot->score ?? '-' }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    {{ $event->status === 'completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : ($event->status === 'ongoing'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-gray-100 text-gray-800') }}">
                                                    {{ ucfirst($event->status) }}
                                                </span>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
