<script lang="ts">
    import {getContext} from "svelte";
    import type {Writable} from "svelte/store";
    import OrderBasic from "$lib/OrderBasic.svelte";
    import type {OrderStore} from "$lib/customTypes";
    import Loading from "$lib/Loading.svelte";

    const orderData = getContext<Writable<OrderStore>>("orders");
</script>


<div class="order-display">
    {#if $orderData.loading}
        <Loading text="Loading orders..." />
    {:else if $orderData.error}
        <p>error</p>
    {:else if $orderData.data}
        {#each $orderData.data as {id, name, seconds}}
            <OrderBasic id={id} name={name} seconds={seconds}/>
        {/each}
    {/if}
</div>


<style lang="scss">
    .order-display {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
</style>