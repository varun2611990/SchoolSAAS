import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const routeId = searchParams.get('routeId');
    const studentId = searchParams.get('studentId');

    if (!schoolId) {
      return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
    }

    const whereClause: Record<string, unknown> = {
      student: {
        schoolId: schoolId,
      },
      isActive: true,
    };

    if (routeId) {
      whereClause.routeId = routeId;
    }

    if (studentId) {
      whereClause.studentId = studentId;
    }

    const assignments = await prisma.transportAssignment.findMany({
      where: whereClause,
      include: {
        student: {
          include: {
            workspaceUser: {
              include: {
                user: true,
              },
            },
            class: true,
            section: true,
          },
        },
        route: {
          include: {
            bus: true,
            stops: {
              orderBy: {
                sequence: 'asc',
              },
            },
          },
        },
        stop: true,
        pickupDropStatuses: {
          where: {
            date: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
            },
          },
          orderBy: {
            date: 'desc',
          },
        },
        transportFees: {
          where: {
            isActive: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(assignments);
  } catch (error) {
    console.error('Error fetching transport assignments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      studentId,
      routeId,
      stopId,
      boardingPoint,
      feeAmount,
    } = body;

    if (!studentId || !routeId) {
      return NextResponse.json(
        { error: 'Student ID and route ID are required' },
        { status: 400 }
      );
    }

    const assignment = await prisma.transportAssignment.create({
      data: {
        studentId,
        routeId,
        stopId,
        boardingPoint,
        feeAmount: feeAmount ? parseFloat(feeAmount) : null,
      },
      include: {
        student: {
          include: {
            workspaceUser: {
              include: {
                user: true,
              },
            },
            class: true,
            section: true,
          },
        },
        route: {
          include: {
            bus: true,
            stops: {
              orderBy: {
                sequence: 'asc',
              },
            },
          },
        },
        stop: true,
      },
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error('Error creating transport assignment:', error);
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Student is already assigned to this route' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}