import {Prisma} from "@prisma/client";

export type GenericStore<StoreType> = {
  loading: boolean,
  data: StoreType | null,
  error: Error | null,
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

// export enum Coding {
//   Create,
//   Read,
//   Update,
//   Delete,
// }

export interface IRow {
  name: string
  budget: number
  material: number
  overhead: number
  startAt: Date
  endAt: Date
  done: boolean
}

export interface IRecord {
  employeeId: number
  orderId: number
  startAt: Date
  endAt: Date
}

export interface IWorker {
  name: string
  active: boolean
}

export interface IDisplay {
  id: number
  name: string
  budget: number
  material: number
  overhead: number
  seconds: number
}

export type AllPosts = Prisma.OrdersGetPayload<{}>[]

export type Maybe<T> = T | null