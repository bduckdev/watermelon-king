import { writable, type Writable } from "svelte/store";
import { Building } from "./Building";

type GameWorldConstructor = {
    name: string;
    score: number;
    buildings: UngoodBuildingConstructor[];
    //incrementScore: (amount: number) => void;
};

export type UngoodBuildingConstructor = {
    name: string;
    image: string;
    amount: number;
    cost: number;
    baseIncome: number;
    speed: number;
};

export class GameWorld {
    name: string;
    score: Writable<number>;
    buildings: Building[];
    constructor({ name, score, buildings }: GameWorldConstructor) {
        this.name = name;
        this.score = writable(score);
        const buildingMachine = buildings.map(
            (building) =>
                new Building({
                    name: building.name,
                    worldScore: this.score,
                    image: building.image,
                    cost: building.cost,
                    baseIncome: building.baseIncome,
                    amount: building.amount,
                    speed: building.speed,
                }),
        );

        this.buildings = buildingMachine;
    }
}
