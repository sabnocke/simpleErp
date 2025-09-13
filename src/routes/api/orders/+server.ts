import prisma from "$lib/server/prisma.ts";
import type {IRow, AllOrders} from "$lib/customTypes.ts";
import {getAllOrders} from "$lib/server/orderProvider.ts";

export async function GET({url}) {
  try {
    const show = url.searchParams.get("show") === "true";

    let orders: AllOrders = await getAllOrders(show);

    return new Response(JSON.stringify(orders, null, 2), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: "Failed to fetch orders from the database." }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function POST({request}) {
  console.log("POST", request);

  try {
    let row: IRow = await request.json();

    console.log(row);

    let out = await prisma.orders.create({
      data: {
        name: row.name,
        budget: row.budget,
        material: row.material,
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