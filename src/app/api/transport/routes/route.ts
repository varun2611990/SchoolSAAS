import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');

    if (!schoolId) {
      return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
    }

    const routes = await prisma.route.findMany({
      where: {
        bus: {
          schoolId: schoolId,
        },
        isActive: true,
      },
      include: {
        bus: {
          include: {
            drivers: {
              include: {
                driver: true,
              },
            },
          },
        },
        stops: {
          orderBy: {
            sequence: 'asc',
          },
        },
        transportAssignments: {
          include: {
            student: {
              include: {
                workspaceUser: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      busId,
      name,
      description,
      startTime,
      endTime,
      distance,
      estimatedDuration,
      stops,
    } = body;

    if (!busId || !name || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'Bus ID, route name, start time, and end time are required' },
        { status: 400 }
      );
    }

    // Create route with stops in a transaction
    const route = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const createdRoute = await tx.route.create({
        data: {
          busId,
          name,
          description,
          startTime,
          endTime,
          distance: distance ? parseFloat(distance) : null,
          estimatedDuration: estimatedDuration ? parseInt(estimatedDuration) : null,
        },
      });

      if (stops && stops.length > 0) {
        await tx.stop.createMany({
          data: stops.map((stop: { name: string; address: string; latitude?: string; longitude?: string; arrivalTime: string }, index: number) => ({
            routeId: createdRoute.id,
            name: stop.name,
            address: stop.address,
            latitude: stop.latitude ? parseFloat(stop.latitude) : null,
            longitude: stop.longitude ? parseFloat(stop.longitude) : null,
            arrivalTime: stop.arrivalTime,
            sequence: index + 1,
          })),
        });
      }

      return await tx.route.findUnique({
        where: { id: createdRoute.id },
        include: {
          bus: true,
          stops: {
            orderBy: {
              sequence: 'asc',
            },
          },
        },
      });
    });

    return NextResponse.json(route, { status: 201 });
  } catch (error) {
    console.error('Error creating route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}