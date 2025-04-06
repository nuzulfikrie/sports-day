import AppLayout from "@/Layouts/AppLayout";
import { Card, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiAcademicCap, HiCalendar, HiUsers } from "react-icons/hi";

export default function Dashboard({
    sportHouses: initialSportHouses,
    events: initialEvents,
}) {
    const [sportHouses, setSportHouses] = useState(initialSportHouses);
    const [events, setEvents] = useState(initialEvents);

    useEffect(() => {
        window.Echo.channel("dashboard").listen(".stats.updated", (data) => {
            setSportHouses(data.sportHouses);
            setEvents(data.events);
        });

        return () => {
            window.Echo.leaveChannel("dashboard");
        };
    }, []);

    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <div className="flex items-center">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500">
                                <HiUsers className="h-5 w-5" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">
                                    Total Teams
                                </p>
                                <p className="text-xl font-bold">
                                    {sportHouses.length}
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
                                <HiCalendar className="h-5 w-5" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">
                                    Total Events
                                </p>
                                <p className="text-xl font-bold">
                                    {events.length}
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-500">
                                <HiAcademicCap className="h-5 w-5" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">
                                    Completed Events
                                </p>
                                <p className="text-xl font-bold">
                                    {
                                        events.filter(
                                            (event) =>
                                                event.status === "completed"
                                        ).length
                                    }
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Recent Events */}
                <Card>
                    <h2 className="text-xl font-bold mb-4">Recent Events</h2>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Event Name</Table.HeadCell>
                            <Table.HeadCell>Date</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {events.slice(0, 5).map((event) => (
                                <Table.Row key={event.id}>
                                    <Table.Cell>{event.name}</Table.Cell>
                                    <Table.Cell>
                                        {new Date(
                                            event.date
                                        ).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                event.status === "completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : event.status ===
                                                      "in_progress"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {event.status
                                                .replace("_", " ")
                                                .charAt(0)
                                                .toUpperCase() +
                                                event.status.slice(1)}
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Card>

                {/* Sports Houses Standings */}
                <Card>
                    <h2 className="text-xl font-bold mb-4">
                        Sports Houses Standings
                    </h2>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>House</Table.HeadCell>
                            <Table.HeadCell>Points</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {sportHouses.map((house) => (
                                <Table.Row key={house.id}>
                                    <Table.Cell>{house.name}</Table.Cell>
                                    <Table.Cell>
                                        {house.total_points}
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
