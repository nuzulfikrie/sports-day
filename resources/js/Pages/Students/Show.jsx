import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, Card, Table } from "flowbite-react";

export default function Show({ student }) {
    return (
        <AppLayout>
            <Head title={`Student: ${student.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Student Details
                            </h2>
                            <div className="flex gap-2">
                                <Link href={route("students.edit", student.id)}>
                                    <Button color="warning">
                                        Edit Student
                                    </Button>
                                </Link>
                                <Link href={route("students.index")}>
                                    <Button color="gray">Back to List</Button>
                                </Link>
                            </div>
                        </div>

                        <Card>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Name
                                    </h5>
                                    <p className="text-base text-gray-900 dark:text-white">
                                        {student.name}
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Registration Number
                                    </h5>
                                    <p className="text-base text-gray-900 dark:text-white">
                                        {student.registration_number}
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Sport House
                                    </h5>
                                    <p className="text-base text-gray-900 dark:text-white">
                                        {student.sport_house.name}
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Age Groups
                                    </h5>
                                    <p className="text-base text-gray-900 dark:text-white">
                                        {student.age_groups
                                            .map((group) => group.name)
                                            .join(", ")}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {student.sport_teams.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Sport Teams
                                </h3>
                                <Table hoverable>
                                    <Table.Head>
                                        <Table.HeadCell>
                                            Team Name
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Age Group
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Sport House
                                        </Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {student.sport_teams.map((team) => (
                                            <Table.Row
                                                key={team.id}
                                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {team.name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {team.age_group.name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {team.sport_house.name}
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                        )}

                        {student.events.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Events Participated
                                </h3>
                                <Table hoverable>
                                    <Table.Head>
                                        <Table.HeadCell>
                                            Event Name
                                        </Table.HeadCell>
                                        <Table.HeadCell>Date</Table.HeadCell>
                                        <Table.HeadCell>Status</Table.HeadCell>
                                        <Table.HeadCell>Score</Table.HeadCell>
                                        <Table.HeadCell>
                                            Position
                                        </Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {student.events.map((event) => (
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
                                                    {event.pivot.score || "-"}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {event.pivot.position ||
                                                        "-"}
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
