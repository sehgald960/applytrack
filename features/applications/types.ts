export type ApplicationStatus = 'APPLIED' | 'INTERVIEWING' | 'OFFER' | 'REJECTED';

export interface Application {
    id: string;
    company: string;
    role: string;
    location?: string;
    jobUrl?: string;
    dateApplied: string; // YYYY-MM-DD
    status: ApplicationStatus;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}