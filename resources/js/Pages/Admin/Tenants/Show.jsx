import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Badge, Button, Card } from "flowbite-react";
import {
    HiArrowLeft,
    HiCalendar,
    HiOfficeBuilding,
    HiPencil,
    HiUser,
    HiUserGroup,
} from "react-icons/hi";

export default function Show({ tenant, stats }) {
    return (
        <AdminLayout>
            <Head title={`Tenant: ${tenant.name}`} />

            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Tenant Details</h2>
                <div className="flex gap-2">
                    <Button
                        as={Link}
                        href={route("admin.tenants.index")}
                        color="light"
                        size="sm"
                    >
                        <HiArrowLeft className="mr-2 h-5 w-5" />
                        Back to Tenants
                    </Button>
                    <Button
                        as={Link}
                        href={route("admin.tenants.edit", tenant.id)}
                        size="sm"
                    >
                        <HiPencil className="mr-2 h-5 w-5" />
                        Edit Tenant
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                        {tenant.name}
                    </h5>

                    <div className="mb-4">
                        <Badge
                            color={
                                tenant.status === "active"
                                    ? "success"
                                    : "failure"
                            }
                            className="mb-4"
                        >
                            {tenant.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                    </div>

                    <div className="mb-4">
                        <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Description
                        </h6>
                        <p className="text-gray-700 dark:text-gray-300">
                            {tenant.description || "No description provided."}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Created At
                        </h6>
                        <p className="text-gray-700 dark:text-gray-300">
                            {new Date(tenant.created_at).toLocaleDateString()}
                        </p>
                    </div>

                    <div>
                        <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Last Updated
                        </h6>
                        <p className="text-gray-700 dark:text-gray-300">
                            {new Date(tenant.updated_at).toLocaleDateString()}
                        </p>
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                            Statistics
                        </h5>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                    <HiUser className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Users
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {stats.users_count}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                                    <HiOfficeBuilding className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Sport Houses
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {stats.sport_houses_count}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg mr-3">
                                    <HiCalendar className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Events
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {stats.events_count}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                                    <HiUserGroup className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Students
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {stats.students_count}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                            Quick Links
                        </h5>

                        <div className="space-y-2">
                            <Button
                                as={Link}
                                href={route("admin.users.index", {
                                    tenant_id: tenant.id,
                                })}
                                className="w-full"
                            >
                                Manage Users
                            </Button>

                            <Button
                                as={Link}
                                href={route("admin.sport-houses.index", {
                                    tenant_id: tenant.id,
                                })}
                                className="w-full"
                                color="purple"
                            >
                                Sport Houses
                            </Button>

                            <Button
                                as={Link}
                                href={route("admin.events.index", {
                                    tenant_id: tenant.id,
                                })}
                                className="w-full"
                                color="success"
                            >
                                Events
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
