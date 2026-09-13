import { useState } from 'react';
import { Application, ApplicationStatus } from '../types';
import { STAGES } from '../constant';

type Props = {
    application: Application;
    onUpdateStatus: (id: string, status: ApplicationStatus) => void;
    onUpdateApplication: (id: string, updates: Partial<Application>) => void;
    onDeleteApplication: (id: string) => void;
};

export default function ApplicationCard({
    application,
    onUpdateStatus,
    onUpdateApplication,
    onDeleteApplication,
}: Props) {
    const [editing, setEditing] = useState(false);
    const [company, setCompany] = useState(application.company);
    const [role, setRole] = useState(application.role);
    const [location, setLocation] = useState(application.location ?? '');
    const [jobUrl, setJobUrl] = useState(application.jobUrl ?? '');
    const [notes, setNotes] = useState(application.notes ?? '');

    const saveEdit = () => {
        onUpdateApplication(application.id, {
            company,
            role,
            location: location || undefined,
            jobUrl: jobUrl || undefined,
            notes: notes || undefined,
        });
        setEditing(false);
    };

    return (
        <div className="bg-white rounded shadow p-3">
            {!editing ? (
                <>
                    <h3 className="font-medium">{application.company}</h3>
                    <p className="text-sm text-gray-700">{application.role}</p>

                    {application.location && (
                        <p className="text-xs text-gray-500 mt-1">{application.location}</p>
                    )}

                    {application.jobUrl && (
                        <a
                            href={application.jobUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-600 block mt-1"
                        >
                            Job posting
                        </a>
                    )}

                    {application.notes && (
                        <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                            {application.notes}
                        </p>
                    )}

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <select
                            value={application.status}
                            onChange={(e) =>
                                onUpdateStatus(application.id, e.target.value as ApplicationStatus)
                            }
                            className="text-sm border rounded px-2 py-1"
                        >
                            {STAGES.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.label}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => setEditing(true)}
                            className="text-sm text-blue-600"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onDeleteApplication(application.id)}
                            className="text-sm text-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </>
            ) : (
                <div className="space-y-2">
                    <input
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company"
                    />
                    <input
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Role"
                    />
                    <input
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location"
                    />
                    <input
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={jobUrl}
                        onChange={(e) => setJobUrl(e.target.value)}
                        placeholder="Job URL"
                    />
                    <textarea
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Notes"
                        rows={3}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={saveEdit}
                            className="text-sm bg-blue-600 text-white px-2 py-1 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="text-sm text-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}