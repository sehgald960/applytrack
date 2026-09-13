import { ApplicationStatus } from './types';

export const STAGES: { id: ApplicationStatus; label: string }[] = [
    { id: 'APPLIED', label: 'Applied' },
    { id: 'INTERVIEWING', label: 'Interviewing' },
    { id: 'OFFER', label: 'Offer' },
    { id: 'REJECTED', label: 'Rejected' },
];