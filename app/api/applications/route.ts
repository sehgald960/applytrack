import { NextRequest, NextResponse } from 'next/server';
import { readApplications, writeApplications } from '@/lib/db';
import { Application, ApplicationStatus } from '@/features/applications/types';

export async function GET() {
    const applications = readApplications();
    return NextResponse.json(applications);
}

export async function POST(req: NextRequest) {
    const body = (await req.json()) as Partial<Application>;

    const applications = readApplications();

    const newApp: Application = {
        id: crypto.randomUUID(),
        company: body.company ?? 'Unknown',
        role: body.role ?? 'Unknown',
        location: body.location,
        jobUrl: body.jobUrl,
        dateApplied: body.dateApplied ?? new Date().toISOString().slice(0, 10),
        status: (body.status as ApplicationStatus) ?? 'APPLIED',
        notes: body.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    applications.push(newApp);
    writeApplications(applications);

    return NextResponse.json(newApp, { status: 201 });
}