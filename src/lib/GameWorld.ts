import { writable, type Writable } from "svelte/store";
import {
    Building,
    type ManagerType,
    type UngoodUpgradeConstructor,
} from "./Building";
import type { UngoodAchievmentConstructor } from "./Achievment";
type WorldDataType = {
    name: string;
    score: number;
    buildings: BuildingDataType[];
};
type BuildingDataType = {
    baseIncome: number;
    name: string;
    image: string;
    description: string;
    amount: number;
    isManaged: boolean;
    upgrades: UpgradeDataType[];
    speed: number;
    manager: ManagerType;
    cost: number;
    achievments: UngoodAchievmentConstructor[];
};

type UpgradeDataType = {
    name: string;
    description: string;
    multiplier: number;
    isPurchased: boolean;
    cost: number;
};

export type GameWorldConstructor = {
    name: string;
    score: number;
    buildings: UngoodBuildingConstructor[];
    theme: string;
    amountToBuy: Writable<number>;
    //incrementScore: (amount: number) => void;
};

export type UngoodBuildingConstructor = {
    name: string;
    image: string;
    description: string;
    amount: number;
    cost: number;
    baseIncome: number;
    speed: number;
    manager: ManagerType;
    upgrades: UngoodUpgradeConstructor[];
    achievments: UngoodAchievmentConstructor[];
    isManaged: boolean;
};

export class GameWorld {
    name: string;
    score: Writable<number>;
    theme: string;
    buildings: Building[];
    constructor({ name, score, buildings, theme }: GameWorldConstructor) {
        this.name = name;
        this.score = writable(score);
        this.theme = theme;
        const buildingMachine = buildings.map(
            (building) =>
                new Building({
                    name: building.name,
                    worldScore: this.score,
                    amount: building.amount,
                    image: building.image,
                    description: building.description,
                    cost: building.cost,
                    isManaged: building.isManaged,
                    baseIncome: building.baseIncome,
                    speed: building.speed,
                    manager: building.manager,
                    upgrades: building.upgrades,
                    achievments: building.achievments,
                }),
        );

        this.buildings = buildingMachine;
    }
    public getWorldScore = () => {
        let score;
        this.score.subscribe((s) => (score = s));
        return score;
    };

    public getItemGenerically = <T>(store: Writable<T>) => {
        let x;
        store.subscribe((val) => (x = val));
        return x;
    };

    public getWorldData = () => {
        const data: WorldDataType = {
            name: this.name,
            score: this.getWorldScore()!,
            buildings: [],
        };
        this.buildings.forEach((building) => {
            const amount = building.getAmount();
            const upgrades = building.upgrades.map((upgrade) => {
                return <UpgradeDataType>{
                    name: upgrade.name,
                    description: upgrade.description,
                    isPurchased: upgrade.getIsPurchased()!,
                    multiplier: upgrade.multiplier,
                    cost: upgrade.cost,
                };
            });
            const achievments = building.achievments.map((achievment) => {
                return <UngoodAchievmentConstructor>{
                    name: achievment.name,
                    requirement: achievment.requirement,
                    multiplier: achievment.multiplier,
                    isAchieved: achievment.getIsAchieved()!,
                };
            });
            const buildingData: BuildingDataType = {
                baseIncome: building.baseIncome!,
                cost: building.getCost()!,
                name: building.name!,
                image: building.image,
                description: building.description!,
                amount: amount!,
                isManaged: building.getIsManaged()!,
                manager: building.manager,
                upgrades: upgrades,
                achievments: achievments,
                speed: building.getSpeed()!,
            };

            data.buildings.push(buildingData);
        });
        return data;
    };
}
