<script lang="ts">
  import {fullMatrix} from "$lib/singletons/inputHandler.svelte.ts";

  interface IProps {
    idx: number
    hash: number
    checked: boolean
  }

  let {idx, hash, checked}: IProps = $props()

  $effect(() => {
    console.log(`idx: ${idx}`);
    // fullMatrix.matrix[idx]!.done = checked;
    // if (checked || !checked) {
    //   fullMatrix.moveById(idx);
    // }


  })

  // let move = () => {
  //   $inspect(fullMatrix.moveById(idx));
  // }

</script>

<label class="wrapper">
  <input type="checkbox" name="checkbox" class="ui-checkbox" bind:checked={checked} onchange={() => fullMatrix.moveByHash(hash)} />
</label>


<style lang="scss">
  $background: #f0f0f0;
  $primary-color: #1677FF;
  $secondary-color: #FFFFFF;
  $border-color: #D9D9D9;
  $checkbox-size: 22px;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;
    background-color: $background;
  }

  .ui-checkbox {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;

    width: $checkbox-size;
    height: $checkbox-size;
    border: 1px solid $border-color;
    border-radius: 5px;
    background-color: $secondary-color;

    position: relative;
    display: grid;
    place-content: center;

    transition: all 0.2s ease-in-out;

    &::before {
      content: "";
      width: 5px;
      height: 10px;
      border: solid $secondary-color;
      border-width: 0 2px 2px 0;

      opacity: 0;
      transform: rotate(45deg) scale(0);
      transition: all 0.2s ease-in-out;
    }

    &:not(:checked):hover {
      border-color: $primary-color;
    }

    &:checked {
      background-color: $primary-color;
      border-color: $primary-color;
    }

    &:checked::before {
      opacity: 1;
      transform: rotate(45deg) scale(1.2);
    }
  }

</style>