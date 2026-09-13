import { Application } from '@/features/applications/types';

const KEY = 'applytrack-applications';

function getInitialApplications(): Application[] {
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date().toISOString();

    return [
        {
            id: '1',
            company: 'Acme Corp',
            role: 'Frontend Engineer',
            location: 'Remote',
            jobUrl: 'https://example.com/jobs/1',
            dateApplied: today,
            status: 'APPLIED',
            notes: 'Referred by a friend',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: '2',
            company: 'Globex',
            role: 'UI Engineer',
            location: 'Bengaluru',
            jobUrl: 'https://example.com/jobs/2',
            dateApplied: today,
            status: 'INTERVIEWING',
            notes: 'Round 1 cleared',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: '3',
            company: 'Initech',
            role: 'Frontend Developer',
            location: 'Pune',
            jobUrl: 'https://example.com/jobs/3',
            dateApplied: today,
            status: 'REJECTED',
            notes: 'No response after 2 rounds',
            createdAt: now,
            updatedAt: now,
        },
    ];
}

export function readApplications(): Application[] {
    if (typeof window === 'undefined') {
        // On server: just return initial data for now
        return getInitialApplications();
    }

    const raw = localStorage.getItem(KEY);
    if (!raw) {
        const initial = getInitialApplications();
        localStorage.setItem(KEY, JSON.stringify(initial));
        return initial;
    }

    return JSON.parse(raw) as Application[];
}

export function writeApplications(apps: Application[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEY, JSON.stringify(apps));
}