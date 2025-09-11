<script lang="ts">
  import {fullMatrix} from "$lib/singletons/inputHandler.svelte.ts";

  interface Props {
        active: boolean;
    }

    let {active = false}: Props = $props();
    let clicked = $state(active);

    $effect(() => {
      fullMatrix.seekArchived = clicked;
    })

</script>

<div class="outer">
  <span class="text">Display archived</span>
  <div class="container">
    <input type="checkbox" class="checkbox" id="checkbox" bind:checked={active}>
    <label class="switch" for="checkbox">
      <span class="slider"></span>
    </label>
  </div>
</div>

<style lang="scss">
  $background-color: #f0f0f0;
  $font-color: #242424;
  $primary-color: #2d6737;
  $secondary-color: #fff;
  $light-shadow: #ffffff2b;
  $dark-shadow: #00000026;
  $hover-dark-shadow: #0000003b;
  $checked-dark-shadow: #0000002b;

  .container {
    width: 51px;
    height: 31px;
    position: relative;
  }

  .checkbox {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;

    &:checked + .switch {
      background-color: #34C759;
    }
    &:checked + .switch .slider {
      left: calc(50% - 27px/2 + 10px);
      top: calc(50% - 27px/2);
    }
  }

  .switch {
    width: 100%;
    height: 100%;
    display: block;
    background-color: #e9e9e9;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }

  .slider {
    width: 27px;
    height: 27px;
    position: absolute;
    left: calc(50% - 27px/2 - 10px);
    top: calc(50% - 27px/2);
    border-radius: 50%;
    background: #FFFFFF;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15), 0 3px 1px rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease-out;
    cursor: pointer;
  }

</style>