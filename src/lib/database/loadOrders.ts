
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

