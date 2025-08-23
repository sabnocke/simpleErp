<script lang="ts">

    import {fullMatrix} from "$lib/singletons/inputHandler.svelte";
    import SearchBar from "$lib/nahore/SearchBar.svelte";
    import Switch from "$lib/nahore/Switch.svelte";

    let buttonNames = ["First", "Second"];
</script>

<div class="someNavBar">
    <SearchBar />
    <Switch count={2} names={buttonNames} active={0}/>
</div>



<style lang="scss">
  .someNavBar {
    background: #fff;
    width: 4em;
    height: 25%;
    flex: 1;
  }
</style>