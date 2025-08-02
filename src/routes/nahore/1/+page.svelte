<script lang="ts">
import Navbar from "$lib/nahore/Navbar.svelte";
import OrderDisplay from "$lib/nahore/OrderDisplay.svelte";
</script>

<div class="display-box">
    <Navbar active={0}></Navbar>
    <OrderDisplay />
</div>


<style lang="scss">
    .display-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100vw;
      height: 100vh;
    }
</style>