<script lang="ts">

  // A lot of "Trust me I'm an engineer" here...

  import {fullMatrix} from "$lib/singletons/inputHandler.svelte";

  let {row, col} = $props()

  let base = 100;

  let isStringNumeric = (value: string) => !isNaN(Number(value))

  let ord = (x: number , y: number) => 0.5 * (x + y) * (x + y + 1) + y

  let num = $state(0);

  let numRow = isStringNumeric(row) ? Number(row) : 0;

  const numCol = isStringNumeric(col) ? Number(col) : 0;

  $effect(() => {
    if (fullMatrix.matrix[numRow] === null)
      return;

    if (numCol === 1)
      fullMatrix.matrix[numRow]!.budget = num;
    else if (numCol === 2)
      fullMatrix.matrix[numRow]!.material = num;
    else if (numCol === 3)
      fullMatrix.matrix[numRow]!.overhead = num;

  })

  let total = $derived(
      (fullMatrix.matrix[numRow]!.budget + fullMatrix.matrix[numRow]!.material + fullMatrix.matrix[numRow]!.overhead) / base
  )

  //TODO add unit to input (money, time, ...); will probably need a div container to mimic current input, flex row and align
</script>
{#if numCol === 4}
  <input id={`${ord(numRow, numCol)}`} class="input item" type="number" placeholder="huh" bind:value={total} disabled>
{:else}
  <input id={`${ord(numRow, numCol)}`} class="input item" type="number" placeholder="huh" bind:value={num}>
{/if}

<style lang="scss">

  $insetBorderColor: #5A7EC7;
  $inputBackgroundColor: white;
  $inputFontColor: black;
  $inputBorderColor: #C4D1EB;

  @mixin insetBorder($npx, $color) {
    -webkit-box-shadow: inset 0 0 0 $npx $color;
    -moz-box-shadow: inset 0 0 0 $npx $color;
    box-shadow: inset 0 0 0 $npx $color;
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