
//TODO Change the name of this function
export async function getOrders() {
    console.log('Fetching layout from database...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
        {
            id: 0,
            name: "something",
            seconds: 1234,
        },
        {
            id: 1,
            name: "something different",
            seconds: 73215,
        }
    ];
}

