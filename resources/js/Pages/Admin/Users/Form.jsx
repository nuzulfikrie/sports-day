import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Alert,
    Button,
    Card,
    Checkbox,
    Label,
    Select,
    TextInput,
} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function Form({ user = null, tenants = [] }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        tenant_id: user?.tenant_id || "",
        is_admin: user?.is_admin || false,
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user) {
            put(route("admin.users.update", user.id), {
                onSuccess: () => reset("password", "password_confirmation"),
            });
        } else {
            post(route("admin.users.store"), {
                onSuccess: () => reset("password", "password_confirmation"),
            });
        }
    };

    return (
        <AdminLayout>
            <Head title={user ? "Edit User" : "Create User"} />

            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                    {user ? `Edit User: ${user.name}` : "Create New User"}
                </h2>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Enter user name"
                            required
                            color={errors.name ? "failure" : "gray"}
                            helperText={errors.name}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Enter user email"
                            required
                            color={errors.email ? "failure" : "gray"}
                            helperText={errors.email}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="tenant" value="Tenant (School)" />
                        </div>
                        <Select
                            id="tenant"
                            value={data.tenant_id}
                            onChange={(e) =>
                                setData("tenant_id", e.target.value)
                            }
                            required
                            color={errors.tenant_id ? "failure" : "gray"}
                            helperText={errors.tenant_id}
                        >
                            <option value="">Select a tenant</option>
                            {tenants.map((tenant) => (
                                <option key={tenant.id} value={tenant.id}>
                                    {tenant.name}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="is_admin"
                            checked={data.is_admin}
                            onChange={(e) =>
                                setData("is_admin", e.target.checked)
                            }
                        />
                        <Label htmlFor="is_admin">Administrator Account</Label>
                    </div>

                    {data.is_admin && (
                        <Alert color="warning" icon={HiInformationCircle}>
                            <span className="font-medium">Warning!</span>{" "}
                            Administrator accounts have access to all tenants
                            and system-wide settings.
                        </Alert>
                    )}

                    <hr className="my-4" />

                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password"
                                value={
                                    user
                                        ? "New Password (leave blank to keep current)"
                                        : "Password"
                                }
                            />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder={
                                user
                                    ? "Enter new password (optional)"
                                    : "Enter password"
                            }
                            required={!user}
                            color={errors.password ? "failure" : "gray"}
                            helperText={errors.password}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />
                        </div>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            placeholder="Confirm password"
                            required={!user || data.password !== ""}
                            color={
                                errors.password_confirmation
                                    ? "failure"
                                    : "gray"
                            }
                            helperText={errors.password_confirmation}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            color="light"
                            onClick={() => window.history.back()}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {user ? "Update User" : "Create User"}
                        </Button>
                    </div>
                </form>
            </Card>
        </AdminLayout>
    );
}
