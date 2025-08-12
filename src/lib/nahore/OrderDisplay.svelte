<script lang="ts">


    import {getOrders} from "../database/loadOrders.js"
    import OrderOne from "$lib/nahore/OrderOne.svelte";
    import type {OrderReturnType, GenericStore} from "$lib/customTypes.js";
    import {Nullable} from "typescript-nullable";
    import Checkbox from "$lib/nahore/Checkbox.svelte";
    import FancyInput from "$lib/nahore/FancyInput.svelte";

    let OrderStore: GenericStore<OrderReturnType> = $state({loading: true, data: null, error: null});

    getOrders().then(data => {
        OrderStore = {loading: false, data: data, error: null};
    }).catch(error => {
        OrderStore = {loading: false, data: null, error: error};
    })

    const headerNames = [
        "name",
        "budget",
        "material",
        "overhead",
        "hours",
        "done"
    ]

</script>


<div class="order-holder">
    <!-- TODO maybe use grid? or place it all in two flex boxes? -->
    <!-- TODO use two flexes and first line is sticky -->

    {#if OrderStore.loading}
        <span> loading </span>
    {:else if OrderStore.error}
        <span> error </span>
    {:else if OrderStore.data !== null}
        <div class="header">
            <span>Name</span>
            <div class="collective-header">
                <span class="coll-head-item">Budget</span>
                <span class="coll-head-item">Material</span>
                <span class="coll-head-item">Overhead</span>
            </div>
            <span>Done</span>
        </div>

        <div class="one">
        <span>Name</span>
<!--        {#each OrderStore.data as {id, name, seconds}}-->
<!--            <span>{name}</span>-->
<!--        {/each}-->
        <FancyInput id="0" type="budget" label="" subclass="a" />
        <Checkbox />
        </div>
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
    top: 0;
    z-index: 10;
    padding: 0.5em;
    align-items: center;
    justify-content: space-between;
  }

  .one {
    width: calc(100% - 1.5em);
    height: 4em;
    background-color: #cccccc;
    display: flex;
    align-items: center;
    padding: 0.5em 1em 0.5em 0.5em;
    justify-content: space-between;
  }

  .collective-header {
    width: 50%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding: 5px 10px 5px 10px;
  }

  .coll-head-item {

    width: calc(100% / 3);

    &:nth-child(1) {
      display: block;
      order: 0;
    }

    &:nth-child(2) {
      display: block;
      order: 0;
    }

    &:nth-child(3) {
      display: block;
      order: 0;
    }
  }
</style>