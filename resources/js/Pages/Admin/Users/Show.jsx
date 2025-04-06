import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Badge, Button, Card } from "flowbite-react";
import {
    HiArrowLeft,
    HiClock,
    HiMail,
    HiOfficeBuilding,
    HiPencil,
    HiShieldCheck,
    HiShieldExclamation,
} from "react-icons/hi";

export default function Show({ user, activity }) {
    return (
        <AdminLayout>
            <Head title={`User: ${user.name}`} />

            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">User Details</h2>
                <div className="flex gap-2">
                    <Button
                        as={Link}
                        href={route("admin.users.index")}
                        color="light"
                        size="sm"
                    >
                        <HiArrowLeft className="mr-2 h-5 w-5" />
                        Back to Users
                    </Button>
                    <Button
                        as={Link}
                        href={route("admin.users.edit", user.id)}
                        size="sm"
                    >
                        <HiPencil className="mr-2 h-5 w-5" />
                        Edit User
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-100 rounded-full p-3 mr-4">
                            <span className="text-blue-600 text-xl font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {user.name}
                            </h5>
                            <div className="flex items-center text-gray-500">
                                <HiMail className="mr-1" />
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 flex gap-2">
                        <Badge
                            color={user.is_admin ? "warning" : "info"}
                            className="mb-4"
                        >
                            {user.is_admin ? "Administrator" : "Regular User"}
                        </Badge>
                    </div>

                    <div className="mb-4">
                        <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Tenant (School)
                        </h6>
                        <div className="flex items-center">
                            <HiOfficeBuilding className="mr-2 text-gray-500" />
                            <p className="text-gray-700 dark:text-gray-300">
                                {user.tenant?.name || "No tenant assigned"}
                            </p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Member Since
                        </h6>
                        <div className="flex items-center">
                            <HiClock className="mr-2 text-gray-500" />
                            <p className="text-gray-700 dark:text-gray-300">
                                {new Date(user.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Role
                        </h6>
                        <div className="flex items-center">
                            {user.is_admin ? (
                                <>
                                    <HiShieldCheck className="mr-2 text-yellow-500" />
                                    <p className="text-yellow-700">
                                        Administrator (Full System Access)
                                    </p>
                                </>
                            ) : (
                                <>
                                    <HiShieldExclamation className="mr-2 text-blue-500" />
                                    <p className="text-blue-700">
                                        Regular User (Limited to Tenant Data)
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                            Recent Activity
                        </h5>

                        {activity && activity.length > 0 ? (
                            <div className="space-y-4">
                                {activity.map((item, index) => (
                                    <div
                                        key={index}
                                        className="border-l-4 border-blue-500 pl-3 py-1"
                                    >
                                        <p className="text-sm text-gray-700">
                                            {item.description}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(
                                                item.created_at
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">
                                No recent activity recorded.
                            </p>
                        )}
                    </Card>

                    <Card>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                            Quick Actions
                        </h5>

                        <div className="space-y-2">
                            <Button
                                as={Link}
                                href={route("admin.users.edit", user.id)}
                                className="w-full"
                            >
                                Edit User Details
                            </Button>

                            {user.tenant && (
                                <Button
                                    as={Link}
                                    href={route(
                                        "admin.tenants.show",
                                        user.tenant.id
                                    )}
                                    className="w-full"
                                    color="purple"
                                >
                                    View Tenant Details
                                </Button>
                            )}

                            <Button
                                as="button"
                                className="w-full"
                                color="failure"
                            >
                                Reset Password
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
