import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Badge, Button, Card, Table } from "flowbite-react";
import { HiEye, HiPencil, HiPlus, HiTrash } from "react-icons/hi";

export default function Index({ tenants }) {
    return (
        <AdminLayout>
            <Head title="Tenant Management" />

            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Tenant Management</h2>
                <Button
                    color="success"
                    href={route("admin.tenants.create")}
                    className="flex items-center gap-1"
                >
                    <HiPlus />
                    Add New Tenant
                </Button>
            </div>

            <Card>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>School Name</Table.HeadCell>
                        <Table.HeadCell>Users</Table.HeadCell>
                        <Table.HeadCell>Sport Houses</Table.HeadCell>
                        <Table.HeadCell>Events</Table.HeadCell>
                        <Table.HeadCell>Students</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {tenants.data.map((tenant) => (
                            <Table.Row
                                key={tenant.id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {tenant.name}
                                </Table.Cell>
                                <Table.Cell>{tenant.users_count}</Table.Cell>
                                <Table.Cell>
                                    {tenant.sport_houses_count}
                                </Table.Cell>
                                <Table.Cell>{tenant.events_count}</Table.Cell>
                                <Table.Cell>{tenant.students_count}</Table.Cell>
                                <Table.Cell>
                                    <Badge
                                        color={
                                            tenant.status === "active"
                                                ? "success"
                                                : "gray"
                                        }
                                    >
                                        {tenant.status}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route(
                                                "admin.tenants.show",
                                                tenant.id
                                            )}
                                        >
                                            <Button size="xs" color="info">
                                                <HiEye className="mr-1" /> View
                                            </Button>
                                        </Link>
                                        <Link
                                            href={route(
                                                "admin.tenants.edit",
                                                tenant.id
                                            )}
                                        >
                                            <Button size="xs" color="warning">
                                                <HiPencil className="mr-1" />{" "}
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            size="xs"
                                            color="failure"
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        "Are you sure you want to delete this tenant? This will delete all associated data."
                                                    )
                                                ) {
                                                    // Implement delete functionality
                                                }
                                            }}
                                        >
                                            <HiTrash className="mr-1" /> Delete
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                {tenants.links && (
                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {tenants.from}-{tenants.to} of{" "}
                            {tenants.total} results
                        </div>
                        <div className="flex gap-1">
                            {tenants.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-4 py-2 text-sm rounded ${
                                        link.active
                                            ? "bg-blue-600 text-white"
                                            : link.url
                                            ? "bg-white text-gray-500 hover:bg-gray-100"
                                            : "bg-gray-100 text-gray-400 cursor-default"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </Card>
        </AdminLayout>
    );
}
