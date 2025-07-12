<script lang="ts">
    import {setContext} from "svelte";
    import {writable, readable, derived} from "svelte/store";
    //TODO move both get... into one file
    import {getWorkers} from "$lib/database/loadWorkers";
    import type {OrderReturnType, WorkerReturnType, KnownWorkersType} from "$lib/customTypes";
    import {Order} from "$lib/customTypes"
    import {getOrders} from "$lib/database/loadOrders";
    import type {Connection, Protocol} from "$lib/singletons/connections.svelte";

    let {children} = $props();

    const WorkerStore = writable<{loading: boolean, data: WorkerReturnType | null, error: any}>({
        loading: true,
        data: null,
        error: null,
    });

    const OrderStore = writable<{loading: boolean, data: OrderReturnType | null, error: any}>({
        loading: true,
        data: null,
        error: null,
    });

    let knownWorkers: KnownWorkersType = $state(new Map());
    let knownWorkers2 = writable(new Map());
    let knownList_ = $derived.by(() => knownWorkers);

    const registerApi = {
        register(workerId: number, orderId: number) {
            if (!$OrderStore.data) {
                return;
            }
            let orders = $OrderStore.data.filter(item => item.id === orderId);
            if (orders.length !== 1) {
                return;
            }
            let {id, name, seconds} = orders[0];
            knownWorkers.set(workerId, new Order(id, name, seconds));
            knownWorkers2.update(map => {
                map.set(workerId, new Order(id, name, seconds));
                return map;
            });
            // knownWorkers.set(workerId, {orderId: orderId, startAt: new Date(), endAt: new Date()});
        },

        knownList: derived(knownWorkers2, $knownWorkers2 => $knownWorkers2),
    }

    setContext("registerApi", writable(registerApi));
    setContext("knownWorkers", writable(knownWorkers));
    setContext("workers", WorkerStore);
    setContext("orders", OrderStore);

    getOrders().then(data => {
        console.log(data);
        OrderStore.set({loading: false, data: data, error: null});
    }).catch(error => {
        OrderStore.set({loading: false, data: null, error: error});
    })

    getWorkers().then(data => {
        console.log(data);
        WorkerStore.set({loading: false, data, error: null});
    }).catch(err => {
        console.log(err);
        WorkerStore.set({loading: false, data: null, error: err});
    })

</script>

<div>
    {@render children()}
</div>