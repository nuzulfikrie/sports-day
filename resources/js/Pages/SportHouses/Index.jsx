import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { Badge, Card, Table } from "flowbite-react";
import { HiEye } from "react-icons/hi";

export default function SportHousesIndex({ sportHouses }) {
    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    Sports Houses
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sportHouses.map((house) => (
                        <Link
                            key={house.id}
                            href={route("sports-houses.show", house.id)}
                            className="block"
                        >
                            <Card className="hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div
                                        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                                        style={{
                                            backgroundColor: house.color,
                                        }}
                                    >
                                        <span
                                            className={`text-white text-xl font-bold`}
                                        >
                                            {house.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                        <span className="mr-2">
                                            {house.name}
                                        </span>
                                        <span className="text-sm font-normal text-gray-500">
                                            {house.tenant.name}
                                        </span>
                                    </h2>
                                    <Badge color="info">
                                        {house.total_points} points
                                    </Badge>
                                </div>
                                <div className="mt-4">
                                    <p className="text-gray-600">
                                        {house.students_count} students
                                    </p>
                                    <p className="text-gray-600">
                                        {house.events_count} events participated
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                <Card>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>House</Table.HeadCell>
                            <Table.HeadCell>Students</Table.HeadCell>
                            <Table.HeadCell>Events</Table.HeadCell>
                            <Table.HeadCell>Points</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {sportHouses.map((house) => (
                                <Table.Row key={house.id}>
                                    <Table.Cell>{house.name}</Table.Cell>
                                    <Table.Cell>
                                        {house.students_count}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {house.events_count}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {house.total_points}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            href={route(
                                                "sports-houses.show",
                                                house.id
                                            )}
                                        >
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <HiEye className="h-5 w-5" />
                                            </button>
                                        </Link>
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
