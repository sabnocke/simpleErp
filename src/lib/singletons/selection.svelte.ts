import type {Order} from "$lib/customTypes";

export const WorkerSelection = $state({
    current: null as null | number,
    selected: new Set<number>(),
    known: new Map() as Map<number, Order>,
});

export const OrderSelection = $state({
    current: null as null | number,
    selected: new Set<number>(),
    index: new Map<number, string>
})