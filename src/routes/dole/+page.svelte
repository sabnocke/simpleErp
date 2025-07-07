<script>
    import Clock from "$lib/Clock.svelte";
    import OnButton from "$lib/OnButton.svelte";
    import OffButton from "$lib/OffButton.svelte";
</script>


<div>
    <div id="name-picker-container">
        <div id="clock-container">
            <Clock/>
            <div id="two-buttons">
                <OnButton/>
                <OffButton/>
            </div>
        </div>

    </div>
    <div id="layout-container">
        <div id="name-picker"></div>
        <div id="order-picker"></div>
    </div>
</div>


<style>

    #layout-container {
        display: flex;
        flex-direction: row;
        width: 100vw;
        height: 100vh;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
    }

    #order-picker {
        box-sizing: border-box;
        background: #1B1B1B;
        width: 64vw;
        height: calc(100vh - 20px);
        border-radius: 15px;
    }

    #name-picker {
        box-sizing: border-box;
        position: relative;
        background-color: #1B1B1B;
        width: 34vw;
        height: calc(100vh - 20px);
        border-radius: 15px;
    }

    #clock-container {
        position: absolute;
        z-index: 10;
        padding-left: 20px;
        padding-top: 10px;
        padding-right: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 34vw;
    }

    #two-buttons {
        gap: 2rem;
        display: flex;
    }

    #name-picker-container {
        display: flex;
        flex-direction: row;
        z-index: 10;
        position: absolute;
        padding-top: 10px;
        padding-left: 10px;
        padding-bottom: 10px;
        width: calc(34vw + 10px);
        height: 100vh;
        box-sizing: border-box;
    }
</style>