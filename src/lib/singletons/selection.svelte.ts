import type {Order} from "$lib/customTypes";

export const WorkerSelection = $state({
    current: null as null | number,
    selected: new Set<number>(),
    known: new Map() as Map<number, Order>,
});

export const KnownWorkers =
    $state(new Map<number, Order>());