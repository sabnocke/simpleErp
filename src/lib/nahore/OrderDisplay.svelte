<script lang="ts">
    //@ts-nocheck
    import {getOrders} from "../database/loadOrders.js"
    import {type OrderReturnType, type GenericStore} from "$lib/customTypes.js";
    import Checkbox from "$lib/nahore/Checkbox.svelte";
    import FancyInput from "$lib/nahore/FancyInput.svelte";
    import {fullMatrix, NAME, DONE, SHOW} from "$lib/singletons/inputHandler.svelte";
    import GridCell from "$lib/nahore/GridCell.svelte";

    let OrderStore: GenericStore<OrderReturnType> = $state({loading: true, data: null, error: null});
    // fullMatrix.reset()

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
</script>

<div class="order-holder">
    {#snippet Cell(idx, N)}
        <GridCell>
            <FancyInput row={idx} col={N}/>
        </GridCell>
    {/snippet}


    {#if OrderStore.loading}
        <span> loading </span>
    {:else if OrderStore.error}
        <span> error </span>
    {:else if OrderStore.data !== null}
        <div class="outer-container">
            <div class="row-header">
                {#each headerData as header}
                    <GridCell type={1}>
                        <span>{header}</span>
                    </GridCell>
                {/each}
            </div>

            {#each fullMatrix.matrix as {name, done, show}, idx}
                {#if !done && show}
                    <div class="inner-container">
                        <GridCell>
                            <span class="named">{name}</span>
                        </GridCell>
                        {#each [1,2,3,4] as n}
                            {@render Cell(idx, n)}
                        {/each}
                        <GridCell>
                            <Checkbox/>
                        </GridCell>
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</div>


<style lang="scss">

  $sideOffset: 1.5em;
  $headerBackground: black;
  $headerFontColor: white;

  .order-holder {
    position: relative;
    padding-top: 1em;
    //width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    gap: 0.5em;
    height: 100%;
    overflow-y: auto;
    min-width: 200px;
    flex: 6;
  }
  
  .outer-container {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: center;
  }

  .row-header {
    display: flex;
    width: calc(100% - $sideOffset);
    position: sticky;
    top: 0;
    background: $headerBackground;
    color: $headerFontColor;
    z-index: 10;
  }

  .inner-container {
    display: flex;
    flex-direction: row;
    padding: 0.25em 0.25em 0.25em 0.75em;
    background: #ccc;
    align-items: center;
    width: calc(100% - $sideOffset);
  }
</style>