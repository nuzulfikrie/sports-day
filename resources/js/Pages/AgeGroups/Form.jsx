import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";

export default function Form({ ageGroup = null }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: ageGroup?.name || "",
        description: ageGroup?.description || "",
        min_age: ageGroup?.min_age || "",
        max_age: ageGroup?.max_age || "",
        max_participants_per_event: ageGroup?.max_participants_per_event || "",
        max_events_per_student: ageGroup?.max_events_per_student || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ageGroup) {
            put(route("age-groups.update", ageGroup.id));
        } else {
            post(route("age-groups.store"));
        }
    };

    return (
        <AppLayout>
            <Head title={ageGroup ? "Edit Age Group" : "Create Age Group"} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                            {ageGroup
                                ? "Edit Age Group"
                                : "Create New Age Group"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Name" />
                                </div>
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    color={errors.name ? "failure" : "gray"}
                                    helperText={errors.name}
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="description"
                                        value="Description"
                                    />
                                </div>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    color={
                                        errors.description ? "failure" : "gray"
                                    }
                                    helperText={errors.description}
                                    rows={4}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="min_age"
                                            value="Minimum Age"
                                        />
                                    </div>
                                    <TextInput
                                        id="min_age"
                                        type="number"
                                        value={data.min_age}
                                        onChange={(e) =>
                                            setData("min_age", e.target.value)
                                        }
                                        color={
                                            errors.min_age ? "failure" : "gray"
                                        }
                                        helperText={errors.min_age}
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="max_age"
                                            value="Maximum Age"
                                        />
                                    </div>
                                    <TextInput
                                        id="max_age"
                                        type="number"
                                        value={data.max_age}
                                        onChange={(e) =>
                                            setData("max_age", e.target.value)
                                        }
                                        color={
                                            errors.max_age ? "failure" : "gray"
                                        }
                                        helperText={errors.max_age}
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="max_participants_per_event"
                                            value="Max Participants per Event"
                                        />
                                    </div>
                                    <TextInput
                                        id="max_participants_per_event"
                                        type="number"
                                        value={data.max_participants_per_event}
                                        onChange={(e) =>
                                            setData(
                                                "max_participants_per_event",
                                                e.target.value
                                            )
                                        }
                                        color={
                                            errors.max_participants_per_event
                                                ? "failure"
                                                : "gray"
                                        }
                                        helperText={
                                            errors.max_participants_per_event
                                        }
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="max_events_per_student"
                                            value="Max Events per Student"
                                        />
                                    </div>
                                    <TextInput
                                        id="max_events_per_student"
                                        type="number"
                                        value={data.max_events_per_student}
                                        onChange={(e) =>
                                            setData(
                                                "max_events_per_student",
                                                e.target.value
                                            )
                                        }
                                        color={
                                            errors.max_events_per_student
                                                ? "failure"
                                                : "gray"
                                        }
                                        helperText={
                                            errors.max_events_per_student
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="submit"
                                    gradientDuoTone="greenToBlue"
                                    disabled={processing}
                                >
                                    {ageGroup
                                        ? "Update Age Group"
                                        : "Create Age Group"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
