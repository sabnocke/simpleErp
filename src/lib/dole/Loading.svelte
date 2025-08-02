<script>
    let {text} = $props();
</script>


<div class="loading">
    <div class="custom-loader"></div>
    <span class="loading-text font-semibold text-black rounded-2xl">
            {text}
    </span>
</div>


<style lang="scss">
  .custom-loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 8px solid #E4E4E4;
    border-right-color: #766DF4;
    animation:s2 1s infinite linear;
  }
  @keyframes s2 {to{transform: rotate(1turn)}}

  .loading {
    width: calc(100% - 2rem);
    background-color: #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    padding: 1rem;
    margin: 1rem 0 0 0;
    border-radius: 1rem;
  }

</style>