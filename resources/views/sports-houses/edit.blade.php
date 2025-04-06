<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Edit Sports House') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <form method="POST" action="{{ route('sports-houses.update', $sportsHouse) }}" class="space-y-6"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <x-input-label for="name" :value="__('Name')" />
                                <x-text-input id="name" name="name" type="text" class="mt-1 block w-full"
                                    :value="old('name', $sportsHouse->name)" required autofocus />
                                <x-input-error class="mt-2" :messages="$errors->get('name')" />
                            </div>

                            <div>
                                <x-input-label for="color" :value="__('Color')" />
                                <x-text-input id="color" name="color" type="color"
                                    class="mt-1 block w-full h-10" :value="old('color', $sportsHouse->color)" required />
                                <x-input-error class="mt-2" :messages="$errors->get('color')" />
                            </div>

                            <div>
                                <x-input-label for="logo" :value="__('Logo')" />
                                @if ($sportsHouse->logo)
                                    <div class="mt-2">
                                        <img src="{{ asset('storage/' . $sportsHouse->logo) }}"
                                            alt="{{ $sportsHouse->name }} logo"
                                            class="h-20 w-20 object-cover rounded-full">
                                    </div>
                                @endif
                                <input type="file" id="logo" name="logo" class="mt-1 block w-full"
                                    accept="image/*" />
                                <x-input-error class="mt-2" :messages="$errors->get('logo')" />
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <x-primary-button>{{ __('Update Sports House') }}</x-primary-button>
                            <a href="{{ route('sports-houses.show', $sportsHouse) }}"
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
