import { useState } from 'react';
import { Application } from '../types';

type Props = {
    onSubmit: (data: Partial<Application>) => void;
};

export default function ApplicationForm({ onSubmit }: Props) {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [jobUrl, setJobUrl] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!company.trim() || !role.trim()) return;

        onSubmit({
            company: company.trim(),
            role: role.trim(),
            location: location.trim() || undefined,
            jobUrl: jobUrl.trim() || undefined,
            notes: notes.trim() || undefined,
            dateApplied: new Date().toISOString().slice(0, 10),
            status: 'APPLIED',
        });

        setCompany('');
        setRole('');
        setLocation('');
        setJobUrl('');
        setNotes('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-xl mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                    className="border rounded px-3 py-2"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <input
                    className="border rounded px-3 py-2"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                    className="border rounded px-3 py-2"
                    placeholder="Location (optional)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    className="border rounded px-3 py-2"
                    placeholder="Job URL (optional)"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                />
            </div>

            <textarea
                className="border rounded px-3 py-2"
                placeholder="Notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
            />

            <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
            >
                Add Application
            </button>
        </form>
    );
}