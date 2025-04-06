import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { Badge, Card, Progress, Table } from "flowbite-react";
import { HiAcademicCap, HiArrowLeft } from "react-icons/hi";

export default function SportHouseShow({ sportHouse }) {
    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="mb-6 flex items-center">
                        <Link
                            href={route("sports-houses.index")}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                            <HiArrowLeft className="w-6 h-6" />
                        </Link>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            {sportHouse.name}
                            <HiAcademicCap className="w-8 h-8 text-indigo-600 ml-2" />
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <Card>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h5 className="text-xl font-bold text-gray-900">
                                        Team Performance
                                    </h5>
                                    <p className="text-sm text-gray-500">
                                        Overall progress in all events
                                    </p>
                                </div>
                                <div className="text-3xl font-bold text-indigo-600">
                                    {sportHouse.total_points}
                                </div>
                            </div>
                            <Progress
                                progress={sportHouse.progress}
                                color="indigo"
                                size="lg"
                            />
                        </Card>

                        <Card>
                            <h5 className="text-xl font-bold text-gray-900 mb-4">
                                Recent Events
                            </h5>
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>Event</Table.HeadCell>
                                    <Table.HeadCell>Position</Table.HeadCell>
                                    <Table.HeadCell>Points</Table.HeadCell>
                                    <Table.HeadCell>Status</Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                                    {sportHouse.events.map((event) => (
                                        <Table.Row key={event.id}>
                                            <Table.Cell>
                                                {event.name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {event.position}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {event.points}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Badge
                                                    color={
                                                        event.status ===
                                                        "completed"
                                                            ? "success"
                                                            : event.status ===
                                                              "in_progress"
                                                            ? "warning"
                                                            : "gray"
                                                    }
                                                >
                                                    {event.status
                                                        .replace("_", " ")
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        event.status.slice(1)}
                                                </Badge>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
