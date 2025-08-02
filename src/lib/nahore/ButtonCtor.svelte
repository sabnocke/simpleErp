<script lang="ts">
    import Button from "$lib/nahore/Button.svelte";
    import {Page} from "$lib/singletons/pageSelect.svelte";

    let names = ["abcd", "ahoj"]
</script>


<div class="button-holder">
    <div class="button-base">
        {`Active index is: ${Page.current}`}
    </div>
    {#each names as name, idx}
    <div class="button-base" class:isActive={Page.current === idx}>
        {name + " " + idx}
    </div>
    {/each}
</div>

<style lang="scss">
  @use "sass:color";

  .button-holder {
    padding-top: 5em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: 0.2em;
  }

  .button-base {
    position: relative;
    z-index: 2;
    background-color: #cccccc;
    width: calc(100% - 0.5em);
    height: 5ch;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;

    &:hover {
        background-color: lighten(#cccccc, 10%);
    }

    &:active {
      background-color: #FFF;
    }
  }

  .isActive {
    background-color: lighten(#cccccc, 20%);
    &:hover {
      background-color: lighten(#cccccc, 20%) !important;
    }
  }


</style>