<script lang="ts">
import Navbar from "$lib/nahore/Navbar.svelte";
import OrderDisplay from "$lib/nahore/OrderDisplay.svelte";
import Filter from "$lib/nahore/Filter.svelte";
</script>

<div class="display-box">
    <Navbar active={0}></Navbar>
    <div class="dunno">
        <Filter />
        <OrderDisplay />
    </div>
</div>


<style lang="scss">
    .display-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100vw;
      height: 100vh;
      flex: 1 0 auto;
    }

    .dunno {
      display: flex;
      flex: 5;
    }
</style>