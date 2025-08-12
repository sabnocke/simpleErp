export const fields = $state([
    {cName: "bud", label: "Budget"},
    {cName: "mat", label: "Material"},
    {cName: "ove", label: "Overhead"},
])

export interface IFieldItem {
    budget: number
    material: number
    overhead: number
}

export class FieldItem {
    public budget: number = -1
    public material: number = -1
    public overhead: number = -1
    public rate: number = 100

    constructor(budget: number | null, material: number | null, overhead: number | null) {
        this.budget = budget ?? -1
        this.material = material ?? -1
        this.overhead = overhead ?? -1
    }

    public update(budget: number | null, material: number | null, overhead: number | null) {
        this.budget = budget === null ? -1 : budget
        this.material = material === null ? -1 : material
        this.overhead = overhead === null ? -1 : overhead
        return this
    }


    public count(useUniqueRate: boolean = true): number {
        return (this.budget + this.overhead + this.material) / this.rate;
    }
}

export class FieldStorage {
    private _fields: {[subclass: string]: FieldItem} = {};
    private _nil: FieldItem = new FieldItem(null, null, null);
    private _last: boolean = true;

    public get lastActionSuccess() {return this._last}

    constructor() {}

    public reset(method: any, _ctx: any) {
        function replaceMethod(this: any, ...args: any[]) {
            this._last = true;
        }

        return replaceMethod
    }

    public get(subclass: string): FieldItem {
        if (subclass in this._fields) {
            return this._fields[subclass];
        }
        return this._nil;
    }

    public set(subclass: string, budget: number | null, material: number | null, overhead: number | null): this {
        this._fields[subclass] = new FieldItem(budget, material, overhead);
        return this;
    }

    public update(subclass: string, budget: number | null, material: number | null, overhead: number | null): this {
        this._last = true;

        if (subclass !in this._fields) {
            this._last = false;
            return this;
        }

        let field = this._fields[subclass];
        this._fields[subclass].budget = budget ?? field.budget;
        this._fields[subclass].material = material ?? field.material;
        this._fields[subclass].overhead = overhead ?? field.overhead;

        return this;

    }
}

export const fieldStorage: Map<string, FieldItem> = $state(new Map<string, FieldItem>())