<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Results - {{ $event->name }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        .medal-gold {
            color: #FFD700;
        }

        .medal-silver {
            color: #C0C0C0;
        }

        .medal-bronze {
            color: #CD7F32;
        }
    </style>
</head>

<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-bold text-gray-800">{{ $event->name }}</h1>
                    <p class="text-gray-600">
                        <span class="font-semibold" style="color: {{ $event->sportsHouse->color }}">
                            {{ $event->sportsHouse->name }}
                        </span>
                        | {{ $event->ageGroup->name }} | {{ $event->category }} ({{ $event->type }})
                    </p>
                </div>
                <div class="text-right">
                    <p class="text-gray-600">Venue: {{ $event->venue }}</p>
                    <p class="text-gray-600">Place: {{ $event->place }}</p>
                </div>
            </div>

            <div class="mb-6">
                <div class="text-center">
                    <h2 class="text-xl font-semibold text-gray-700 mb-2">Countdown</h2>
                    <div class="text-4xl font-bold text-indigo-600" id="countdown">
                        {{ $countdown }}
                    </div>
                </div>
            </div>

            <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">Results</h2>
                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th
                                    class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Position</th>
                                <th
                                    class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Student</th>
                                <th
                                    class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Team</th>
                                <th
                                    class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Score</th>
                                <th
                                    class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Remarks</th>
                            </tr>
                        </thead>
                        <tbody id="scores">
                            @foreach ($initialScores as $score)
                                <tr>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        @if ($score['position'])
                                            <span class="medal-{{ $score['medal'] }}">#{{ $score['position'] }}</span>
                                        @else
                                            -
                                        @endif
                                    </td>
                                    <td class="py-2 px-4 border-b border-gray-200">{{ $score['name'] }}</td>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        @if ($score['team_id'])
                                            Team {{ $score['team_id'] }}
                                        @else
                                            -
                                        @endif
                                    </td>
                                    <td class="py-2 px-4 border-b border-gray-200 student-score"
                                        data-student-id="{{ $score['student_id'] }}">
                                        {{ $score['score'] }}
                                    </td>
                                    <td class="py-2 px-4 border-b border-gray-200">{{ $score['remarks'] ?? '-' }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="text-center">
                <h2 class="text-xl font-semibold text-gray-700 mb-2">Total Score</h2>
                <div class="text-4xl font-bold text-indigo-600" id="total-score">
                    {{ $totalScore }}
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof Echo === 'undefined') {
                console.error('Echo library is not loaded!');
                return;
            }

            window.Echo = new Echo({
                broadcaster: 'reverb',
                key: '{{ env('REVERB_APP_KEY') }}',
                wsHost: '{{ env('REVERB_HOST', 'localhost') }}',
                wsPort: {{ env('REVERB_PORT', 8080) }},
                forceTLS: {{ env('REVERB_SCHEME') === 'https' ? 'true' : 'false' }},
                enabledTransports: ['ws', 'wss'],
                authEndpoint: '/broadcasting/auth',
                namespace: '',
                withCredentials: true,
                disableStats: true
            });

            Echo.channel(`tenant.{{ $event->sportsHouse->tenant_id }}.event.{{ $event->id }}`)
                .listen('.score.updated', (e) => {
                    // Update scores
                    e.scores.forEach(score => {
                        let scoreElement = document.querySelector(
                            `.student-score[data-student-id="${score.student_id}"]`);
                        if (scoreElement) {
                            const row = scoreElement.parentElement;
                            row.innerHTML = `
                                <td class="py-2 px-4 border-b border-gray-200">
                                    ${score.position ? `<span class="medal-${score.medal}">#${score.position}</span>` : '-'}
                                </td>
                                <td class="py-2 px-4 border-b border-gray-200">${score.name}</td>
                                <td class="py-2 px-4 border-b border-gray-200">
                                    ${score.team_id ? 'Team ' + score.team_id : '-'}
                                </td>
                                <td class="py-2 px-4 border-b border-gray-200 student-score" data-student-id="${score.student_id}">
                                    ${score.score}
                                </td>
                                <td class="py-2 px-4 border-b border-gray-200">${score.remarks || '-'}</td>
                            `;
                        } else {
                            const tbody = document.getElementById('scores');
                            tbody.innerHTML += `
                                <tr>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        ${score.position ? `<span class="medal-${score.medal}">#${score.position}</span>` : '-'}
                                    </td>
                                    <td class="py-2 px-4 border-b border-gray-200">${score.name}</td>
                                    <td class="py-2 px-4 border-b border-gray-200">
                                        ${score.team_id ? 'Team ' + score.team_id : '-'}
                                    </td>
                                    <td class="py-2 px-4 border-b border-gray-200 student-score" data-student-id="${score.student_id}">
                                        ${score.score}
                                    </td>
                                    <td class="py-2 px-4 border-b border-gray-200">${score.remarks || '-'}</td>
                                </tr>
                            `;
                        }
                    });

                    // Update total score and countdown
                    document.getElementById('total-score').textContent = e.total_score;
                    document.getElementById('countdown').textContent = e.countdown;
                });
        });
    </script>
</body>

</html>
