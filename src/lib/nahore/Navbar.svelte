<script lang="ts">
    import ButtonCtor from "$lib/nahore/ButtonCtor.svelte";

    let activeIdx: number = $props();
</script>

<div id="nav-wrapper">
    <ButtonCtor />
</div>

<style lang="scss">
    #nav-wrapper {
      //width: 25%;
      height: 100%;
      background-color: #1E1E1E;
      position: relative;
      flex: 1;
    }
</style>