<script lang="ts">
    import Header from "./lib/Header.svelte";
    import WatermelonImage from "./assets/watermelons.png";

    import {GameWorld as World} from "./lib/GameWorld";
    import GameWorld from "./lib/GameWorld.svelte";
    import Modal from "./lib/Modal.svelte";

    let earth = new World({
        name: "Earth",
        score: 0,
        buildings: [
            {
                name: "Watermelons",
                amount: 1,
                cost: 10,
                image: WatermelonImage,
                baseIncome: 1,
                speed: 2500,
            },
            {
                name: "Watermelons",
                amount: 1,
                cost: 10,
                image: WatermelonImage,
                baseIncome: 1,
                speed: 2500,
            },
            {
                name: "Watermelons",
                amount: 1,
                cost: 10,
                image: WatermelonImage,
                baseIncome: 1,
                speed: 2500,
            },
            {
                name: "Watermelons",
                amount: 1,
                cost: 10,
                image: WatermelonImage,
                baseIncome: 1,
                speed: 2500,
            },
            {
                name: "Watermelons",
                amount: 1,
                cost: 10,
                image: WatermelonImage,
                baseIncome: 1,
                speed: 2500,
            },
        ],
    });

    let world = earth;
</script>

<Modal>
    <p>deez nuts</p>
</Modal>
<Header />
<main>
    <GameWorld {world} />
</main>
