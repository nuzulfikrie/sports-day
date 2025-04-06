import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Badge, Button, Card, Table } from "flowbite-react";
import { HiEye, HiPencil, HiPlus, HiTrash } from "react-icons/hi";

export default function Index({ users }) {
    return (
        <AdminLayout>
            <Head title="User Management" />

            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">User Management</h2>
                <Button
                    color="success"
                    href={route("admin.users.create")}
                    className="flex items-center gap-1"
                >
                    <HiPlus />
                    Add New User
                </Button>
            </div>

            <Card>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Tenant</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {users.data.map((user) => (
                            <Table.Row
                                key={user.id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user.name}
                                </Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>
                                    {user.tenant?.name || "System"}
                                </Table.Cell>
                                <Table.Cell>
                                    {user.is_admin ? (
                                        <Badge color="red">Administrator</Badge>
                                    ) : (
                                        <Badge color="blue">User</Badge>
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge
                                        color={
                                            user.status === "active"
                                                ? "success"
                                                : "gray"
                                        }
                                    >
                                        {user.status || "Active"}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route(
                                                "admin.users.show",
                                                user.id
                                            )}
                                        >
                                            <Button size="xs" color="info">
                                                <HiEye className="mr-1" /> View
                                            </Button>
                                        </Link>
                                        <Link
                                            href={route(
                                                "admin.users.edit",
                                                user.id
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
                                                        "Are you sure you want to delete this user?"
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

                {users.links && (
                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {users.from}-{users.to} of {users.total}{" "}
                            results
                        </div>
                        <div className="flex gap-1">
                            {users.links.map((link, index) => (
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
