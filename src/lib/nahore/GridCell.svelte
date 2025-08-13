<script lang="ts">
    let {children, type = 0} = $props();
</script>


<div class="grid-cell" class:center={type === 1}>
    {@render children()}
</div>


<style lang="scss">
    .grid-cell {
      &:nth-child(1) {
        flex: 1 0 3em;
      }
      &:nth-child(2), &:nth-child(3), &:nth-child(4) {
        flex: 1 0 1em;
        margin-right: .5em;
      }
      flex: 1;
    }

    .center {
      display: flex;
      justify-content: center;
    }
</style>