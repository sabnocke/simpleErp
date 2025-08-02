<script lang="ts">
    import {getOrders} from "../database/loadOrders.js"
    import OrderOne from "$lib/nahore/OrderOne.svelte";
    import type {OrderReturnType, GenericStore} from "$lib/customTypes.js";
    import { Nullable } from "typescript-nullable";

    let OrderStore: GenericStore<OrderReturnType> = $state({loading: true, data: null, error: null});

    getOrders().then(data => {
        OrderStore = {loading: false, data: data, error: null};
    }).catch(error => {
        OrderStore = {loading: false, data: null, error: error};
    })

</script>


<div class="order-holder">
    <!-- TODO maybe use grid? or place it all in two flex boxes? -->
    <div class="header">
        <span class="name" style="width: 20%">Name</span>
        <div class="input-group">
            <span class="overhead">Budget</span>
            <span class="overhead">Material</span>
            <span class="overhead">Overhead</span>
            <div class="spacing"></div>
            <span class="overhead">Hours</span>
        </div>
        <span>Done</span>
    </div>

    {#if OrderStore.loading}
        <span> loading </span>
    {:else if OrderStore.error}
        <span> error </span>
    {:else if OrderStore.data !== null}
        {#each OrderStore.data as {id, name, seconds}}
            <OrderOne name={name} />
        {/each}
    {/if}
</div>


<style lang="scss">
    .order-holder {
      position: relative;
      padding-top: 1em;
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: nowrap;
      gap: 0.5em;
      height: 100%;
      overflow-y: auto;
      min-width: 200px;
      flex: 1 0 500px;
    }

    .header {
      position: sticky;
      background-color: black;
      color: white;
      width: calc(100% - 1.5em);
      display: flex;
      flex: 1;
      top: 0;
      z-index: 10;
      padding: 0.5em;
      align-items: center;
      justify-content: space-evenly;
    }

    .fields {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .input-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      width: 70%;
      padding-right: 0.5em;
      margin-right: 0.5em;
    }

    .spacing {
      margin-left: 0.5em;
      margin-right: 0.5em;
    }

    .overhead {
      width: 15%;
      font-size: 18px;
      display: flex;
      justify-content: center;
      padding: 5px 25px 5px 20px;
    }

    .hours {
      padding-right: 0.5em;
    }
</style>