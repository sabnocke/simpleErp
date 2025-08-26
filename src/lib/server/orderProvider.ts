import prisma from "$lib/server/prisma.ts";
import type {IRow} from "$lib/customTypes.ts";
import {Prisma} from "@prisma/client";

export async function getAllOrders(seekArchived: boolean = false) {
  return prisma.orders.findMany({
    where: {done: seekArchived}
  });
}


export async function updateAliveStatus(id: number, done: boolean) {
  return prisma.orders.update({
    where: {id},
    data: {done}
  });
}

//TODO change name in schema: material_price -> material

export async function createOrder(order: IRow) {
  return prisma.orders.create({
    data: {
      name: order.name,
      budget: order.budget,
      material_price: order.material,
      overhead: order.overhead,
      startAt: order.startAt,
      endAt: order.endAt,
      done: order.done,
    }
  });
}

type OrderUpdateUnit = Partial<Prisma.OrdersUpdateInput>

export async function updateOrder(id: number, order: OrderUpdateUnit) {
  return prisma.orders.update({
    where: { id },
    data: order
  });
}