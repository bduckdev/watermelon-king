<script>
    import UpgradeComponent from "./UpgradeComponent.svelte";

    import Modal from "./Modal.svelte";
    export let world;

    export let score;
</script>

<Modal {score} buttonText="Upgrades" modalHeading="Upgrades">
    <div class="grid grid-cols-1 overflow-y-scroll h-[calc(85vh)] lg:h-[calc(50vh)] gap-5 items-start">
        {#each world.buildings as building}
        {#each building.upgrades as upgrade}
        <UpgradeComponent {building} {upgrade} />
        {/each}
        {/each}
    </div>
</Modal>
