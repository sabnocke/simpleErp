export async function getFullLayout() {
    console.log('Fetching layout from database...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
        {
            name: "something",
            startAt: new Date(),
            endAt: new Date(2025, 7, 10)
        },
    ];
}