<script lang="ts">
    import {WorkerSelection} from "$lib/singletons/selection.svelte";
    import {onMount} from "svelte";
    import Countdown from "$lib/Countdown.svelte";
    import {Order} from "$lib/customTypes";

    let {id, name = "Unknown", order = "None", seconds = 0} = $props();
    let isRunning = $state(false);

    const isActive = $derived(WorkerSelection.current === id);

    function select() {
        if (WorkerSelection.current === id) {
            WorkerSelection.current = null;
            isRunning = false;
            return;
        }
        WorkerSelection.current = id;
        isRunning = true;
    }

    let val0 = $derived(WorkerSelection.known.get(id))

    onMount(() => {
        let newMap = new Map(WorkerSelection.known);
        newMap.set(id, new Order());
        WorkerSelection.known = newMap;
    })

    $effect(() => {
        console.log(`Hello from RadioButton ${id}`)
        if (val0) {
            console.log(`WorkerSelection derived: ${val0.name}`)
            order = val0.name
        }
    })

</script>

<button class:active={isActive} onclick={select} aria-label="RadioButton" class:chosen={WorkerSelection.selected.has(id)}>
    <span class="font-semibold text-black text-lg">
        {name}
    </span>
    <span class="font-medium text-black text-lg">
        {order}
    </span>
    <Countdown seconds={seconds} isTimerRunning={isRunning} dis={id}></Countdown>
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
</style>