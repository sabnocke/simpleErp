<script lang="ts">
  import ButtonCtor from "$lib/nahore/ButtonCtor.svelte";

  interface Props {
    active: number
    names: string[]
  }

  let {active, names}: Props = $props();
</script>

<div id="nav-wrapper">
  {#each names as name, idx}
    <ButtonCtor active={active === idx} name={name} target={`${idx + 1}`}/>
  {/each}
</div>

<style lang="scss">
  #nav-wrapper {
    //height: 100%;
    background-color: #1E1E1E;
    position: relative;
    flex: 1;
    overflow: hidden;
  }
</style>