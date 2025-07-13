import {Nullable} from "typescript-nullable";

/*export type RegisterApi = {
    register(workerId: number, orderId: number): void,
    knownList: Map<number, {
        orderId: number,
        startAt: Date,
        endAt: Date,
    }>
}*/

export type GenericStore<StoreType> = {
    loading: boolean,
    data: Nullable<StoreType>,
    error: Nullable<Error>,
}

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

/*
export class Time {
    public days: number;
    public hours: number;
    public minutes: number;
    public seconds: number;
    private _dayLength: number;

    public get dayLength(): number {
        return this._dayLength;
    }

    public set dayLength(value: number) {
        const base = this.toSeconds();
        this._dayLength = value;
        const secondsFromDay = 3600 * this._dayLength;
        this.days = Math.floor(base / secondsFromDay);
        this.hours = Math.floor((base % secondsFromDay) / 3600);
        this.minutes = Math.floor((base % 3600) / 60);
        this.seconds = base % 60;
    }

    constructor(public d: number = 0, public h: number = 0, public m: number = 0, public s: number = 0) {
        this.days = d;
        this.hours = h;
        this.minutes = m;
        this.seconds = s;
        this._dayLength = 24;
    }

    public static fromMilliseconds(milliseconds: number): Time {
        let seconds = Math.floor(milliseconds / 1000);
        return Time.fromSecondsToTime(seconds);
    }

    public static datesToTime(start: Date, end: Date): Time {
        const d = end.getTime() - start.getTime();
        return Time.fromMilliseconds(d);
    }

    toSeconds(): number {
        return this.days * 86400 + this.hours * 3600 + this.minutes * 60 + this.seconds;
    }

    public static fromSecondsToTime(totalSeconds: number) {
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor((totalSeconds % 86400) / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        return new Time(days, hours, minutes, seconds);
    }
}*/
