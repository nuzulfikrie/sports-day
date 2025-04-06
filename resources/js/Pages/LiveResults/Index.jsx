import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { Card } from "flowbite-react";

export default function LiveResultsIndex({ events }) {
    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    Live Events
                </h1>

                {events.length === 0 ? (
                    <Card>
                        <div className="text-center py-8">
                            <p className="text-gray-500">
                                No live events at the moment
                            </p>
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {events.map((event) => (
                            <Card key={event.id}>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">
                                        {event.name}
                                    </h2>
                                    <Link
                                        href={route("live.show", {
                                            event: event.id,
                                        })}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        View Live Results
                                    </Link>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <p>Age Group: {event.age_group.name}</p>
                                    <p>Location: {event.location}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
