import { Link, usePage } from "@inertiajs/react";
import { Avatar, Dropdown, Navbar, Sidebar } from "flowbite-react";
import {
    HiCalendar,
    HiChartPie,
    HiClipboardList,
    HiCog,
    HiLogout,
    HiOfficeBuilding,
    HiUser,
    HiUserGroup,
} from "react-icons/hi";

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;

    const handleLogout = (e) => {
        e.preventDefault();
        document.getElementById("logout-form").submit();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar fluid rounded className="bg-white shadow-sm">
                <Navbar.Brand href="/">
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-blue-600">
                        Sports Day{" "}
                        <span className="text-red-500 text-sm">Admin</span>
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <div className="flex items-center gap-2">
                                <Avatar
                                    rounded
                                    size="sm"
                                    placeholderInitials={auth.user?.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                />
                                <span className="text-sm text-gray-600 hidden md:inline-block">
                                    {auth.user?.name}
                                </span>
                            </div>
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {auth.user?.name}
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {auth.user?.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item
                            as={Link}
                            href={route("profile.show")}
                            icon={HiUser}
                        >
                            Profile
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout} icon={HiLogout}>
                            Logout
                        </Dropdown.Item>
                    </Dropdown>
                    <form
                        id="logout-form"
                        method="POST"
                        action={route("logout")}
                        className="hidden"
                    >
                        <input
                            type="hidden"
                            name="_token"
                            value={
                                document.head
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.getAttribute("content") || ""
                            }
                        />
                    </form>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Link
                        href={route("admin.dashboard")}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Admin Dashboard
                    </Link>
                    <Link
                        href={route("dashboard")}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        User Dashboard
                    </Link>
                    <Link
                        href={route("admin.users.index")}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Manage Users
                    </Link>
                    <Link
                        href={route("admin.tenants.index")}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Manage Tenants
                    </Link>
                </Navbar.Collapse>
            </Navbar>

            <div className="flex">
                <Sidebar aria-label="Admin Sidebar" className="w-64">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item
                                href={route("admin.dashboard")}
                                icon={HiChartPie}
                            >
                                Admin Dashboard
                            </Sidebar.Item>
                            <Sidebar.Item
                                href={route("dashboard")}
                                icon={HiChartPie}
                            >
                                User Dashboard
                            </Sidebar.Item>

                            <Sidebar.Collapse
                                icon={HiUserGroup}
                                label="User Management"
                            >
                                <Sidebar.Item href={route("admin.users.index")}>
                                    Users
                                </Sidebar.Item>
                                <Sidebar.Item href={route("profile.show")}>
                                    My Profile
                                </Sidebar.Item>
                            </Sidebar.Collapse>

                            <Sidebar.Collapse
                                icon={HiOfficeBuilding}
                                label="Tenant Management"
                            >
                                <Sidebar.Item
                                    href={route("admin.tenants.index")}
                                >
                                    Tenants
                                </Sidebar.Item>
                                <Sidebar.Item
                                    href={route("admin.sport-houses.index")}
                                >
                                    Sport Houses
                                </Sidebar.Item>
                                <Sidebar.Item
                                    href={route("admin.age-groups.index")}
                                >
                                    Age Groups
                                </Sidebar.Item>
                            </Sidebar.Collapse>

                            <Sidebar.Item
                                href={route("admin.events.index")}
                                icon={HiCalendar}
                            >
                                Event Management
                            </Sidebar.Item>

                            <Sidebar.Item
                                href={route("admin.reports")}
                                icon={HiClipboardList}
                            >
                                Reports
                            </Sidebar.Item>

                            <Sidebar.Item
                                href={route("admin.settings")}
                                icon={HiCog}
                            >
                                System Settings
                            </Sidebar.Item>

                            <Sidebar.Item
                                href="#"
                                icon={HiLogout}
                                onClick={handleLogout}
                            >
                                Logout
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>

                <main className="flex-1 p-4">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Admin Control Panel
                        </h1>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
}
