<script>
    import ManagerComponent from "./ManagerComponent.svelte";

    import Modal from "./Modal.svelte";
    export let world;
    export let score;
</script>

<Modal showScore={true} {score} buttonText="Managers" modalHeading="Managers">
    <div class="grid grid-cols-1 overflow-y-scroll h-[calc(50vh)] gap-5">
        {#each world.buildings as building}
            <ManagerComponent {building} />
        {/each}
    </div>
</Modal>
