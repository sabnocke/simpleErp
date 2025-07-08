<script lang="ts">
    import {selectedId} from "$lib/selectionStore";
    import {selectionState} from "$lib/selectionState.svelte";
    import Countdown from "$lib/Countdown.svelte";

    let {id} = $props();
    let isRunning = $state(false);

    const isActive = $derived($selectedId === id);

    function select() {
        if ($selectedId === id) {
            selectedId.set(null);
            selectionState.current = 0; // maybe null is better?
            isRunning = false;
            return;
        }
        selectedId.set(id);
        selectionState.current = id;
        isRunning = true;
    }
</script>

<button class:active={isActive} onclick={select} aria-label="RadioButton" class:chosen={selectionState.selected.includes(id)}>
    <span class="font-semibold text-black text-lg">
        Jmeno Prijmeni
    </span>
    <span class="font-medium text-black text-lg">
        Nazev zakazky
    </span>
    <Countdown days={0} hours={0} minutes={0} seconds={10} isTimerRunning={isRunning} dis={id}></Countdown>
</button>


<style lang="scss">
  button {
    padding: 5px 0;
    //border: 2px solid #ccc;
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
      //background-color: #007bff;
      //color: white;
      //border-color: #007bff;
      opacity: 1;
    }
    &.chosen {
      background-color: #0bda51;
    }
  }
</style>