import prisma from "$lib/server/prisma.ts";
import type {IWorker} from "$lib/customTypes.ts";

export async function createWorker(worker: IWorker) {
  return prisma.employees.create({
    data: worker,
  });
}

export async function readWorker(id: number) {
  return prisma.employees.findFirst({
    where: { id },
  })
}

export async function readAllWorkers() {
  return prisma.employees.findMany();
}

export async function updateWorker(id: number, worker: IWorker) {
  return prisma.employees.update({
    where: { id },
    data: { name: worker.name }
  });
}

//TODO migrate new schema

// export async function setActiveWorkerStatus(id: number, active: boolean) {
//   return prisma.employees.update({
//     where: { id },
//     data: { active }
//   });
// }