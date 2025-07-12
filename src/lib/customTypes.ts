export type RegisterApi = {
    register(workerId: number, orderId: number): void,
    knownList: Map<number, {
        orderId: number,
        startAt: Date,
        endAt: Date,
    }>
}

export type KnownWorkersType = Map<number, Order>

export type OrderStore = {
    loading: boolean,
    data: OrderReturnType | null,
    error: Error | null
}

export type OrderReturnType = {
    id: number, name: string, seconds: number
}[];

export type WorkerReturnType = {name: string}[];

export class Order {
    public id: number
    public name: string
    public seconds: number

    constructor(id: number = -1, name: string = "None", seconds: number = -1) {
        this.id = id;
        this.name = name;
        this.seconds = seconds
    }
}
