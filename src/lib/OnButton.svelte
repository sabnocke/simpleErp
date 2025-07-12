<script lang="ts">
    import {getContext} from "svelte";
    import type {Writable} from "svelte/store";
    import {type OrderStore, Order} from "$lib/customTypes";
    import {WorkerSelection, OrderSelection} from "$lib/singletons/selection.svelte.js";

    let isWaiting = $state(false);
    let OrderStore = getContext<Writable<OrderStore>>("orders");

    function armCoordinator() {
        if (!isWaiting) {
            console.log("Coordinator armed")
            isWaiting = true;
        } else {
            console.log("Coordinator disarmed")
            isWaiting = false;
        }

    }

    $effect(() => {
        // console.log(`Worker: ${WorkerSelection.current}, Order: ${OrderSelection.current}`);
        if (isWaiting && $OrderStore.data && WorkerSelection.current !== null && OrderSelection.current !== null) {
            // console.log($knownWorkers);

            let items = $OrderStore.data.filter(item => item.id === OrderSelection.current)

            if (items.length === 0)
                return;

            let {id, name, seconds} = items[0];
            let newMap = new Map(WorkerSelection.known);
            newMap.set(WorkerSelection.current, new Order(id, name, seconds))
            WorkerSelection.known = newMap;

            // console.log(WorkerSelection.known)
            // console.log(`Success: worker id: ${WorkerSelection.current} paired with order: ${name}`);
            WorkerSelection.selected.add(WorkerSelection.current);
            OrderSelection.selected.add(WorkerSelection.current);
            isWaiting = false;
            WorkerSelection.current = null;
            OrderSelection.current = null;
        }
    })
</script>


<button class="py-4 px-8" onclick={armCoordinator} class:chosen={isWaiting}>
    on
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