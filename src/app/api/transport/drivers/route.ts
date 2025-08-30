import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');

    if (!schoolId) {
      return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
    }

    const drivers = await prisma.driver.findMany({
      where: {
        schoolId: schoolId,
        isActive: true,
      },
      include: {
        buses: {
          include: {
            bus: {
              include: {
                routes: true,
              },
            },
          },
        },
        attendance: {
          where: {
            date: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
          orderBy: {
            date: 'desc',
          },
        },
        incidentReports: {
          where: {
            status: 'OPEN',
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      schoolId,
      employeeId,
      name,
      phone,
      email,
      licenseNumber,
      licenseExpiry,
      dateOfJoining,
      address,
      emergencyContact,
      salary,
    } = body;

    if (!schoolId || !employeeId || !name || !phone || !licenseNumber || !licenseExpiry || !dateOfJoining) {
      return NextResponse.json(
        { error: 'School ID, employee ID, name, phone, license number, license expiry, and joining date are required' },
        { status: 400 }
      );
    }

    const driver = await prisma.driver.create({
      data: {
        schoolId,
        employeeId,
        name,
        phone,
        email,
        licenseNumber,
        licenseExpiry: new Date(licenseExpiry),
        dateOfJoining: new Date(dateOfJoining),
        address,
        emergencyContact,
        salary: salary ? parseFloat(salary) : null,
      },
      include: {
        buses: {
          include: {
            bus: true,
          },
        },
      },
    });

    return NextResponse.json(driver, { status: 201 });
  } catch (error) {
    console.error('Error creating driver:', error);
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Employee ID or license number already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}