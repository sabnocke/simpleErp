<script lang="ts">
  //@ts-nocheck
  import {getOrders} from "../database/loadOrders.js"
  import {type OrderReturnType, type GenericStore} from "$lib/customTypes.js";
  import Checkbox from "$lib/nahore/Checkbox.svelte";
  import FancyInput from "$lib/nahore/FancyInput.svelte";
  import {fullMatrix} from "$lib/singletons/inputHandler.svelte";

  let OrderStore: GenericStore<OrderReturnType> = $state({loading: true, data: null, error: null});

  getOrders().then(data => {
    OrderStore = {loading: false, data: data, error: null};
    for (const item of data) {
      fullMatrix.addLine(item.name, 0, 0, 0, 0, false, true)
    }
  }).catch(error => {
    OrderStore = {loading: false, data: null, error: error};
  })

  $inspect(fullMatrix)

  const headerData = [
    "HeaderName",
    "HeaderBudget",
    "HeaderMaterial",
    "HeaderOverhead",
    "HeaderHours",
    "Done"
  ]

  //TODO make proper loading component
  //TODO make proper error component
</script>

<div class="order-holder">
  {#snippet Cell(idx, N)}
    <div class="outer-application">
      <FancyInput row={idx} col={N}/>
    </div>
  {/snippet}


  {#if OrderStore.loading}
    <span> loading </span>
  {:else if OrderStore.error}
    <span> error </span>
  {:else if OrderStore.data !== null}
    <div class="dynamic-grid">
      {#each headerData as header}
        <div class="grid-header">{header}</div>
      {/each}
      {#each fullMatrix.matrix as {name, done, show}, idx}
        {#if !done && show}
          <div class="grid-item">{name}</div>
          {#each [1,2,3,4] as n}
            {@render Cell(idx, n)}
          {/each}
          <Checkbox/>
        {/if}
      {/each}
    </div>
  {/if}
</div>


<style lang="scss">

  $headerBackground: #1e1e1e;
  $rowBackground: #f0f0f0;

  .order-holder {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    gap: 0.5em;
    overflow-y: auto;
    min-width: 200px;
    flex: 6;
  }

  .dynamic-grid {
    display: grid;
    grid-template-columns: repeat(6, 15%);
    justify-content: center;
    grid-auto-rows: 50px; //maybe em?
    row-gap: 0.6em;
    width: 85%;
  }

  .grid-header {
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    background-color: $headerBackground;
    color: white;
    z-index: 10;
  }

  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $rowBackground;
  }

  .outer-application:nth-child(n) {
    display: flex;
    background-color: $rowBackground;
  }

</style>