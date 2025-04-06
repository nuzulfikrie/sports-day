import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { Card, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";

export default function LiveResultsShow({
    event: initialEvent,
    initialScores,
    totalScore: initialTotalScore,
    countdown: initialCountdown,
}) {
    const [scores, setScores] = useState(initialScores);
    const [totalScore, setTotalScore] = useState(initialTotalScore);
    const [countdown, setCountdown] = useState(initialCountdown);

    useEffect(() => {
        window.Echo.channel(`event.${initialEvent.id}`).listen(
            ".score.updated",
            (data) => {
                setScores(data.scores);
                setTotalScore(data.total_score);
                setCountdown(data.countdown);
            }
        );

        return () => {
            window.Echo.leaveChannel(`event.${initialEvent.id}`);
        };
    }, [initialEvent.id]);

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center">
                    <Link
                        href={route("live.index")}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                        <HiArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {initialEvent.name} - Live Results
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-500">
                                Total Score
                            </p>
                            <p className="text-3xl font-bold text-indigo-600">
                                {totalScore}
                            </p>
                        </div>
                    </Card>
                    <Card>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-500">
                                Time Remaining
                            </p>
                            <p className="text-3xl font-bold text-indigo-600">
                                {countdown}
                            </p>
                        </div>
                    </Card>
                    <Card>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-500">
                                Status
                            </p>
                            <p className="text-3xl font-bold text-indigo-600">
                                {initialEvent.status.charAt(0).toUpperCase() +
                                    initialEvent.status.slice(1)}
                            </p>
                        </div>
                    </Card>
                </div>

                <Card>
                    <h2 className="text-xl font-bold mb-4">Scores</h2>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Student</Table.HeadCell>
                            <Table.HeadCell>Score</Table.HeadCell>
                            <Table.HeadCell>Team</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {scores.map((score) => (
                                <Table.Row key={score.student_id}>
                                    <Table.Cell>{score.name}</Table.Cell>
                                    <Table.Cell>{score.score}</Table.Cell>
                                    <Table.Cell>
                                        {score.team_id || "-"}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}
