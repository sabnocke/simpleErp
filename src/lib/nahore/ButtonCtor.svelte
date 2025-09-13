<script lang="ts">
  import {Page} from "$lib/singletons/pageSelect.svelte";
  import {redirect} from "@sveltejs/kit";
  import {goto} from "$app/navigation";

  interface Props {
    active: boolean;
    name: string;
    target: string;
  }

  let {active, name, target}: Props = $props();

  function goToPage() {
    goto(`/nahore/${target}`);
  }

  // let names = ["abcd", "ahoj"]
</script>


<button class="button-base" class:isActive={active} onclick={goToPage}>
  {name}
</button>

<style lang="scss">
  @use "sass:color";

  $colorAdjustScale: 20%;
  $baseColor: #ccc;

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
    background-color: $baseColor;
    width: calc(100% - 0.5em);
    height: 5ch;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;

    &:hover {
      background-color: color.adjust($baseColor, $lightness: $colorAdjustScale);
    }

    &:active {
      background-color: #FFF;
    }
  }

  .isActive {
    background-color: color.adjust($baseColor, $lightness: $colorAdjustScale);

    &:hover {
      background-color: color.adjust($baseColor, $lightness: $colorAdjustScale) !important;
    }
  }


</style>