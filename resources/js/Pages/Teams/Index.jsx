import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, Table } from "flowbite-react";

export default function Index({ teams }) {
    return (
        <AppLayout>
            <Head title="Sport Teams" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Sport Teams
                            </h2>
                            <Link href={route("teams.create")}>
                                <Button gradientDuoTone="greenToBlue">
                                    Add New Team
                                </Button>
                            </Link>
                        </div>

                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>Team Name</Table.HeadCell>
                                <Table.HeadCell>Sport House</Table.HeadCell>
                                <Table.HeadCell>Age Group</Table.HeadCell>
                                <Table.HeadCell>Members</Table.HeadCell>
                                <Table.HeadCell>Events</Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {teams.map((team) => (
                                    <Table.Row
                                        key={team.id}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {team.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {team.sport_house.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {team.age_group.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {team.students_count} students
                                        </Table.Cell>
                                        <Table.Cell>
                                            {team.events_count} events
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route(
                                                        "teams.edit",
                                                        team.id
                                                    )}
                                                >
                                                    <Button
                                                        size="sm"
                                                        color="warning"
                                                    >
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "teams.show",
                                                        team.id
                                                    )}
                                                >
                                                    <Button
                                                        size="sm"
                                                        color="info"
                                                    >
                                                        View
                                                    </Button>
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "teams.destroy",
                                                        team.id
                                                    )}
                                                    method="delete"
                                                    as="button"
                                                    type="button"
                                                >
                                                    <Button
                                                        size="sm"
                                                        color="failure"
                                                    >
                                                        Delete
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
