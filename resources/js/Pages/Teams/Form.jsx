import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Form({ team = null, sportHouses, ageGroups }) {
    const [availableStudents, setAvailableStudents] = useState([]);
    const { data, setData, post, put, processing, errors } = useForm({
        name: team?.name || "",
        sport_house_id: team?.sport_house_id || "",
        age_group_id: team?.age_group_id || "",
        student_ids: team?.students?.map((student) => student.id) || [],
    });

    useEffect(() => {
        if (data.age_group_id) {
            fetch(route("teams.available-students", data.age_group_id))
                .then((response) => response.json())
                .then((data) => setAvailableStudents(data));
        }
    }, [data.age_group_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (team) {
            put(route("teams.update", team.id));
        } else {
            post(route("teams.store"));
        }
    };

    return (
        <AppLayout>
            <Head title={team ? "Edit Team" : "Create Team"} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                            {team ? "Edit Team" : "Create New Team"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Team Name" />
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
                                        htmlFor="age_group_id"
                                        value="Age Group"
                                    />
                                </div>
                                <Select
                                    id="age_group_id"
                                    value={data.age_group_id}
                                    onChange={(e) =>
                                        setData("age_group_id", e.target.value)
                                    }
                                    color={
                                        errors.age_group_id ? "failure" : "gray"
                                    }
                                    helperText={errors.age_group_id}
                                >
                                    <option value="">
                                        Select an age group
                                    </option>
                                    {ageGroups.map((group) => (
                                        <option key={group.id} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                            {data.age_group_id &&
                                availableStudents.length > 0 && (
                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="student_ids"
                                                value="Team Members"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {availableStudents.map(
                                                (student) => (
                                                    <div
                                                        key={student.id}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`student_${student.id}`}
                                                            value={student.id}
                                                            checked={data.student_ids.includes(
                                                                student.id
                                                            )}
                                                            onChange={(e) => {
                                                                const newIds = e
                                                                    .target
                                                                    .checked
                                                                    ? [
                                                                          ...data.student_ids,
                                                                          student.id,
                                                                      ]
                                                                    : data.student_ids.filter(
                                                                          (
                                                                              id
                                                                          ) =>
                                                                              id !==
                                                                              student.id
                                                                      );
                                                                setData(
                                                                    "student_ids",
                                                                    newIds
                                                                );
                                                            }}
                                                            className="mr-2"
                                                        />
                                                        <Label
                                                            htmlFor={`student_${student.id}`}
                                                        >
                                                            {student.name} (
                                                            {
                                                                student.registration_number
                                                            }
                                                            )
                                                        </Label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        {errors.student_ids && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.student_ids}
                                            </p>
                                        )}
                                    </div>
                                )}

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="submit"
                                    gradientDuoTone="greenToBlue"
                                    disabled={processing}
                                >
                                    {team ? "Update Team" : "Create Team"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
