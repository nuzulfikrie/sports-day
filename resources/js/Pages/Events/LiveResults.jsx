import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, Table, Badge } from 'flowbite-react';
import { HiAcademicCap } from 'react-icons/hi';

export default function LiveResults({ event, initialScores, totalScore, countdown }) {
    const [scores, setScores] = useState(initialScores);
    const [timeLeft, setTimeLeft] = useState(countdown);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <HiAcademicCap className="w-8 h-8 text-indigo-600 mr-2" />
                            {event.name} - Live Results
                        </h2>
                        {timeLeft > 0 && (
                            <div className="mt-2">
                                <Badge color="warning">Event ends in {formatTime(timeLeft)}</Badge>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <Card>
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>Position</Table.HeadCell>
                                    <Table.HeadCell>Team</Table.HeadCell>
                                    <Table.HeadCell>Score</Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                                    {scores.map((score, index) => (
                                        <Table.Row key={score.id}>
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>{score.team_name}</Table.Cell>
                                            <Table.Cell>{score.points}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="text-xl font-bold text-gray-900">Total Score</h5>
                                    <p className="text-sm text-gray-500">Overall points for all events</p>
                                </div>
                                <div className="text-3xl font-bold text-indigo-600">
                                    {totalScore}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 