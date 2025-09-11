import type {AllPosts, IRow, Maybe} from "$lib/customTypes.ts";
// import dayjs from "dayjs";


export async function getOrders() {
  console.log('Fetching layout from database...');
  await new Promise(resolve => setTimeout(resolve, 1000));

  return [
    {
      id: 0,
      name: "something",
      seconds: 1234,
      budget: 10000,
      material: 5000,
      overhead: 0,
    },
    {
      id: 1,
      name: "something different",
      seconds: 73215,
      budget: 0,
      material: 0,
      overhead: 0,
    },
    {
      id: 2,
      name: "something different",
      seconds: 1234,
      budget: 0,
      material: 0,
      overhead: 0,
    },
    {
      id: 3,
      name: "test",
      seconds: 1234,
      budget: 0,
      material: 0,
      overhead: 0,
    },
    {
      id: 0,
      name: "something",
      seconds: 1234,
      budget: 10000,
      material: 5000,
      overhead: 0,
    },
    {
      id: 1,
      name: "something different",
      seconds: 73215,
    },
    {
      id: 2,
      name: "something different",
      seconds: 1234,
    },
    {
      id: 3,
      name: "test",
      seconds: 1234,
    },
    {
      id: 0,
      name: "something",
      seconds: 1234,
    },
    {
      id: 1,
      name: "something different",
      seconds: 73215,
    },
    {
      id: 2,
      name: "something different",
      seconds: 1234,
    },
    {
      id: 3,
      name: "test",
      seconds: 1234,
    },
    {
      id: 0,
      name: "something",
      seconds: 1234,
    },
    {
      id: 1,
      name: "something different",
      seconds: 73215,
    },
    {
      id: 2,
      name: "something different",
      seconds: 1234,
    },
    {
      id: 3,
      name: "test",
      seconds: 1234,
    },
    {
      id: 0,
      name: "something",
      seconds: 1234,
    },
    {
      id: 1,
      name: "something different",
      seconds: 73215,
    },
    {
      id: 2,
      name: "something different",
      seconds: 1234,
    },
    {
      id: 3,
      name: "test",
      seconds: 1234,
    },
  ];
}

export async function generateRandomEntries(numEntries = 10) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const entries = [];
  const minSeconds = 1000;
  const maxSeconds = 10000;
  const minBudget = 5000;
  const maxBudget = 50000;
  const minMaterial = 1000;
  const maxMaterial = 10000;
  const minOverhead = 0;
  const maxOverhead = 5000;

  for (let i = 0; i < numEntries; i++) {
    const randomEntry = {
      id: i,
      name: `Entry ${i + 1}`,
      seconds: Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds,
      budget: Math.floor(Math.random() * (maxBudget - minBudget + 1)) + minBudget,
      material: Math.floor(Math.random() * (maxMaterial - minMaterial + 1)) + minMaterial,
      overhead: Math.floor(Math.random() * (maxOverhead - minOverhead + 1)) + minOverhead,
    };
    entries.push(randomEntry);
  }

  return entries;
}

export async function fetchOrders(archived: boolean = false): Promise<Maybe<AllPosts>> {
  const params = new URLSearchParams();

  if (archived) {
    params.set("show", `${archived}`);
  }

  const url = `/api/orders?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json() as AllPosts;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}

export async function createOrder(name: string, budget: number, material: number, overhead: number) {
  let row: IRow = {
    name: name,
    budget: budget,
    material: material,
    overhead: overhead,
    startAt: new Date(),
    endAt: new Date(),  //TODO calculate end date
    done: false,
  }

  try {
    console.log(`Creating order ${name}`);
    const response = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(row)
    })

    console.log("Response", response)
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to create order. Server returned:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Failed to create order due to network error:", error);
  }

  return null;
}