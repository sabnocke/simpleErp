<script lang="ts">
  //@ts-nocheck
  import {/*getOrders, generateRandomEntries,*/ fetchOrders} from "../database/loadOrders.js"
  // import {merge} from "$lib/utils.ts";
  import type {/*OrderReturnType,*/ GenericStore, IDisplay} from "$lib/customTypes.js";
  import Checkbox from "$lib/nahore/Checkbox.svelte";
  import FancyInput from "$lib/nahore/FancyInput.svelte";
  import {fullMatrix, Types} from "$lib/singletons/inputHandler.svelte";
  // import {fetchOrders} from "$lib/server/orderProvider.ts";

  let OrderStore: GenericStore<IDisplay> = $state({loading: true, data: null, error: null});

  // generateRandomEntries(10).then(data => {
  //   OrderStore = {loading: false, data: data, error: null};
  //   for (const item of data) {
  //     fullMatrix.addLine(item.name, 0, 0, 0, 0, false, true)
  //   }
  // }).catch(error => {
  //   OrderStore = {loading: false, data: null, error: error};
  //   console.error(error);
  // })

  $effect(() => {
    fetchOrders().then(data => {
      OrderStore = {loading: false, data: data, error: null}
      for (const item of data) {
        fullMatrix.addLine(item.name, item.budget, item.material, item.overhead, 0.0, item.done);
        //TODO once hours (or seconds) loading is working change it here         ^
      }
    }).catch(error => {
      OrderStore = {loading: false, data: null, error: error};
      console.error(error);
    })
  })

  // $effect(async () => {
  //   try {
  //     const orders = await fetchOrders()
  //     console.log(orders)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // })


  let toDisplay = $derived(
      fullMatrix.matrix.filter(item => fullMatrix.selector(item.done, item.show))
  )

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
  $inspect(fullMatrix.matrix)
</script>

<div class="order-holder">
  <!--{#snippet Cell(idx, N)}-->
  <!--  <div class="outer-application">-->

  <!--  </div>-->
  <!--{/snippet}-->


  {#if OrderStore.loading}
    <span> loading </span>
  {:else if OrderStore.error}
    <span> error </span>
  {:else if OrderStore.data !== null}
    <div class="dynamic-grid">
      {#each headerData as header}
        <div class="grid-header">{header}</div>
      {/each}
      {#each toDisplay as {name, done, show, hash}, idx (name)}
        <div class="grid-item">{name}</div>
        <FancyInput row={idx} col={0} name={name} type={Types.Budget}/>
        <FancyInput row={idx} col={0} name={name} type={Types.Material}/>
        <FancyInput row={idx} col={0} name={name} type={Types.Overhead}/>
        <FancyInput row={idx} col={0} name={name} type={Types.Hours}/>
        <Checkbox idx={idx} hash={hash} bind:checked={toDisplay[idx].done}/>
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

  //.outer-application:nth-child(n) {
  //  display: flex;
  //  background-color: $rowBackground;
  //}

</style>