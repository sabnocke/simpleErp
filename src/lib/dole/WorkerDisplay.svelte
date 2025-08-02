<script lang="ts">
    import {getContext} from "svelte";
    import type {Writable} from "svelte/store";
    import type {WorkerReturnType, GenericStore} from "$lib/customTypes";
    import RadioButton from "$lib/RadioButton.svelte";
    import Loading from "$lib/Loading.svelte";

    const workerData: Writable<GenericStore<WorkerReturnType>> = getContext("workers");
</script>

<div class="worker-display">
    {#if $workerData.loading}
        <Loading text="Loading user data..."/>
    {:else if $workerData.error}
        <p style="color: red;">Error: {$workerData.error.message ?? "?"}</p>
    {:else if $workerData.data}
        {#each $workerData.data as {name}, idx (name)}
            <RadioButton id={idx} name={name}/>
        {/each}
    {/if}
</div>


<style lang="scss">
    .worker-display {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0.5rem;
    }
</style>