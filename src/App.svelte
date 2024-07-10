<script lang="ts">
    import Header from "./lib/Header.svelte";
    import WatermelonImage from "./assets/watermelons.png";
    import BananaImage from "./assets/bananas.png";
    import CoconutImage from "./assets/coconuts.png";

    import {GameWorld as World} from "./lib/GameWorld";
    import GameWorld from "./lib/GameWorld.svelte";
    import {getContext, setContext} from "svelte";
    import {writable} from "svelte/store";

    const earth = writable(
        new World({
            name: "Earth",
            theme: "aqua",
            score: 1000,
            amountToBuy: writable(1),
            buildings: [
                {
                    name: "Watermelon Stands",
                    amount: 1,
                    description: "A simple watermelon stand!",
                    cost: 5,
                    image: WatermelonImage,
                    baseIncome: 1,
                    speed: 2500,
                    manager: {
                        name: "Mr. Manager",
                        image: WatermelonImage,
                        cost: 100,
                    },
                    upgrades: [
                        {
                            name: "Watermelon Stand Upgrade",
                            description:
                                "Increase the output of Watermelon stands by 30x",
                            multiplier: 30,
                            cost: 100,
                            isPurchased: false,
                        },
                    ],
                    achievments: [
                        {
                            name: "More Watermelons",
                            requirement: 25,
                            multiplier: 2,
                        },
                        {
                            name: "More Watermelons",
                            requirement: 50,
                            multiplier: 2,
                        },
                        {
                            name: "More Watermelons",
                            requirement: 75,
                            multiplier: 2,
                        },
                        {
                            name: "More Watermelons",
                            requirement: 100,
                            multiplier: 2,
                        },
                        {
                            name: "More Watermelons",
                            requirement: 200,
                            multiplier: 2,
                        },
                    ],
                },
                {
                    name: "Watermelon Dealers",
                    description: "Slangin that good shit",
                    amount: 0,
                    cost: 25,
                    image: WatermelonImage,
                    baseIncome: 5,
                    speed: 5000,
                    manager: {
                        name: "Mr. Manager",
                        image: WatermelonImage,
                        cost: 100,
                    },
                    upgrades: [
                        {
                            name: "Watermelon Stand Upgrade",
                            description: "foo bar deez nuts",
                            isPurchased: false,
                            multiplier: 30,
                            cost: 100,
                        },
                    ],
                    achievments: [
                        {
                            name: "More Watermelon Dealers",
                            requirement: 5,
                            multiplier: 2,
                        },
                        {
                            name: "More Watermelon Dealers",
                            requirement: 10,
                            multiplier: 2,
                        },
                    ],
                },
            ],
        }),
    );

    const user = {
        /*
        id: null,
        isLoggedIn: false,
        */
    };
    setContext("currentUser", user);
    setContext("world", earth);
    let world = getContext("world");
    const userData = localStorage.getItem("saveData");

    setContext("world", userData);

    function handleSaveData() {
        console.log($earth);
        localStorage.setItem("saveData", JSON.stringify(world));
    }
</script>

<button on:click={handleSaveData}>save</button>
<Header world={$earth} />
<main class="-5">
    <GameWorld world={$earth} />
</main>
