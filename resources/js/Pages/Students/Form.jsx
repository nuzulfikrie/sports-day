import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Label, Select, TextInput } from "flowbite-react";

export default function Form({ student = null, sportHouses, ageGroups }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: student?.name || "",
        registration_number: student?.registration_number || "",
        sport_house_id: student?.sport_house_id || "",
        age_group_ids: student?.age_groups?.map((group) => group.id) || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (student) {
            put(route("students.update", student.id));
        } else {
            post(route("students.store"));
        }
    };

    return (
        <AppLayout>
            <Head title={student ? "Edit Student" : "Create Student"} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                            {student ? "Edit Student" : "Create New Student"}
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
                                        htmlFor="registration_number"
                                        value="Registration Number"
                                    />
                                </div>
                                <TextInput
                                    id="registration_number"
                                    type="text"
                                    value={data.registration_number}
                                    onChange={(e) =>
                                        setData(
                                            "registration_number",
                                            e.target.value
                                        )
                                    }
                                    color={
                                        errors.registration_number
                                            ? "failure"
                                            : "gray"
                                    }
                                    helperText={errors.registration_number}
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="sport_house_id"
                                        value="Sport House"
                                    />
                                </div>
                                <Select
                                    id="sport_house_id"
                                    value={data.sport_house_id}
                                    onChange={(e) =>
                                        setData(
                                            "sport_house_id",
                                            e.target.value
                                        )
                                    }
                                    color={
                                        errors.sport_house_id
                                            ? "failure"
                                            : "gray"
                                    }
                                    helperText={errors.sport_house_id}
                                >
                                    <option value="">
                                        Select a sport house
                                    </option>
                                    {sportHouses.map((house) => (
                                        <option key={house.id} value={house.id}>
                                            {house.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="age_group_ids"
                                        value="Age Groups"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {ageGroups.map((group) => (
                                        <div
                                            key={group.id}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="checkbox"
                                                id={`age_group_${group.id}`}
                                                value={group.id}
                                                checked={data.age_group_ids.includes(
                                                    group.id
                                                )}
                                                onChange={(e) => {
                                                    const newIds = e.target
                                                        .checked
                                                        ? [
                                                              ...data.age_group_ids,
                                                              group.id,
                                                          ]
                                                        : data.age_group_ids.filter(
                                                              (id) =>
                                                                  id !==
                                                                  group.id
                                                          );
                                                    setData(
                                                        "age_group_ids",
                                                        newIds
                                                    );
                                                }}
                                                className="mr-2"
                                            />
                                            <Label
                                                htmlFor={`age_group_${group.id}`}
                                            >
                                                {group.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.age_group_ids && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.age_group_ids}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="submit"
                                    gradientDuoTone="greenToBlue"
                                    disabled={processing}
                                >
                                    {student
                                        ? "Update Student"
                                        : "Create Student"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
