<script lang="ts">
    import Countdown from "$lib/Countdown.svelte";
    let {
        name = "DEFAULT",
        id,
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0
    } = $props();
</script>

<button class="order-basic" >
    <span class="text-lg font-semibold text-black">{name}</span>
    <Countdown days={days} hours={hours} minutes={minutes} seconds={seconds} dis={id}/>
</button>

<style lang="scss">
    .order-basic {
      background-color: #C0C0C0;
      width: calc(100% - 20px);
      height: 60px;
      margin-top: 10px;
      border-radius: 15px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      &:hover {
        background-color: lighten(#C0C0C0, 20%);
      }

    }
</style>