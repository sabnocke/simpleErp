<script lang="ts">
import {selectedId} from "$lib/selectionStore.js";
import {selectionState} from "$lib/selectionState.svelte.js";

function promote() {
    const s = selectionState.selected.length;
    const item = selectionState.current;
    if (item === 0) {
        alert("No option chosen!");
    }
    const ns = selectionState.selected.push(item);
    if (ns === s) {
        alert(`Failed promoting option with id: ${item}`);
    }
}
</script>

<button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-8 border border-blue-500 hover:border-transparent rounded z-10"
        on:click={promote}>
    on
</button>

<!--alert(`Currently selected: ${$selectedId}, state: ${selectionState.current}`)-->

