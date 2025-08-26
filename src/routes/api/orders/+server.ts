import prisma from "$lib/server/prisma.ts";
import type {IRow} from "$lib/customTypes.ts";

export async function GET({url}) {
  try {
    let orders = await prisma.orders.findMany({
      where: {done: false}
    });

    return new Response(JSON.stringify(orders, null, 2), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify(error, null, 2), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

export async function POST({request}) {
  try {
    let row: IRow = await request.json();
    let out = await prisma.orders.create({
      data: {
        name: row.name,
        budget: row.budget,
        material_price: row.material,
        overhead: row.overhead,
        startAt: row.startAt,
        endAt: row.endAt,
        done: row.done,
      }
    })

    return new Response(JSON.stringify(out, null, 2), {
      status: 201,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify(error, null, 2), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}