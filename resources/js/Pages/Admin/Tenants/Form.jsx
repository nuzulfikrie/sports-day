import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Alert,
    Button,
    Card,
    Label,
    Select,
    TextInput,
    Textarea,
} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function Form({ tenant = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: tenant?.name || "",
        description: tenant?.description || "",
        status: tenant?.status || "active",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (tenant) {
            put(route("admin.tenants.update", tenant.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route("admin.tenants.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <AdminLayout>
            <Head title={tenant ? "Edit Tenant" : "Create Tenant"} />

            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                    {tenant
                        ? `Edit Tenant: ${tenant.name}`
                        : "Create New Tenant"}
                </h2>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="School Name" />
                        </div>
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Enter school name"
                            required
                            color={errors.name ? "failure" : "gray"}
                            helperText={errors.name}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description" />
                        </div>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            placeholder="Enter description of the school"
                            rows={4}
                            color={errors.description ? "failure" : "gray"}
                            helperText={errors.description}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="status" value="Status" />
                        </div>
                        <Select
                            id="status"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            required
                            color={errors.status ? "failure" : "gray"}
                            helperText={errors.status}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Select>
                    </div>

                    {tenant && (
                        <Alert color="info" icon={HiInformationCircle}>
                            <span className="font-medium">Info!</span> Changing
                            the status to inactive will disable access for all
                            users of this tenant.
                        </Alert>
                    )}

                    <div className="flex justify-end gap-4">
                        <Button
                            color="light"
                            onClick={() => window.history.back()}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {tenant ? "Update Tenant" : "Create Tenant"}
                        </Button>
                    </div>
                </form>
            </Card>
        </AdminLayout>
    );
}
