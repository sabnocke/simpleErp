<script lang="ts">
    import {selectionState} from "$lib/selectionState.svelte";

    let {
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
        isTimerRunning = false,
        dis = 0
    } = $props();

    const initTotalSeconds = $derived(
        days * 86400 + hours * 3600 + minutes * 60 + seconds
    );

    let totalSeconds = $state(initTotalSeconds);

    $effect(() => {
        totalSeconds = initTotalSeconds;
    });

    $effect(() => {
        if (isTimerRunning && selectionState.current === dis && totalSeconds > 0) {
            const interval = setInterval(() => {
                totalSeconds--;
            }, 1000);
            return () => clearInterval(interval);
        }
    });

    const remainingDays = $derived(Math.floor(totalSeconds / 86400));
    const remainingHours = $derived(String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0'));
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
        /*font-weight: bold;*/
    }
</style>