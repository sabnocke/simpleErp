<script lang="ts">
    import Countdown from "$lib/dole/Countdown.svelte";
    import {OrderSelection, WorkerSelection} from "$lib/singletons/selection.svelte.js";

    let {
        name = "DEFAULT",
        id,
        seconds = 0,
    } = $props();

    const isActive = $derived(OrderSelection.current === id)

    const bandwidth = $derived(
        [...WorkerSelection.known.values().filter(item => item.id === id)].length
    )

    let isRunning = $derived(bandwidth > 0);

    function select() {
        if (OrderSelection.current === id) {
            OrderSelection.current = null;
            return;
        }
        OrderSelection.current = id;
    }
</script>


<button class:active={isActive} onclick={select} aria-label="One of orders" class="order-basic" >
    <span class="text-lg font-semibold text-black">
        {name}
    </span>
    <Countdown initialSeconds={seconds} dis={id} dayLength={8} usage={bandwidth} isTimerRunning={isRunning}/>
</button>


<style lang="scss">
    @use "sass:color";
    .order-basic {
      background-color: #C0C0C0;
      width: calc(100% - 20px);
      height: 60px;
      margin-top: 10px;
      border-radius: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      &.active {
        background-color: color.adjust(#C0C0C0, $lightness: 40%);
      }
    }
</style>