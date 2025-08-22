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
    public matrix: Row[] = $state([])
    public nameLookup: Map<string, number> = new Map<string, number>();
    public query: string = $state("")

    public reset(): this {
        this.matrix = [];
        return this;
    }

    constructor() {
        this.reset()
    }

    public addLine(name: string, budget: number = 0, material: number = 0, overhead: number = 0, hours: number = 0.0, done: boolean = false, show: boolean = true) {
        let line = $state<Row>({name, budget, material, overhead, done, show});
        this.matrix.push(line);
        this.nameLookup.set(name, this.rowCount);
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

    public updateVisibility(idx: number, newValue: boolean = false): Row {
        this.matrix[idx].show = newValue;
        return this.matrix[idx];
    }
    public updateVisibilities(idxs: number[], newValue: boolean = false) {
        for (const idx in idxs) {
            this.matrix[idx].show = newValue;
        }
        return this;
    }
    public resetVisibility() {
        for (let line of this.matrix) {
            line.show = true;
        }
    }

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