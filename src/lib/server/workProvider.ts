import prisma from "$lib/server/prisma.ts";
import type {IRecord} from "$lib/customTypes.ts";

export async function createRecord(record: IRecord): Promise<IRecord> {
  return prisma.work.create({
    data: {
      order: {
        connect: {id: record.orderId}
      },
      employee: {
        connect: {id: record.employeeId}
      },
      startAt: record.startAt,
      endAt: record.endAt,
    }
  })
}

export async function readRecordByWorker(worker: number) {
  return prisma.work.findMany({
    where: { employeeId: worker }
  })
}

export async function readRecordByOrder(order: number) {
  return prisma.work.findMany({
    where: { orderId: order }
  })
}

//TODO maybe add looking up work based on datetime? or some generic format?

/**
 * Updates endAt of record
 * @param record Source of information for update, only employeeId, orderId and endAt are important as they are used.
 */
export async function updateRecordDatetime(record: IRecord) {
  return prisma.work.update({
    where: {
      employeeId_orderId: {
        employeeId: record.employeeId,
        orderId: record.orderId
      }
    },
    data: {
      endAt: record.endAt
    }
  })
}