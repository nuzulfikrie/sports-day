<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Edit Student') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <form method="POST" action="{{ route('students.update', $student) }}" class="space-y-6">
                        @csrf
                        @method('PUT')

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <x-input-label for="name" :value="__('Name')" />
                                <x-text-input id="name" name="name" type="text" class="mt-1 block w-full"
                                    :value="old('name', $student->name)" required autofocus />
                                <x-input-error class="mt-2" :messages="$errors->get('name')" />
                            </div>

                            <div>
                                <x-input-label for="student_id" :value="__('Student ID')" />
                                <x-text-input id="student_id" name="student_id" type="text" class="mt-1 block w-full"
                                    :value="old('student_id', $student->student_id)" required />
                                <x-input-error class="mt-2" :messages="$errors->get('student_id')" />
                            </div>

                            <div>
                                <x-input-label for="class" :value="__('Class')" />
                                <x-text-input id="class" name="class" type="text" class="mt-1 block w-full"
                                    :value="old('class', $student->class)" required />
                                <x-input-error class="mt-2" :messages="$errors->get('class')" />
                            </div>

                            <div>
                                <x-input-label for="age" :value="__('Age')" />
                                <x-text-input id="age" name="age" type="number" class="mt-1 block w-full"
                                    :value="old('age', $student->age)" required />
                                <x-input-error class="mt-2" :messages="$errors->get('age')" />
                            </div>

                            <div>
                                <x-input-label for="sport_house_id" :value="__('Sports House')" />
                                <select id="sport_house_id" name="sport_house_id"
                                    class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    required>
                                    <option value="">Select a Sports House</option>
                                    @foreach ($sportsHouses as $house)
                                        <option value="{{ $house->id }}"
                                            {{ old('sport_house_id', $student->sport_house_id) == $house->id ? 'selected' : '' }}>
                                            {{ $house->name }}
                                        </option>
                                    @endforeach
                                </select>
                                <x-input-error class="mt-2" :messages="$errors->get('sport_house_id')" />
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <x-primary-button>{{ __('Update Student') }}</x-primary-button>
                            <a href="{{ route('students.show', $student) }}"
                                class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700">
                                {{ __('Cancel') }}
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
