import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, Table } from "flowbite-react";

export default function Index({ ageGroups }) {
    return (
        <AppLayout>
            <Head title="Age Groups" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Age Groups
                            </h2>
                            <Link href={route("age-groups.create")}>
                                <Button gradientDuoTone="greenToBlue">
                                    Add New Age Group
                                </Button>
                            </Link>
                        </div>

                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>Name</Table.HeadCell>
                                <Table.HeadCell>Age Range</Table.HeadCell>
                                <Table.HeadCell>
                                    Max Participants
                                </Table.HeadCell>
                                <Table.HeadCell>Max Events</Table.HeadCell>
                                <Table.HeadCell>Students</Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {ageGroups.map((group) => (
                                    <Table.Row
                                        key={group.id}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {group.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {group.min_age} - {group.max_age}{" "}
                                            years
                                        </Table.Cell>
                                        <Table.Cell>
                                            {group.max_participants_per_event}{" "}
                                            per event
                                        </Table.Cell>
                                        <Table.Cell>
                                            {group.max_events_per_student} per
                                            student
                                        </Table.Cell>
                                        <Table.Cell>
                                            {group.students_count} students
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route(
                                                        "age-groups.edit",
                                                        group.id
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
                                                        "age-groups.show",
                                                        group.id
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
                                                        "age-groups.destroy",
                                                        group.id
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
