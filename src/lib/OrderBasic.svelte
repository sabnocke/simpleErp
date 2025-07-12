<script lang="ts">
    import Countdown from "$lib/Countdown.svelte";
    import {OrderSelection} from "$lib/singletons/selection.svelte.js";

    let {
        name = "DEFAULT",
        id,
        seconds = 0,
    } = $props();

    let isRunning = $state(false);
    const isActive = $derived(OrderSelection.current === id)

    function select() {
        if (OrderSelection.current === id) {
            isRunning = false;
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
    <Countdown seconds={seconds} dis={id} dayLength={8}/>
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