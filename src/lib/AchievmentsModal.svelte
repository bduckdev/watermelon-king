<script>
    import AchievmentComponent from "./AchievmentComponent.svelte";
    import Modal from "./Modal.svelte";
    export let world;

    /*
    If this should be sorted

    //@ts-ignore
    let achievmentsArr = world.buildings.map((building) =>
        //@ts-ignore
        building.upgrades.map((upgrade) => upgrade),
    );

    //@ts-ignore
    let achievments = achievmentsArr[0].sort((a, b) => a.cost - b.cost);
    */
</script>

<Modal buttonText="Achievments" modalHeading="Achievments">
    <div class="grid grid-flow-row-dense overflow-y-scroll h-[calc(50vh)] grid-cols-4 gap-5">
        {#each world.buildings as building}
        {#each building.achievments as achievment}
        <AchievmentComponent {building} {achievment} />
        {/each}
        {/each}
    </div>
</Modal>
