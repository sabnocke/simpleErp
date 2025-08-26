<script lang="ts">

  // A lot of "Trust me I'm an engineer" here...

  import {fullMatrix, Types} from "$lib/singletons/inputHandler.svelte";

  interface IProps {
    row: number;
    col: number;
    name: string;
    type: Types;
  }

  let {row, col, name, type}: IProps = $props()

  let base = 100;

  let isStringNumeric = (value: string) => !isNaN(Number(value))

  let ord = (x: number , y: number) => 0.5 * (x + y) * (x + y + 1) + y

  let num = $state(0);
  let item = fullMatrix.nameLookup.get(name);


  // let numRow = isStringNumeric(row) ? Number(row) : 0;
  //
  // const numCol = isStringNumeric(col) ? Number(col) : 0;

  $effect(() => {
    // if (fullMatrix.matrix[numRow] === null)
    //   return;

    if (!item) {
      return;
    }

    switch (type) {
      case Types.Budget:
        item.budget = num;
        break;
      case Types.Material:
        item.material = num;
        break;
      case Types.Overhead:
        item.overhead = num;
        break;
    }

  })

  let total = $derived(
      ((item?.budget ?? 0) + (item?.material ?? 0) + (item?.overhead ?? 0)) / base
  )

  //TODO add unit to input (money, time, ...); will probably need a div container to mimic current input, flex row and align
</script>

<!--<input id={name} class="input item" type="number" placeholder="huh" bind:value={total} disabled={type === Types.Hours}>-->
{#if type === Types.Hours}
  <input id={name} class="input item" type="number" placeholder="huh" bind:value={total} disabled={type === Types.Hours}>
{:else}
  <input id={name} class="input item" type="number" placeholder="huh" bind:value={num}>
{/if}


<style lang="scss">

  $insetBorderColor: #5A7EC7;
  $inputBackgroundColor: white;
  $inputFontColor: black;
  $inputBorderColor: #C4D1EB;
  $rowBackground: #f0f0f0;

  @mixin insetBorder($npx, $color) {
    -webkit-box-shadow: inset 0 0 0 $npx $color;
    -moz-box-shadow: inset 0 0 0 $npx $color;
    box-shadow: inset 0 0 0 $npx $color;
  }

  .item {
    display: flex;
    background-color: $rowBackground;
  }


  /* WebKit and Blink */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    appearance: textfield;
  }

  .input {
    font-size: 18px;
    padding: 5px 10px 5px 15px;
    outline: none;
    background: $inputBackgroundColor;
    color: $inputFontColor;
    border: 0 solid $inputBorderColor;

    width: -webkit-fill-available; // might not work on firefox
    height: -webkit-fill-available;

    &:focus {
      background: #F2F2F2;
      box-shadow: inset 0 0 0 1px $insetBorderColor;
    }

    &::placeholder {
      color: #DDDDDD;
      font-size: 0.8em;
    }
  }
</style>