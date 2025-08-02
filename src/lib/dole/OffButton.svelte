<script lang="ts">
    import {WorkerSelection, OrderSelection} from "$lib/singletons/selection.svelte.js";
    import {getContext} from "svelte";
    import type {Writable} from "svelte/store";
    import {Order, type GenericStore, type OrderReturnType} from "$lib/customTypes.js";

    let isWaiting = $state(false);
    let OrderStore = getContext<Writable<GenericStore<OrderReturnType>>>("orders");

    function armCoordinator() {
        isWaiting = !isWaiting;
    }

    $effect(() => {
        if (isWaiting && $OrderStore.data && WorkerSelection.current != null) {
            let newMap = new Map(WorkerSelection.known);
            newMap.set(WorkerSelection.current, new Order());
            WorkerSelection.known = newMap;

            WorkerSelection.selected.delete(WorkerSelection.current);
            OrderSelection.selected.delete(WorkerSelection.current);

            WorkerSelection.current = null;
            OrderSelection.current = null;

            isWaiting = false;
        }
    })

</script>

<button class="py-4 px-8" onclick={() => isWaiting = !isWaiting} class:chosen={isWaiting}>
    off
</button>

<style lang="scss">
  button {
    background-color: transparent;
    font-weight: 600;
    color: oklch(48.8% 0.243 264.376);
    border-radius: 0.25rem;
    border-color: oklch(62.3% 0.214 259.815);
    border-width: 1px;

    &:hover {
      background-color: oklch(62.3% 0.214 259.815);
      color: white;
      border-color: transparent;
    }

    &.chosen {
      border-color: transparent;
      background-color: oklch(62.3% 0.214 259.815);
      color: white;
    }
  }
</style>