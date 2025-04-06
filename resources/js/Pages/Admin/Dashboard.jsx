import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button, Card, Table } from "flowbite-react";
import {
    HiCalendar,
    HiClock,
    HiDatabase,
    HiOfficeBuilding,
    HiShieldCheck,
    HiUserGroup,
    HiUsers,
} from "react-icons/hi";

export default function Dashboard({ stats }) {
    // In a real implementation, these stats would be passed from the controller
    const statistics = stats || {
        tenants: {
            total: 15,
            active: 12,
            latest: [
                {
                    id: 1,
                    name: "SK Taman Melawati",
                    status: "active",
                    created_at: "2023-04-01",
                },
                {
                    id: 2,
                    name: "SJK(C) Bangsar",
                    status: "active",
                    created_at: "2023-03-28",
                },
                {
                    id: 3,
                    name: "SK Taman Sri Rampai",
                    status: "inactive",
                    created_at: "2023-03-25",
                },
            ],
        },
        users: {
            total: 120,
            active: 98,
            admins: 5,
        },
        events: {
            total: 250,
            active: 45,
            completed: 205,
        },
        students: {
            total: 1500,
        },
        houses: {
            total: 60,
        },
    };

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                {/* Stats Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Tenants
                                </p>
                                <p className="text-2xl font-bold">
                                    {statistics.tenants.total}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {statistics.tenants.active} active
                                </p>
                            </div>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <HiOfficeBuilding className="h-8 w-8 text-blue-600" />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Users
                                </p>
                                <p className="text-2xl font-bold">
                                    {statistics.users.total}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {statistics.users.active} active
                                </p>
                            </div>
                            <div className="p-2 bg-green-100 rounded-lg">
                                <HiUsers className="h-8 w-8 text-green-600" />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Events
                                </p>
                                <p className="text-2xl font-bold">
                                    {statistics.events.total}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {statistics.events.active} active
                                </p>
                            </div>
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <HiCalendar className="h-8 w-8 text-purple-600" />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Students
                                </p>
                                <p className="text-2xl font-bold">
                                    {statistics.students.total}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Across all tenants
                                </p>
                            </div>
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <HiUserGroup className="h-8 w-8 text-yellow-600" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Recent Tenants and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">
                                    Recent Tenants
                                </h3>
                                <Button
                                    href={route("admin.tenants.index")}
                                    size="sm"
                                    color="light"
                                >
                                    View All
                                </Button>
                            </div>
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>Tenant Name</Table.HeadCell>
                                    <Table.HeadCell>Status</Table.HeadCell>
                                    <Table.HeadCell>Created</Table.HeadCell>
                                    <Table.HeadCell>Actions</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {statistics.tenants.latest.map((tenant) => (
                                        <Table.Row
                                            key={tenant.id}
                                            className="bg-white"
                                        >
                                            <Table.Cell className="font-medium">
                                                {tenant.name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${
                                                        tenant.status ===
                                                        "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {tenant.status}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {new Date(
                                                    tenant.created_at
                                                ).toLocaleDateString()}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button
                                                    size="xs"
                                                    href={route(
                                                        "admin.tenants.show",
                                                        tenant.id
                                                    )}
                                                >
                                                    View
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <h3 className="text-lg font-bold mb-4">
                                Quick Actions
                            </h3>

                            <div className="space-y-3">
                                <Button
                                    color="blue"
                                    className="w-full flex items-center"
                                    href={route("admin.tenants.create")}
                                >
                                    <HiOfficeBuilding className="mr-2" />
                                    Create New Tenant
                                </Button>

                                <Button
                                    color="green"
                                    className="w-full flex items-center"
                                    href={route("admin.users.create")}
                                >
                                    <HiUsers className="mr-2" />
                                    Create New User
                                </Button>

                                <Button
                                    color="purple"
                                    className="w-full flex items-center"
                                    href={route("admin.events")}
                                >
                                    <HiClock className="mr-2" />
                                    Manage Events
                                </Button>

                                <Button
                                    color="amber"
                                    className="w-full flex items-center"
                                    href={route("admin.reports")}
                                >
                                    <HiDatabase className="mr-2" />
                                    Generate Reports
                                </Button>

                                <Button
                                    color="red"
                                    className="w-full flex items-center"
                                    href={route("admin.settings")}
                                >
                                    <HiShieldCheck className="mr-2" />
                                    System Settings
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
