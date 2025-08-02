<script lang="ts">
    import {SyncIndex, initializeSync} from "$lib/singletons/selection.svelte.js";

    let {
        initialSeconds = 0,
        dayLength = 24,
        isTimerRunning = false,
        dis = -1,
        usage = 1,
    } = $props();

    initializeSync(dis, initialSeconds);

    let totalSeconds = $state(initialSeconds);

    const usageUpdate = $derived(usage > 0 ? usage : 1);
    const dayLengthInSeconds = $derived(dayLength * 3600);
    const remainingDays = $derived(Math.floor(totalSeconds / dayLengthInSeconds));
    const remainingHours = $derived(String(Math.floor((totalSeconds % dayLengthInSeconds) / 3600)).padStart(2, '0'));
    const remainingMinutes = $derived(String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0'));
    const remainingSeconds = $derived(String(totalSeconds % 60).padStart(2, '0'));

    $effect(() => {
        totalSeconds = initialSeconds;
    });

    $effect(() => {
        if (isTimerRunning && totalSeconds > 0) {
            const interval = setInterval(() => {
                totalSeconds--;
                SyncIndex.get(dis)!.count--
            }, 1000 / usageUpdate);
            return () => clearInterval(interval);
        }
    });
</script>

<div class="countdown">
    {#if remainingDays > 0}
        <span>{remainingDays}</span>
    {/if}
    <span>{remainingHours}:{remainingMinutes}:{remainingSeconds}</span>
</div>


<style>
    .countdown {
        font-family: monospace;
        font-size: 1.5rem;
        color: black;
        font-weight: 500;
    }
</style>