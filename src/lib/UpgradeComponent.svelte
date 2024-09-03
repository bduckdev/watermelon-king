<script lang="ts">
    export let building;
    export let upgrade;
    let {isPurchased, canBuy} = upgrade;
</script>

{#if !$isPurchased}
<div class="flex justify-between items-center w-full">
    <div class="flex justify-evenly items-center gap-2">
        <img src={building.image} alt="" class="w-12 h-full" />
        <div>
            <p class="text-sm">{upgrade.name}</p>
            <p class="text-xs font-thin">{upgrade.description}</p>
        </div>
    </div>
    <div class="flex justify-evenly items-center gap-2">
        <p class="font-bold text-sm">Cost: ${upgrade.cost}</p>
        {#if !$canBuy}
        <button on:click={upgrade.handleUpgrade} class="btn btn-disabled">Buy</button>
        {:else}
        <button on:click={upgrade.handleUpgrade} class="btn btn-primary">Buy</button>
        {/if}
    </div>
</div>
{/if}
