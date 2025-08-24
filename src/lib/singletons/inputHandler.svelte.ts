import Fuse from "fuse.js";

export const fields = $state([
    {cName: "bud", label: "Budget"},
    {cName: "mat", label: "Material"},
    {cName: "ove", label: "Overhead"},
])
// //          name,   budget, material, overhead, hours, done, show
// type Row = [string, number, number, number, number, boolean, boolean]

interface Row {
    name: string
    budget: number
    material: number
    overhead: number
    done: boolean
    show: boolean
}

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
    public nameLookup: Map<string, number> = new Map<string, number>();
    public archiveLookup: Map<string, number> = new Map<string, number>();
    public query: string = $state("");
    public seekArchived = $state(false);

    public reset(): this {
        this.matrix = [];
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
            if (row.show && !row.done) {
                yield row;
            }
        }
    }

    public *getArchivedRows() {
        for (let row of this.matrix) {
            if (row.show && row.done) {
                yield row;
            }
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

    public moveByName(name: string) {
        const index = this.nameLookup.get(name) ?? NaN;
        const indexAlt = this.archiveLookup.get(name) ?? NaN;
        let item =  this.matrix.splice(index, this.#detectNaN(index))[0];
        let itemAlt = this.archive.splice(indexAlt, this.#detectNaN(indexAlt))[0];

        if (item) {
            this.archive.push(item);
            return item;
        } else if (itemAlt) {
            this.matrix.push(itemAlt);
            return itemAlt;
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
        let line = $state<Row>({name, budget, material, overhead, done, show});
        this.archive.push(line);
        this.archiveLookup.set(name, this.archive.indexOf(line));
    }

    public addLine(name: string, budget: number = 0, material: number = 0, overhead: number = 0, hours: number = 0.0, done: boolean = false, show: boolean = true) {
        let line = $state<Row>({name, budget, material, overhead, done, show});
        this.matrix.push(line);
        this.nameLookup.set(name, this.matrix.indexOf(line));
    }

    public seekName(name: string = "__default__"): number {
        const maybeLine = this.nameLookup.get(name);
        return maybeLine ? maybeLine : -1;
    }
    public seekNames(names: string[]): number[] {
        let result: number[] = [];
        for (const name of names) {
            result.push(this.seekName(name));
        }
        return result;
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