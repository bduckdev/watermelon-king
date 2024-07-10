<script lang="ts">
    import {handleNumberDisplay} from "./Utils";

    export let building;
    let {isManaged} = building;
</script>

{#if !$isManaged}
<div class="flex justify-between items-center w-full">
    <div class="flex justify-evenly items-center gap-2">
        <img src={building.manager.image} alt="" class="w-12 h-full" />
        <p class="text-sm">{building.manager.name}</p>
    </div>
    <div class="flex justify-evenly items-center gap-2">
        <p class="font-bold text-sm">
            Cost: ${handleNumberDisplay(building.manager.cost)}
        </p>
        <button on:click={building.handleBuyManager} class="btn btn-primary">Buy</button>
    </div>
</div>
{/if}
