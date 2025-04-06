import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, Card, Table } from "flowbite-react";

export default function Show({ team }) {
    return (
        <AppLayout>
            <Head title={`Team: ${team.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Team Details
                            </h2>
                            <div className="flex gap-2">
                                <Link href={route("teams.edit", team.id)}>
                                    <Button color="warning">Edit Team</Button>
                                </Link>
                                <Link href={route("teams.index")}>
                                    <Button color="gray">Back to List</Button>
                                </Link>
                            </div>
                        </div>

                        <Card>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Team Name
                                    </h5>
                                    <p className="text-base text-gray-900 dark:text-white">
                                        {team.name}
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Sport House
                                    </h5>
                                    <p className="text-base text-gray-900 dark:text-white">
                                        {team.sport_house.name}
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Age Group
                                    </h5>
                                    <p className="text-base text-gray-900 dark:text-white">
                                        {team.age_group.name}
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Total Members
                                    </h5>
                                    <p className="text-base text-gray-900 dark:text-white">
                                        {team.students.length} students
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <div className="mt-8">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Team Members
                            </h3>
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Name</Table.HeadCell>
                                    <Table.HeadCell>
                                        Registration Number
                                    </Table.HeadCell>
                                    <Table.HeadCell>Sport House</Table.HeadCell>
                                    <Table.HeadCell>Actions</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {team.students.map((student) => (
                                        <Table.Row
                                            key={student.id}
                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {student.name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {student.registration_number}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {student.sport_house.name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Link
                                                    href={route(
                                                        "students.show",
                                                        student.id
                                                    )}
                                                >
                                                    <Button
                                                        size="sm"
                                                        color="info"
                                                    >
                                                        View Profile
                                                    </Button>
                                                </Link>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>

                        {team.events.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Team Events
                                </h3>
                                <Table hoverable>
                                    <Table.Head>
                                        <Table.HeadCell>
                                            Event Name
                                        </Table.HeadCell>
                                        <Table.HeadCell>Date</Table.HeadCell>
                                        <Table.HeadCell>Status</Table.HeadCell>
                                        <Table.HeadCell>
                                            Total Score
                                        </Table.HeadCell>
                                        <Table.HeadCell>Actions</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {team.events.map((event) => (
                                            <Table.Row
                                                key={event.id}
                                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {event.name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {event.date}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {event.status}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {event.pivot.total_score ||
                                                        "-"}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Link
                                                        href={route(
                                                            "events.show",
                                                            event.id
                                                        )}
                                                    >
                                                        <Button
                                                            size="sm"
                                                            color="info"
                                                        >
                                                            View Event
                                                        </Button>
                                                    </Link>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
