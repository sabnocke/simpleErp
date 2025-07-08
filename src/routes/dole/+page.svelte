<script>
    import Clock from "$lib/Clock.svelte";
    import OnButton from "$lib/OnButton.svelte";
    import OffButton from "$lib/OffButton.svelte";
    import NamedSwitch from "$lib/NamedSwitch.svelte";
    import RadioButton from '$lib/RadioButton.svelte';
    import OrderBasic from "$lib/OrderBasic.svelte";
</script>

<div id="layout-container">
    <div id="name-picker">
        <div id="clock-container">
            <Clock/>
            <div id="two-buttons">
                <OnButton/>
                <OffButton/>
            </div>
        </div>
        <div id="line"></div>
        <RadioButton id={1}/>
        <RadioButton id={2}/>
    </div>
    <div id="order-picker">
        <OrderBasic/>
    </div>
    <NamedSwitch/>
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
        width: 60%;
        height: calc(100vh - 20px);
        border-radius: 15px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #name-picker {
        box-sizing: border-box;
        position: relative;
        background-color: #1B1B1B;
        width: 35%;
        height: calc(100vh - 20px);
        border-radius: 15px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #clock-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    #two-buttons {
        display: flex;
        gap: 2rem;
        padding-right: 20px;
    }

    #line {
        width: calc(100% - 20px);
        height: 2px;
        background: #7E7E7E;
        margin-top: 2px;
        margin-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }
</style>