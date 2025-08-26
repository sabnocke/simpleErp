
//TODO Change the name of this function
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