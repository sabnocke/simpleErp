<script lang="ts">

    import {fullMatrix} from "$lib/singletons/inputHandler.svelte";
    import SearchBar from "$lib/nahore/SearchBar.svelte";
</script>

<div class="someNavBar">
    <SearchBar />
</div>



<style lang="scss">
  .someNavBar {
    background: #fff;
    width: 4em;
    height: 25%;
    flex: 1;
  }
</style>