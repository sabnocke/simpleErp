<script lang="ts">
    import {getFullLayout} from "$lib/database/db";
    import OrderBasic from "$lib/OrderBasic.svelte";
    import {Time} from "$lib/hub.svelte";

    let data: {name: string, startAt: Date, endAt: Date}[] = [];
    getFullLayout().then((d) => {
        data = d;
    })

    function DatesToTime(start: Date, end: Date) {
        const d = end.getTime() - start.getTime();
        return Time.fromMilliseconds(d);
    }


    let parsed: {name: string, time: Time}[] = [];
    for (let item of data) {
        parsed.push({name: item.name, time: DatesToTime(item.startAt, item.endAt)});
    }

</script>


<div>
    {#each parsed as {name, time}, idx (name)}
        <OrderBasic id={idx} days={time.days} hours={time.hours} minutes={time.minutes} seconds={time.seconds}/>
    {/each}
</div>