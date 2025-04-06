import { Link, usePage } from "@inertiajs/react";
import { Avatar, Badge, Dropdown, Navbar, Sidebar } from "flowbite-react";
import {
    HiAcademicCap,
    HiCalendar,
    HiChartPie,
    HiLogout,
    HiShieldCheck,
    HiUser,
    HiUserGroup,
    HiUsers,
} from "react-icons/hi";

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user?.is_admin || false;

    const handleLogout = (e) => {
        e.preventDefault();
        document.getElementById("logout-form").submit();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar fluid rounded className="bg-white shadow-sm">
                <Navbar.Brand href="/">
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-blue-600">
                        Sports Day
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
                                {isAdmin && (
                                    <Badge color="red" size="sm">
                                        Admin
                                    </Badge>
                                )}
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
                        {isAdmin && (
                            <Dropdown.Item
                                as={Link}
                                href={route("admin.dashboard")}
                                icon={HiShieldCheck}
                            >
                                Admin Panel
                            </Dropdown.Item>
                        )}
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
                        href={route("dashboard")}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={route("sports-houses.index")}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Sports Houses
                    </Link>
                    <Link
                        href={route("events.index")}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Events
                    </Link>
                    <Link
                        href={route("live.index")}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Live Results
                    </Link>
                    {isAdmin && (
                        <Link
                            href={route("admin.dashboard")}
                            className="text-red-600 hover:text-red-800 font-medium"
                        >
                            Admin Panel
                        </Link>
                    )}
                </Navbar.Collapse>
            </Navbar>

            <div className="flex">
                <Sidebar aria-label="Sports Day Sidebar" className="w-64">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item
                                href={route("dashboard")}
                                icon={HiChartPie}
                            >
                                Dashboard
                            </Sidebar.Item>

                            <Sidebar.Collapse
                                icon={HiUsers}
                                label="Sports Houses"
                            >
                                <Sidebar.Item
                                    href={route("sports-houses.index")}
                                >
                                    View All Houses
                                </Sidebar.Item>
                                <Sidebar.Item href={route("teams.index")}>
                                    Sport Teams
                                </Sidebar.Item>
                            </Sidebar.Collapse>

                            <Sidebar.Collapse
                                icon={HiUserGroup}
                                label="Students"
                            >
                                <Sidebar.Item href={route("students.index")}>
                                    All Students
                                </Sidebar.Item>
                                <Sidebar.Item href={route("age-groups.index")}>
                                    Age Groups
                                </Sidebar.Item>
                            </Sidebar.Collapse>

                            <Sidebar.Item
                                href={route("events.index")}
                                icon={HiCalendar}
                            >
                                Events
                            </Sidebar.Item>

                            <Sidebar.Item
                                href={route("live.index")}
                                icon={HiAcademicCap}
                            >
                                Live Results
                            </Sidebar.Item>

                            <Sidebar.Item
                                href={route("profile.show")}
                                icon={HiUser}
                            >
                                My Profile
                            </Sidebar.Item>

                            <Sidebar.Item
                                href="#"
                                icon={HiLogout}
                                onClick={handleLogout}
                            >
                                Logout
                            </Sidebar.Item>

                            {isAdmin && (
                                <Sidebar.Item
                                    href={route("admin.dashboard")}
                                    icon={HiShieldCheck}
                                    className="mt-4 text-red-600 font-medium"
                                >
                                    Admin Panel
                                </Sidebar.Item>
                            )}
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>

                <main className="flex-1 p-4">{children}</main>
            </div>
        </div>
    );
}
