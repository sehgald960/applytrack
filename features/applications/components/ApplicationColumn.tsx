import { Application, ApplicationStatus } from '../types';
import ApplicationCard from './ApplicationCard';

type Props = {
    stage: { id: ApplicationStatus; label: string };
    applications: Application[];
    onUpdateStatus: (id: string, status: ApplicationStatus) => void;
    onUpdateApplication: (id: string, updates: Partial<Application>) => void;
    onDeleteApplication: (id: string) => void;
};

export default function ApplicationColumn({
    stage,
    applications,
    onUpdateStatus,
    onUpdateApplication,
    onDeleteApplication,
}: Props) {
    return (
        <div className="bg-gray-100 rounded p-3">
            <h2 className="font-semibold mb-3">
                {stage.label} ({applications.length})
            </h2>
            <div className="space-y-3">
                {applications.map((app) => (
                    <ApplicationCard
                        key={app.id}
                        application={app}
                        onUpdateStatus={onUpdateStatus}
                        onUpdateApplication={onUpdateApplication}
                        onDeleteApplication={onDeleteApplication}
                    />
                ))}
            </div>
        </div>
    );
}