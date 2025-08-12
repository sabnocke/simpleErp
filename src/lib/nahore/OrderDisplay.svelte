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
        {#each headerNames as headerName}
            {#if headerName === "name"}
                {#each OrderStore.data as {id, name, seconds}}


                    <div class="row-display one">
                        <span class="name">{name}</span>
                        <FancyInput type="0"/>
                        <Checkbox/>
                    </div>
                {/each}
            {/if}
        {/each}
    {/if}



<!--    <div class="row-display header">-->

<!--        <div class="input-group">-->
<!--            <span>Budget</span>-->
<!--            <span>Material</span>-->
<!--            <span>Overhead</span>-->
<!--            <div class="spacing"></div>-->
<!--            <span>Hours</span>-->
<!--        </div>-->
<!--        <span>Done</span>-->
<!--    </div>-->


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

  .row-display {
    position: relative;
    display: flex;
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

  .one {
    width: calc(100% - 1.5em);
    height: 4em;
    background-color: #cccccc;
    display: flex;
    align-items: center;
    padding: 0.5em 0.5em 0.5em 0.5em;
    justify-content: space-around;
  }

  .name {
    width: 20%;
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