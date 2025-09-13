import Fuse from "fuse.js";
import type {AllOrders, OneOrder} from "$lib/customTypes.ts";
import {Temporal} from "temporal-polyfill";
import {dateToTemporal} from "$lib/utils.ts";
import {Decimal} from "decimal.js";


export const fields = $state([
  {cName: "bud", label: "Budget"},
  {cName: "mat", label: "Material"},
  {cName: "ove", label: "Overhead"},
])
// //          name,   budget, material, overhead, hours, done, show
// type Row = [string, number, number, number, number, boolean, boolean]

export enum Types {
  Budget,
  Material,
  Overhead,
  Hours
}

//DEPRECATED
interface Row {
  name: string;
  budget: number;
  material: number;
  overhead: number;
  startAt: Temporal.ZonedDateTime | null;
  endAt: Temporal.ZonedDateTime | null;
  done: boolean;
  show: boolean;
  hash: number;
}

interface Row2 {
  name: string;
  budget: Decimal;
  material: Decimal;
  overhead: Decimal;
  startAt: Temporal.ZonedDateTime;
  endAt: Temporal.ZonedDateTime;
  done: boolean;
  show: boolean;
  hash: number;
}

interface Result {
  success: boolean;
  response: string;
}

// const ARCHIVE = 0;
// const LIVE = 1;

// export const NAME = 0;
// export const BUDGET = 1;
// export const MATERIAL = 2;
// export const OVERHEAD = 3;
// export const HOURS = 4;
// export const DONE = 5;
// export const SHOW = 6;

class FullMatrix {
  // public rowCount: number = 0;
  public matrix: (Row | Row2)[] = $state([]);
  public archive: Row[] = $state([]);
  // private default: Row = {name: "NAME", budget: -1, material:  -1, overhead: -1, done: false, show: false, hash: 5138}
  public nameLookup: Map<string, Row | Row2> = new Map();
  // public archiveLookup: Map<string, number> = new Map();
  public nameUniqueLookup: Set<string> = new Set();
  public query: string = $state("");
  public seekArchived = $state(false);

  public reset(): this {
    this.matrix = [];
    this.archive = [];
    return this;
  }

  constructor() {
    this.reset();
  }

  public selector(done: boolean, show: boolean) {
    if (this.seekArchived) {
      return done && show;
    }
    return !done && show;
  }

  // public moveById(id: number) {
  //   let item = this.matrix.splice(id, 1)[0];
  //   let itemAlt = this.archive.splice(id, 1)[0];
  //
  //   if (item) {
  //     this.archive.push(item);
  //     return item;
  //   } else if (itemAlt) {
  //     this.matrix.push(itemAlt);
  //     return itemAlt;
  //   }
  // }

  // #detectNaN(n: number): number {
  //   return Number.isNaN(n) ? 0 : 1;
  // }


  private djb2Hash(input: string): number {
    let hash = 5381;
    for (let i = 0; i < input.length; i++) {
      hash = (hash * 33) ^ input.charCodeAt(i);
    }
    return hash >>> 0;
  }

  // public getByHash(hash: number) {
  //   return this.matrix.find(item => item.hash === hash);
  // }

  public moveByHash(hash: number) {
    const item = this.matrix.find(row => row.hash === hash);

    if (item) {
      item.done = !item.done;
    }

  }

  public addLineFromAllPosts(item: OneOrder): Result {
    if (this.nameUniqueLookup.has(item.name)) {
      return {
        success: false,
        response: `Name collision on key: ${item.name}`
      }
    }

    const {name, budget, material, overhead, done, startAt, endAt} = item;

    const hash = this.djb2Hash(item.name);
    const line = $state<Row2>({
      name: name,
      budget: budget,
      material: material,
      overhead,
      startAt: dateToTemporal(startAt),
      endAt: dateToTemporal(endAt),
      done,
      show: true,
      hash
    });

    this.matrix.push(line);
    this.nameUniqueLookup.add(name);
    this.nameLookup.set(name, line);

    return {
      success: true,
      response: "",
    };
  }

  // TODO change hours to seconds (or delta, if that is more expressive)
  // a bit outdated
  public addLine(name: string, budget: number = 0, material: number = 0, overhead: number = 0, hours: number = 0.0, done: boolean = false, show: boolean = true) {
    if (this.nameUniqueLookup.has(name)) {
      return [false, `Name collision on key: ${name}`];
    }

    const hash = this.djb2Hash(name);
    let line = $state<Row>({
      name,
      budget,
      material,
      overhead,
      startAt: null,
      endAt: null,
      done,
      show,
      hash
    });
    this.matrix.push(line);
    this.nameLookup.set(name, line);
    this.nameUniqueLookup.add(name);

    return [true, ""];
  }

  // public seekByName(name: string = "__default__") {
  //   return this.nameLookup.get(name);
  // }

  // TODO finish end date calculation
  public distributeOverDays(ignoreWeekends: boolean = true, ignoreVisibility: boolean = false, dayLength: number = 8) {}


  // TODO improve searching
  public fuzzySearch() {
    if (!this.query) {
      this.matrix.forEach((row: Row | Row2) => row.show = true)
      return;
    }

    const fuse = new Fuse(this.matrix, {
      keys: ["name"],
      includeScore: true,
      threshold: 0.3,
      distance: 50
    });

    const results = fuse.search(this.query);

    const matchingNames = new Set(results.map(result => result.item.name))
    matchingNames.forEach((name: string) => {
      console.log(name)
      return name;
    })

    this.matrix.forEach((row: Row | Row2) => {
      row.show = matchingNames.has(row.name);
    });

    $inspect(this.matrix);
  }
}

export const fullMatrix: FullMatrix = $state(new FullMatrix());