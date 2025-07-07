<script lang="ts">
    let time = $state(new Date());

    const hours = $derived(String(time.getHours()).padStart(2, '0'));
    const minutes = $derived(String(time.getMinutes()).padStart(2, '0'));
    const seconds = $derived(String(time.getSeconds()).padStart(2, '0'));

    $effect(() => {
        const interval = setInterval(() => {
            time = new Date();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    })
</script>

<div class="clock">
    {hours}:{minutes}:{seconds}
</div>

<style>
    .clock {
        position: relative;
        font-family: monospace;
        font-size: 3rem;
        font-weight: bold;
        color: #fff;
        padding: 10px 20px;
        border-radius: 8px;
        display: inline-block;

        user-select: none;
    }
</style>