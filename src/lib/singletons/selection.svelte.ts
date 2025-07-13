import type {Order} from "$lib/customTypes";

export const WorkerSelection = $state({
    current: null as null | number,
    selected: new Set<number>(),
    known: new Map() as Map<number, Order>,
    lenKnown: 0 as number,
});

export const OrderSelection = $state({
    current: null as null | number,
    selected: new Set<number>(),
    usage_index: new Map<number, number>
})

export const SyncIndex = $state(new Map<number, {count: number}>())

export function initializeSync(id: number, baseValue: number = -1) {
    if (!SyncIndex.has(id)) {
        const item = $state({count: baseValue})
        SyncIndex.set(id, item)
        return true
    }
    return false
}