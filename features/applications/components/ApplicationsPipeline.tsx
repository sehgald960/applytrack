'use client';

import { useEffect, useState } from 'react';
import { Application, ApplicationStatus } from '../types';
import { STAGES } from '../constant';
import ApplicationColumn from './ApplicationColumn';
import ApplicationForm from './ApplicationForm';

export default function ApplicationsPipeline() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/applications')
            .then((res) => res.json())
            .then((data: Application[]) => {
                setApplications(data);
                setLoading(false);
            });
    }, []);

    const handleCreateApplication = async (data: Partial<Application>) => {
        const res = await fetch('/api/applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                status: (data.status as ApplicationStatus) ?? 'APPLIED',
            }),
        });
        const newApp: Application = await res.json();
        setApplications((prev) => [...prev, newApp]);
    };

    const updateApplicationStatus = (id: string, status: ApplicationStatus) => {
        setApplications((prev) =>
            prev.map((a) =>
                a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a
            )
        );
        // Later: call API to persist
    };

    const updateApplication = (id: string, updates: Partial<Application>) => {
        setApplications((prev) =>
            prev.map((a) =>
                a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a
            )
        );
    };

    const deleteApplication = (id: string) => {
        setApplications((prev) => prev.filter((a) => a.id !== id));
    };

    if (loading) {
        return <div className="p-4">Loading applications...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">ApplyTrack – Applications Pipeline</h1>
            <ApplicationForm onSubmit={handleCreateApplication} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {STAGES.map((stage) => (
                    <ApplicationColumn
                        key={stage.id}
                        stage={stage}
                        applications={applications.filter((a) => a.status === stage.id)}
                        onUpdateStatus={updateApplicationStatus}
                        onUpdateApplication={updateApplication}
                        onDeleteApplication={deleteApplication}
                    />
                ))}
            </div>
        </div>
    );
}