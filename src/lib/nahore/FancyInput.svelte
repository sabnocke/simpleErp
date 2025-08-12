<script lang="ts">
    // import {FieldItem, fieldStorage} from "$lib/singletons/inputHandler.svelte";

    let base = 100;

    let budget = $state(0);
    let material = $state(0);
    let overhead = $state(0);
</script>

<div class="collective">
    <div class="collective-column">
        <input id="bud" class="input i-left" type="number" placeholder="huh" bind:value={budget}>
        <label for="bud">Budget</label>
    </div>

    <div class="collective-column">
        <input id="mat" class="input i-center" type="number" placeholder="huh" bind:value={material}>
        <label for="mat">Material</label>
    </div>

    <div class="collective-column">
        <input id="ove" class="input i-right" type="number" placeholder="huh" bind:value={overhead}>
        <label for="ove">Overhead</label>
    </div>

</div>

<style lang="scss">

  $insetBorderColor: #5A7EC7;
  $activeScale: 1.1;

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

  .collective {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    width: 50%;
    padding: 5px 10px 5px 10px;
  }

  .collective-column {
    display: flex;
    flex-direction: column-reverse;
  }

  .input {
    font-size: 18px;
    width: 100%;
    padding: 5px 10px 5px 15px;
    outline: none;
    background: #FFFFFF;
    color: #000000;
    border: 0 solid #C4D1EB;

    &:focus {
      background: #F2F2F2;
      box-shadow: inset 0 0 0 1px $insetBorderColor;
    }

    &::placeholder {
      color: #DDDDDD;
      font-size: 0.8em;
    }
  }

  .i-left {
    border-radius: 5px 0 0 5px;
  }

  .i-right {
    border-radius: 0 5px 5px 0;
  }

  .i-center {
    border-radius: 0;
    border-right: 1px solid black;
    border-left: 1px solid black;
  }

  label {
    position: relative;
    font-size: 13px;
    padding-left: 0.5em;
    width: 50%;
  }

  // could use label:has(...) instead if input is within label
  .input:active + label,
  .input:focus + label {
    color: red;
    font-weight: 700;
  }

  //.svg_icon {
  //  position: absolute;
  //  left: 10px;
  //  fill: #4660DC;
  //  width: 18px;
  //  height: 18px;
  //}
</style>