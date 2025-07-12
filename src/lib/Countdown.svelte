<script lang="ts">
    import {WorkerSelection} from "$lib/singletons/selection.svelte.js";

    let {
        seconds = 0,
        dayLength = 24,
        isTimerRunning = false,
        dis = 0
    } = $props();

    const initTotalSeconds = $derived(seconds);

    let totalSeconds = $state(initTotalSeconds); //TODO now what?

    $effect(() => {
        totalSeconds = initTotalSeconds;
    });

    $effect(() => {
        if (isTimerRunning && WorkerSelection.current === dis && totalSeconds > 0) {
            const interval = setInterval(() => {
                totalSeconds--;
            }, 1000);
            return () => clearInterval(interval);
        }
    });

    const dayLengthInSeconds = $derived(dayLength * 3600);
    const remainingDays = $derived(Math.floor(totalSeconds / dayLengthInSeconds));
    const remainingHours = $derived(String(Math.floor((totalSeconds % dayLengthInSeconds) / 3600)).padStart(2, '0'));
    const remainingMinutes = $derived(String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0'));
    const remainingSeconds = $derived(String(totalSeconds % 60).padStart(2, '0'));
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