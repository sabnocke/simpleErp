<script lang="ts">
    import {setContext} from "svelte";
    import {writable} from "svelte/store";
    //TODO move both get... into one file
    import {getWorkers} from "$lib/database/loadWorkers";
    import {getOrders} from "$lib/database/loadOrders";
    import type {OrderReturnType, WorkerReturnType, GenericStore} from "$lib/customTypes";

    let {children} = $props();

    const WorkerStore = writable<{ loading: boolean, data: WorkerReturnType | null, error: any }>({
        loading: true,
        data: null,
        error: null,
    });

    // let WorkerStore = $state<GenericStore<WorkerReturnType>>({
    //     loading: true,
    //     data: null,
    //     error: null,
    // })

    const OrderStore = writable<{ loading: boolean, data: OrderReturnType | null, error: any }>({
        loading: true,
        data: null,
        error: null,
    });

    setContext("workers", WorkerStore);
    setContext("orders", OrderStore);

    getOrders().then(data => {
        OrderStore.set({loading: false, data: data, error: null});
    }).catch(error => {
        OrderStore.set({loading: false, data: null, error: error});
    })

    getWorkers().then(data => {
        WorkerStore.set({loading: false, data, error: null});
    }).catch(err => {
        WorkerStore.set({loading: false, data: null, error: err});
    })

</script>

<div>
    {@render children()}
</div>