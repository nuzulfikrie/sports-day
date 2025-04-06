import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, Card, Table } from "flowbite-react";

export default function Show({ ageGroup }) {
    return (
        <AppLayout>
            <Head title={`Age Group: ${ageGroup.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Age Group Details
                            </h2>
                            <div className="flex gap-2">
                                <Link
                                    href={route("age-groups.edit", ageGroup.id)}
                                >
                                    <Button color="warning">
                                        Edit Age Group
                                    </Button>
                                </Link>
                                <Link href={route("age-groups.index")}>
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
                                        {ageGroup.name}
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Age Range
                                    </h5>
                                    <p className="text-base text-gray-900 dark:text-white">
                                        {ageGroup.min_age} - {ageGroup.max_age}{" "}
                                        years
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Max Participants per Event
                                    </h5>
                                    <p className="text-base text-gray-900 dark:text-white">
                                        {ageGroup.max_participants_per_event}
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Max Events per Student
                                    </h5>
                                    <p className="text-base text-gray-900 dark:text-white">
                                        {ageGroup.max_events_per_student}
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Description
                                    </h5>
                                    <p className="text-base text-gray-900 dark:text-white">
                                        {ageGroup.description}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {ageGroup.students.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Students in this Age Group
                                </h3>
                                <Table hoverable>
                                    <Table.Head>
                                        <Table.HeadCell>Name</Table.HeadCell>
                                        <Table.HeadCell>
                                            Registration Number
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Sport House
                                        </Table.HeadCell>
                                        <Table.HeadCell>Actions</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {ageGroup.students.map((student) => (
                                            <Table.Row
                                                key={student.id}
                                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {student.name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {
                                                        student.registration_number
                                                    }
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
                                                            View
                                                        </Button>
                                                    </Link>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                        )}

                        {ageGroup.events.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Events for this Age Group
                                </h3>
                                <Table hoverable>
                                    <Table.Head>
                                        <Table.HeadCell>
                                            Event Name
                                        </Table.HeadCell>
                                        <Table.HeadCell>Date</Table.HeadCell>
                                        <Table.HeadCell>Status</Table.HeadCell>
                                        <Table.HeadCell>
                                            Participants
                                        </Table.HeadCell>
                                        <Table.HeadCell>Actions</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {ageGroup.events.map((event) => (
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
                                                    {event.participants_count}
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
                                                            View
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
