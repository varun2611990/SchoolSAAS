import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');

    if (!schoolId) {
      return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
    }

    const buses = await prisma.bus.findMany({
      where: {
        schoolId: schoolId,
        isActive: true,
      },
      include: {
        routes: {
          include: {
            stops: true,
          },
        },
        drivers: {
          include: {
            driver: true,
          },
        },
        maintenanceLogs: {
          orderBy: {
            serviceDate: 'desc',
          },
          take: 5,
        },
      },
      orderBy: {
        number: 'asc',
      },
    });

    return NextResponse.json(buses);
  } catch (error) {
    console.error('Error fetching buses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      schoolId,
      number,
      registrationNumber,
      model,
      capacity,
      manufacturingYear,
      fuelType,
      insuranceExpiry,
      fitnessExpiry,
    } = body;

    if (!schoolId || !number || !registrationNumber || !capacity) {
      return NextResponse.json(
        { error: 'School ID, bus number, registration number, and capacity are required' },
        { status: 400 }
      );
    }

    const bus = await prisma.bus.create({
      data: {
        schoolId,
        number,
        registrationNumber,
        model,
        capacity: parseInt(capacity),
        manufacturingYear: manufacturingYear ? parseInt(manufacturingYear) : null,
        fuelType,
        insuranceExpiry: insuranceExpiry ? new Date(insuranceExpiry) : null,
        fitnessExpiry: fitnessExpiry ? new Date(fitnessExpiry) : null,
      },
      include: {
        routes: true,
        drivers: {
          include: {
            driver: true,
          },
        },
      },
    });

    return NextResponse.json(bus, { status: 201 });
  } catch (error) {
    console.error('Error creating bus:', error);
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Bus number or registration number already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}