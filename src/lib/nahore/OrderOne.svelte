<script lang="ts">
    import FancyInput from "$lib/nahore/FancyInput.svelte";
    import Checkbox from "$lib/nahore/Checkbox.svelte";
    let {name = "DEFAULT"} = $props();
</script>

<div class="one">
    <span class="name">{name}</span>
    <FancyInput />
    <Checkbox />
</div>


<style lang="scss">
    .one {
      width: calc(100% - 1.5em);
      height: 4em;
      background-color: #cccccc;
      display: flex;
      align-items: center;
      padding: 0.5em 0.5em 0.5em 0.5em;
      justify-content: space-around;
    }

    .name {
      width: 20%;
    }
</style>