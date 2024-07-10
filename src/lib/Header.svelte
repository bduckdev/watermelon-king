<script lang="ts">
    import cx from "classnames";
    import AchievmentsModal from "./AchievmentsModal.svelte";
    import ManagersModal from "./ManagersModal.svelte";
    import UpgradesModal from "./UpgradesModal.svelte";
    import LoginModal from "./LoginModal.svelte";

    export let world;
    let { amountToBuy, score } = world;
</script>

<header class="flex justify-evenly p-2 pb-5 items-center">
    <p class="font-black text-3xl">Watermelon King 🍉</p>
    <nav class="flex justify-evenly gap-3">
        <UpgradesModal score={$score} {world} />
        <ManagersModal score={$score} {world} />
        <AchievmentsModal {world} />
        <LoginModal />
    </nav>
</header>
