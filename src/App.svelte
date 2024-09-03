<script lang="ts">
    import Header from "./lib/Header.svelte";
    import WatermelonImage from "./assets/watermelons.png";
    import BananaImage from "./assets/bananas.png";
    import CoconutImage from "./assets/coconuts.png";

    import {GameWorld as World} from "./lib/GameWorld";
    import GameWorld from "./lib/GameWorld.svelte";
    import {getContext, setContext} from "svelte";
    import {writable} from "svelte/store";

    const earthInit = {
        name: "Earth",
        theme: "aqua",
        score: 50000,
        amountToBuy: writable(1),
        buildings: [
            {
                name: "Watermelon Stands",
                amount: 1,
                description: "A simple watermelon stand!",
                cost: 5,
                isManaged: false,
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
                        name: "Bigger Signs",
                        description:
                            "Increase the output of Watermelon Stands by 3x",
                        multiplier: 3,
                        cost: 1000,
                        isPurchased: false,
                    },
                ],
                achievments: [
                    {
                        name: "25 Watermelon Stands",
                        requirement: 25,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "50 Watermelon Stands",
                        requirement: 50,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "100 Watermelon Stands",
                        requirement: 100,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "200 Watermelon Stands",
                        requirement: 200,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "300 Watermelon Stands",
                        requirement: 300,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "400 Watermelon Stands",
                        requirement: 400,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "500 Watermelon Stands",
                        requirement: 500,
                        multiplier: 2,
                        isAchieved: false,
                    },
                ],
            },
            {
                name: "Watermelon Dealers",
                amount: 0,
                description:
                    "Back-alley watermelon salesman. It's a legitimate career.",
                cost: 25,
                isManaged: false,
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
                        name: "Aggressive Persuasion",
                        description:
                            "Increase the output of Watermelon Dealers by 3x",
                        multiplier: 3,
                        cost: 10000,
                        isPurchased: false,
                    },
                ],
                achievments: [
                    {
                        name: "25 Watermelon Dealers",
                        requirement: 25,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "50 Watermelon Dealers",
                        requirement: 50,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "100 Watermelon Dealers",
                        requirement: 100,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "200 Watermelon Dealers",
                        requirement: 200,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "300 Watermelon Dealers",
                        requirement: 300,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "400 Watermelon Dealers",
                        requirement: 400,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "500 Watermelon Dealers",
                        requirement: 500,
                        multiplier: 2,
                        isAchieved: false,
                    },
                ],
            },
            {
                name: "Farmer's Markets",
                amount: 0,
                description: "Watermelon stands, but now at farmer's markets.",
                cost: 50,
                isManaged: false,
                image: WatermelonImage,
                baseIncome: 15,
                speed: 10000,
                manager: {
                    name: "Mr. Manager",
                    image: WatermelonImage,
                    cost: 100,
                },
                upgrades: [
                    {
                        name: "Square Watermelons",
                        description:
                            "Increase the output of Farmer's Markets by 3x",
                        multiplier: 3,
                        cost: 100000,
                        isPurchased: false,
                    },
                ],
                achievments: [
                    {
                        name: "25 Farmer's Markets",
                        requirement: 25,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "50 Farmer's Markets",
                        requirement: 50,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "100 Farmer's Markets",
                        requirement: 100,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "200 Farmer's Markets",
                        requirement: 200,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "300 Farmer's Markets",
                        requirement: 300,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "400 Farmer's Markets",
                        requirement: 400,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "500 Farmer's Markets",
                        requirement: 500,
                        multiplier: 2,
                        isAchieved: false,
                    },
                ],
            },
            {
                name: "Grocery Stores",
                amount: 0,
                description:
                    "According to our highly advanced AI analysis, people are likely to buy watermelons at grocery stores.",
                cost: 150,
                isManaged: false,
                image: WatermelonImage,
                baseIncome: 50,
                speed: 25000,
                manager: {
                    name: "Mr. Manager",
                    image: WatermelonImage,
                    cost: 100,
                },
                upgrades: [
                    {
                        name: "Free Samples",
                        description:
                            "Increase the output of Grocery Stores by 3x",
                        multiplier: 3,
                        cost: 250000,
                        isPurchased: false,
                    },
                ],
                achievments: [
                    {
                        name: "25 Grocery Stores",
                        requirement: 25,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "50 Grocery Stores",
                        requirement: 50,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "100 Grocery Stores",
                        requirement: 100,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "200 Grocery Stores",
                        requirement: 200,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "300 Grocery Stores",
                        requirement: 300,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "400 Grocery Stores",
                        requirement: 400,
                        multiplier: 2,
                        isAchieved: false,
                    },
                    {
                        name: "500 Grocery Stores",
                        requirement: 500,
                        multiplier: 2,
                        isAchieved: false,
                    },
                ],
            },
        ],
    };

    const currentWorld = writable(new World(earthInit));

    const saveData = localStorage.getItem("saveData") ?? null;

    if (saveData === null) {
        handleSaveData();
    } else {
        currentWorld.update((w) => (w = new World(JSON.parse(saveData))));
        $currentWorld.buildings.forEach((building) => {
            const isManaged = building.getIsManaged();
            if (isManaged) {
                building.handleRun();
            }
        });
    }

    function handleSaveData() {
        //@ts-ignore
        const data = $currentWorld.getWorldData();
        localStorage.setItem("saveData", JSON.stringify(data));
    }
    function deleteSaveData() {
        localStorage.removeItem("saveData");
        location.reload();
    }
    setInterval(() => handleSaveData(), 500);
</script>

<button on:click={deleteSaveData}>delete save data</button>
<Header world={$currentWorld} />
<main class="">
    <GameWorld world={$currentWorld} />
</main>
