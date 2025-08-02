<script lang="ts">
    let isOn = $state(false);

    function toggle() {
        isOn = !isOn;
    }
</script>


<button class:active={isOn} onclick={toggle} aria-label="Toggle">
    <span class="nub"></span>
</button>

<style>
    button {
        cursor: pointer;
        position: relative;
        width: 60px;
        height: 30px;
        border-radius: 15px;
        border: none;
        background-color: #767676;
        transition: background-color 0.2s ease-in-out;
    }

    .nub{
        position: absolute;
        top: 3px;
        left: 3px;
        width: 24px;
        height: 24px;
        background-color: #fff;
        border-radius: 50%;
        transition: transform 0.2s ease-in-out;
    }

    button.active {
        background-color: #4ade80;
    }

    button.active .nub {
        transform: translateX(30px);
    }
</style>