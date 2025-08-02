<script lang="ts">
    import {WorkerSelection, SyncIndex} from "$lib/singletons/selection.svelte.js";
    import {Order} from "$lib/customTypes";

    let {id, name = "Unknown", order = "None"} = $props();

    let val0 = $derived(WorkerSelection.known.get(id))
    let sync = $derived(SyncIndex.get(val0?.id ?? -1)?.count ?? -1)

    const orderName = $derived(val0?.name ?? order)
    const isActive = $derived(WorkerSelection.current === id);
    const dayLength = 8     //TODO maybe prop?

    const dayLengthInSeconds = $derived(dayLength * 3600);
    const remainingDays = $derived(Math.floor(sync / dayLengthInSeconds));
    const remainingHours = $derived(String(Math.floor((sync % dayLengthInSeconds) / 3600)).padStart(2, '0'));
    const remainingMinutes = $derived(String(Math.floor((sync % 3600) / 60)).padStart(2, '0'));
    const remainingSeconds = $derived(String(sync % 60).padStart(2, '0'));

    function select() {
        if (WorkerSelection.current === id) {
            WorkerSelection.current = null;
            return;
        }
        WorkerSelection.current = id;
    }

    $effect(() => {
        if (!WorkerSelection.known.has(id)) {
            //TODO following section can be removed if the Order object is stateful, i.e. $state(new Order()) (probably)
            let newMap = new Map(WorkerSelection.known);
            newMap.set(id, new Order());
            WorkerSelection.known = newMap;
        }
    })
</script>


<button class:active={isActive} onclick={select} aria-label="RadioButton" class:chosen={WorkerSelection.selected.has(id)}>
    <span class="font-semibold text-black text-lg">
        {name}
    </span>
    <span class="font-medium text-black text-lg">
        {orderName}
    </span>
    <div class="countdown">
        {#if remainingDays > 0}
            <span>{remainingDays}</span>
        {/if}
        <span>
        {remainingHours}:{remainingMinutes}:{remainingSeconds}
        </span>
    </div>
</button>


<style lang="scss">
  button {
    padding: 5px 0;
    background-color: #880808;
    opacity: 0.8;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    width: calc(100% - 10px);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
    &.active {
      opacity: 1;   //TODO maybe lighten instead of opacity?
    }
    &.chosen {
      background-color: #0bda51;
    }
  }

  .countdown {
    font-family: monospace;
    font-size: 1.5rem;
    color: black;
    font-weight: 500;
  }
</style>