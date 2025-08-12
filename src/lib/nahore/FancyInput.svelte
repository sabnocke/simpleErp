<script lang="ts">

    let {
        type
    } = $props();

    function simpleSum(arr: {label: string, value: number}[]): number {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i].value;
        }
        return sum;
    }


    const fields = $state([
        {label: "Budget", value: 0},
        {label: "Material", value: 0},
        {label: "Overhead", value: 0},
        {label: "Hours", value: 0},
    ])
let base = 100;
let total = $derived(
    (fields[0].value + fields[1].value + fields[2].value) / base
);


</script>

{#if type === "0"}
<form class="input-group">
    {#each fields as {label, value}, idx}
        <div class="oneInput">
            <span class="lbl">{label}</span>
            <div class="custom_input">
                <svg xmlns="http://www.w3.org/2000/svg" class="svg_icon bi-hash" viewBox="0 0 16 16">
                    <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"></path>
                </svg>
                <input id={idx.toString()} class="input" type="number" disabled={idx === 3}
                       placeholder={label} bind:value={fields[idx].value}>
            </div>
        </div>
        {#if idx === 2}
            <div id="spacing"></div>
        {/if}
    {/each}

<!--    <div class="oneInput">-->
<!--        <span class="lbl">Hours</span>-->
<!--        <div class="custom_input">-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" class="svg_icon bi-hash" viewBox="0 0 16 16">-->
<!--                <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"></path>-->
<!--            </svg>-->
<!--            <input id="4" class="input" type="number" placeholder="Payout" disabled value={total}>-->
<!--        </div>-->
<!--    </div>-->
</form>
{/if}

{#if type === "1"}
    <div class="coolinput">
        <label for="input" class="text">Name:</label>
        <input type="number" placeholder="Write here..." name="input" class="input1">

    </div>
{/if}

<style lang="scss">

  /* WebKit and Blink */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    //-moz-appearance: textfield;
    appearance: textfield;
  }

  #spacing {
    margin-left: 0.5em;
    margin-right: 0.5em;
  }

  .input-group {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    width: 70%;
  }

  .custom_input {
    display: flex;
    align-items: center;
    position: relative;
    width: 20%
  }

  .input {
    font-size: 18px;
    width: 80%;
    padding: 5px 10px 5px 35px;
    outline: none;
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #C4D1EB;
    border-radius: 5px;
    transition: .3s ease;

    &:focus {
      background: #F2F2F2;
      border: 1px solid #5A7EC7;
      border-radius: 10px;
    }

    &::placeholder {
      color: #DDDDDD;
      font-size: 0.8em;
    }

  }

  .lbl {
    font-size: 14px;
  }

  .oneInput {
    display: flex;
    flex-direction: column;
  }

  .svg_icon {
    position: absolute;
    left: 10px;
    fill: #4660DC;
    width: 18px;
    height: 18px;
  }
// for type == 1

  $color_1: #818CF8;

  .coolinput {
    display: flex;
    flex-direction: column;
    width: fit-content;
    position: static;
    max-width: 240px;

    label.text {
      font-size: 0.75em;
      color: $color_1;
      font-weight: 700;
      position: relative;
      top: 0.5rem;
      margin: 0 0 0 7px;
      padding: 0 3px;
      background: #E8E8E8;
      width: fit-content;
    }

    input[type=number].input {
      padding: 11px 10px;
      font-size: 0.75rem;
      border: 2px #818CF8 solid;
      border-radius: 5px;
      background: #E8E8E8;
      &:focus {
        outline: none;
      }
    }
  }

  //.input1 {
  //  font-size: 16px;
  //  padding: 10px 10px 10px 5px;
  //  display: block;
  //  width: 200px;
  //  border: none;
  //  border-bottom: 1px solid #515151;
  //  background: transparent;
  //
  //  &:focus {
  //    outline: none;
  //  }
  //
  //  &:focus ~ label, &:valid ~ label {
  //    top: -20px;
  //    font-size: 14px;
  //    color: #5264AE;
  //  }
  //
  //  &:focus ~ .bar:before, &:focus ~ .bar:after {
  //    width: 50%;
  //  }
  //
  //  &:focus ~ .highlight {
  //    animation: inputHighlighter 0.3s ease;
  //  }
  //}
  //
  //@keyframes inputHighlighter {
  //  from {
  //    background: #5264AE;
  //  }
  //
  //  to {
  //    width: 0;
  //    background: transparent;
  //  }
  //}
  //
  //label {
  //  color: #999;
  //  font-size: 18px;
  //  font-weight: normal;
  //  position: absolute;
  //  pointer-events: none;
  //  left: 5px;
  //  top: 10px;
  //  transition: 0.2s ease all;
  //  -moz-transition: 0.2s ease all;
  //  -webkit-transition: 0.2s ease all;
  //}
  //
  //.bar {
  //  position: relative;
  //  display: block;
  //  width: 200px;
  //
  //  &:before {
  //    left: 50%;
  //  }
  //
  //  &:after {
  //    right: 50%;
  //  }
  //
  //  &:before, &:after {
  //    content: '';
  //    height: 2px;
  //    width: 0;
  //    bottom: 1px;
  //    position: absolute;
  //    background: #5264AE;
  //    transition: 0.2s ease all;
  //    -moz-transition: 0.2s ease all;
  //    -webkit-transition: 0.2s ease all;
  //  }
  //}
  //
  //.highlight {
  //  position: absolute;
  //  height: 60%;
  //  width: 100px;
  //  top: 25%;
  //  left: 0;
  //  pointer-events: none;
  //  opacity: 0.5;
  //}

</style>