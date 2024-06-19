<script lang>
    import Building from "./Building.svelte";
    export let world;
    let {score} = world;
</script>

<p class="text-center pt-2 pb-5 text-3xl font-black text-primary">
    ${$score}
</p>
<div class="grid grid-cols-1 overflow-hidden lg:grid-cols-2 mx-0 md:mx-8 lg:mx-52 gap-5">
    {#each world.buildings as building}
    <Building {building} />
    {/each}
</div>
