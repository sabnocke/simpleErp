<script lang="ts">
    let isChecked = $state(false);
</script>

<label class="wrapper">
    <input type="checkbox" class="ui-checkbox" bind:checked={isChecked} />
</label>


<style lang="scss">
    :root {
      --primary-color: #1677FF;
      --secondary-color: #FFFFFF;
      --border-color: #D9D9D9;
      --checkbox-size: 22px;
    }

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      user-select: none;
    }

    .ui-checkbox {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;

      width: var(--checkbox-size);
      height: var(--checkbox-size);
      border: 1px solid var(--border-color);
      border-radius: 5px;
      background-color: var(--secondary-color);

      position: relative;
      display: grid;
      place-content: center;

      transition: all 0.2s ease-in-out;

      &::before {
        content: "";
        width: 5px;
        height: 10px;
        border: solid var(--secondary-color);
        border-width: 0 2px 2px 0;

        opacity: 0;
        transform: rotate(45deg) scale(0);
        transition: all 0.2s ease-in-out;
      }

      &:not(:checked):hover {
        border-color: var(--primary-color);
      }

      &:checked {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
      }

      &:checked::before {
        opacity: 1;
        transform: rotate(45deg) scale(1.2);
      }
    }

</style>