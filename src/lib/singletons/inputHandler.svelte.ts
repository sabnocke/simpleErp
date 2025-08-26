import Fuse from "fuse.js";


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

interface Row {
  name: string
  budget: number
  material: number
  overhead: number
  done: boolean
  show: boolean
  hash: number
}

const ARCHIVE = 0;
const LIVE = 1;

export const NAME = 0;
export const BUDGET = 1;
export const MATERIAL = 2;
export const OVERHEAD = 3;
export const HOURS = 4;
export const DONE = 5;
export const SHOW = 6;

class FullMatrix {
  public rowCount: number = 0;
  public matrix: Row[] = $state([]);
  public archive: Row[] = $state([]);
  private default: Row = {name: "NAME", budget: -1, material:  -1, overhead: -1, done: false, show: false, hash: 5138}
  public nameLookup: Map<string, Row> = new Map();
  public archiveLookup: Map<string, number> = new Map();
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

  public *getActiveRows() {
    for (let row of this.matrix) {
      yield row;
    }
  }

  public *getArchivedRows() {
    for (let row of this.archive) {
      yield row;
    }
  }

  public moveById(id: number) {
    let item = this.matrix.splice(id, 1)[0];
    let itemAlt = this.archive.splice(id, 1)[0];

    if (item) {
      this.archive.push(item);
      return item;
    } else if (itemAlt) {
      this.matrix.push(itemAlt);
      return itemAlt;
    }
  }

  #detectNaN(n: number): number {
    return Number.isNaN(n) ? 0 : 1;
  }

  #djb2Hash(input: string): number {
    let hash = 5381;
    for (let i = 0; i < input.length; i++) {
      hash = (hash * 33) ^ input.charCodeAt(i);
    }
    return hash >>> 0;
  }

  public getByHash(hash: number) {
    return this.matrix.find(item => item.hash === hash);
  }

  public moveByHash(hash: number) {
    const item = this.matrix.find(row => row.hash === hash);

    if (item) {
      item.done = !item.done;
    }

    // const altItem = this.archive.find(row => row.hash === hash);
    //
    // if (altItem) {
    //   this.archive.splice(this.matrix.indexOf(altItem), 1);
    //   this.matrix.push(altItem);
    //   console.log(altItem)
    //   return altItem;
    // }
  }

  public moveByName(name: string) {
    let item = this.nameLookup.get(name);

    if (item) {
      item.done = !item.done;
    }
  }

  #addArchiveLine(row: Row) {
    let line = $state<Row>(row);
    this.archive.push(line);
    this.archiveLookup.set(line.name, this.archive.indexOf(line));
  }

  public addArchiveLine(name: string,
                        budget: number = 0,
                        material: number = 0,
                        overhead: number = 0,
                        hours: number = 0.0,
                        done: boolean = false,
                        show: boolean = true) {
    const hash = this.#djb2Hash(name);
    let line = $state<Row>({name, budget, material, overhead, done, show, hash});
    this.archive.push(line);
    this.archiveLookup.set(name, this.archive.indexOf(line));
  }

  public addLine(name: string, budget: number = 0, material: number = 0, overhead: number = 0, hours: number = 0.0, done: boolean = false, show: boolean = true) {
    const hash = this.#djb2Hash(name);
    let line = $state<Row>({name, budget, material, overhead, done, show, hash});
    this.matrix.push(line);
    this.nameLookup.set(name, line);
  }

  public seekByName(name: string = "__default__") {
    return this.nameLookup.get(name);
  }


  // public updateVisibility(idx: number, newValue: boolean = false): Row {
  //     this.matrix[idx].show = newValue;
  //     return this.matrix[idx];
  // }
  // public updateVisibilities(idxs: number[], newValue: boolean = false) {
  //     for (const idx in idxs) {
  //         this.matrix[idx].show = newValue;
  //     }
  //     return this;
  // }
  // public resetVisibility() {
  //     for (let line of this.matrix) {
  //         line.show = true;
  //     }
  // }
  //
  // private containsWeekend(from: Date, to: Date): boolean {
  //
  // }

  public distributeOverDays(ignoreWeekends: boolean = true, ignoreVisibility: boolean = false, dayLength: number = 8) {}

  public fuzzySearch() {
    if (!this.query) {
      this.matrix.forEach((row: Row) => row.show = true)
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

    this.matrix.forEach((row: Row) => {
      row.show = matchingNames.has(row.name);
    });

    $inspect(this.matrix);
  }
}

export const fullMatrix: FullMatrix = $state(new FullMatrix());