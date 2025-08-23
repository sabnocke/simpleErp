<script lang="ts">
    interface Props {
        count: number;
        active: number;
        names: Array<string>;
    }

    let {count, active = -1, names}: Props = $props();
    let whoClicked = $state(active);
    function clicked(which: number) {
        whoClicked = whoClicked === which ? -1 : which;
    }

</script>

<div class="btn-group">
  {#if names.length !== count}
    <span> error </span>
  {:else}
    {#each names as name, idx}
    <button class="btn" type="button" onclick={() => clicked(idx)} class:wasClicked={whoClicked === idx}>
      {name}
    </button>
    {/each}
  {/if}
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

  .btn {
    font: inherit;
    background-color: $background-color;
    border: 0;
    color: $font-color;
    font-size: 1.15rem;
    padding: 0.375em 1em;
    text-shadow: 0 .0625em 0 white;
    box-shadow:
      0 0.0625em 0 0 #f4f4f4 inset,
      0 0.0625em 0 0 #efefef,
      0 0.125em 0 0 #ececec,
      0 0.25em 0 0 #e0e0e0,
      0 0.3125em 0 0 #dedede,
      0 0.375em 0 0 #dcdcdc,
      0 0.425em 0 0 #cacaca,
      0 0.425em 0.5em 0 #cecece;
    transition: 0.23s ease;
    cursor: pointer;
    font-weight: bold;
    margin: -1px;

    &:active {
      translate: 0 0.225em;
      box-shadow:
        0 0.03em 0 0 #f4f4f4 inset,
        0 0.03em 0 0 #efefef,
        0 0.0625em 0 0 #ececec,
        0 0.125em 0 0 #e0e0e0,
        0 0.125em 0 0 #dedede,
        0 0.2em 0 0 #dcdcdc,
        0 0.225em 0 0 #cacaca,
        0 0.225em 0.375em 0 #cecece;
      letter-spacing: 0.1em;
      color: skyblue;
    }
  }

  .btn-group {
    &:first-child {
      border-top-left-radius: 0.5em;
      border-bottom-left-radius: 0.5em;
    }

    &:last-child {
      border-top-right-radius: 0.5em;
      border-bottom-right-radius: 0.5em;
    }

    &:not(:first-child), &:not(:last-child) {
      border-radius: 0;
    }
  }

  .wasClicked {
    color: skyblue;
  }


</style>