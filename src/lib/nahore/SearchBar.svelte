<script lang="ts">
  import {fullMatrix} from "$lib/singletons/inputHandler.svelte";

  let searchedValue = $state("");

  $effect(() => {
    //TODO method chaining or making searchedValue argument of fuzzySearch()
    fullMatrix.query = searchedValue;
    fullMatrix.fuzzySearch()
  })


</script>

<div class="inputGroup">
  <input id="search" type="text" required autocomplete="off" bind:value={searchedValue}>
  <label for="search">PlaceholderName</label>
</div>

<style lang="scss">
  .inputGroup {
    font-family: "Segoe UI", sans-serif;
    margin: 1em 0 1em 0;
    max-width: 190px;
    position: relative;
    display: flex;

    input {
      font-size: 100%;
      padding: 0.8em;
      outline: none;
      border: 2px solid rgb(200, 200, 200); // TODO convert to hex
      background-color: transparent;
      border-radius: 20px;
      width: 100%;
    }
    label {
      font-size: 100%;
      position: absolute;
      left: 0;
      padding: 0.8em;
      margin-left: 0.5em;
      pointer-events: none;
      transition: all 0.3s ease;
      color: rgb(100, 100, 100); // TODO convert to hex
    }
    :is(input:focus, input:valid)~label {
      transform: translateY(-50%) scale(0.9);
      margin: 0 0 0 1.3em;
      padding: 0.4em;
      background-color: #fff;
    }
    :is(input:focus, input:valid) {
      border-color: rgb(150, 150, 150); // TODO convert to hex
    }
  }
</style>