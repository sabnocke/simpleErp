<script lang="ts">

  import {fullMatrix} from "$lib/singletons/inputHandler.svelte";
  import SearchBar from "$lib/nahore/SearchBar.svelte";
  import Switch from "$lib/nahore/Switch.svelte";
  import NewItem from "$lib/nahore/NewItem.svelte";

  let buttonNames = ["First", "Second"];
</script>

<div class="someNavBar">
  <SearchBar />
  <Switch active={false} />
  <NewItem />
</div>



<style lang="scss">
  .someNavBar {
    background: #fff;
    width: 4em;
    height: 25%;
    flex: 1;
  }
</style>