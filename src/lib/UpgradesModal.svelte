<script>
    import UpgradeComponent from "./UpgradeComponent.svelte";

    import Modal from "./Modal.svelte";
    export let world;

    //@ts-ignore
    let upgradesArr = world.buildings.map((building) =>
        //@ts-ignore
        building.upgrades.map((upgrade) => upgrade),
    );

    //@ts-ignore
    let upgrades = upgradesArr[0].sort((a, b) => a.cost - b.cost);
    export let score;
</script>

<Modal {score} buttonText="Upgrades" modalHeading="Upgrades">
    <div
        class="grid grid-cols-1 overflow-y-scroll h-[calc(85vh)] lg:h-[calc(50vh)] gap-5 items-start"
    >
        {#each world.buildings as building}
            {#each building.upgrades as upgrade}
                <UpgradeComponent {building} {upgrade} />
            {/each}
        {/each}
    </div>
</Modal>
