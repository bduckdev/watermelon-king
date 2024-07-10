<script lang="ts">
    export let building;
    export let achievment;
    let {isAchieved} = achievment;
</script>

{#if $isAchieved}
<div class="flex flex-col justify-between items-center w-full bg-base-200 p-2 rounded-xl gap-2">
    <p class="text-[.5rem]">{building.name}</p>
    <img src={building.image} alt="" class="w-12 h-full" />
    <p>{achievment.requirement}</p>
</div>
{:else}
<div class="flex flex-col justify-between items-center w-full opacity-50 p-2 rounded-xl gap-2">
    <img src={building.image} alt="" class="w-12 h-full" />
    <p class="text-[.5rem]">{building.name}</p>
    <p>{achievment.requirement}</p>
</div>
{/if}
