import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, Table } from "flowbite-react";

export default function Index({ students }) {
    return (
        <AppLayout>
            <Head title="Students" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Students
                            </h2>
                            <Link href={route("students.create")}>
                                <Button gradientDuoTone="greenToBlue">
                                    Add New Student
                                </Button>
                            </Link>
                        </div>

                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>Name</Table.HeadCell>
                                <Table.HeadCell>
                                    Registration Number
                                </Table.HeadCell>
                                <Table.HeadCell>Sport House</Table.HeadCell>
                                <Table.HeadCell>Age Groups</Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {students.map((student) => (
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
                                            {student.age_groups
                                                .map((group) => group.name)
                                                .join(", ")}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route(
                                                        "students.edit",
                                                        student.id
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
                                                        "students.show",
                                                        student.id
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
                                                        "students.destroy",
                                                        student.id
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
