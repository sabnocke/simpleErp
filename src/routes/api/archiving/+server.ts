import prisma from "$lib/server/prisma.ts"


export async function GET({ url }) {
  const done = url.searchParams.get("done") === "true";

  try {
    const get = await prisma.orders.findMany({
      where: {
        done: done
      }
    })

    return new Response(JSON.stringify(get, null, 2), {
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

export async function POST({ request }) {
  try {
    const {id, done} = await request.json();

    const updatedRow = await prisma.orders.update({
      where: {id},
      data: {done: done}
    })

    return new Response(JSON.stringify(updatedRow, null, 2), {
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