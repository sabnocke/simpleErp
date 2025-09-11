<script lang="ts">
  import {fullMatrix} from "$lib/singletons/inputHandler.svelte.ts";
  import {createOrder} from "$lib/database/loadOrders.ts";

  let name: string | null = $state(null);
  let budget: number | null = $state(null);
  let material: number | null = $state(null);
  let overhead: number | null = $state(null);
  let total = $derived(
      ((budget ?? 0) + (material ?? 0) + (overhead ?? 0)) / 100
  );

  function submit() {
    if (!name) {
      alert(`Incorrect name given; expected valid name but got ${name}!`);
      return;
    }
    if (fullMatrix.nameUniqueLookup.has(name)) {
      alert("Name already exists!");
      return;
    }

    fullMatrix.addLine(name, budget ?? 0, material ?? 0, overhead ?? 0);
    createOrder(name, budget ?? 0, material ?? 0, overhead ?? 0).then(() => {
      console.log("Success! (most likely)");
    }).catch((e) => {
      console.log("Error :( (most likely)");
    })
  }

  // TODO repair the submit button
</script>

<form class="form">
  <p class="title">New </p>
  <div class="flex">
    <label>
      <input required placeholder="" type="text" class="input" bind:value={name}>
      <span>Name</span>
    </label>
  </div>

  <label>
    <input placeholder="0" type="number" class="input" bind:value={budget}>
    <span>Budget</span>
  </label>

  <label>
    <input placeholder="0" type="number" class="input" bind:value={material}>
    <span>Material</span>
  </label>
  <label>
    <input placeholder="0" type="number" class="input" bind:value={overhead}>
    <span>Overhead</span>
  </label>

  <span>Hours: {total}</span>

  <button class="submit" formmethod="dialog" onclick={submit}>Submit</button>
</form>

<style lang="scss">
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    appearance: textfield;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;

    &::before, &::after {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      border-radius: 50%;
      left: 0;
      background-color: royalblue;
    }

    &::after {
      width: 18px;
      height: 18px;
      animation: pulse 1s linear infinite;
    }

    &::before {
      width: 18px;
      height: 18px;
      background-color: royalblue;
    }

  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .form label .input:focus + span, .form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form label .input:valid + span {
    color: green;
  }

  .submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    user-select: none;
    /*transform: 0.3s all ease;*/
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
</style>
