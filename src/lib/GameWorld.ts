import { writable, type Writable } from "svelte/store";
import {
  Building,
  type ManagerType,
  type UngoodUpgradeConstructor,
} from "./Building";
import type { UngoodAchievmentConstructor } from "./Achievment";

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
};

export class GameWorld {
  name: string;
  score: Writable<number>;
  theme: string;
  buildings: Building[];
  amountToBuy: Writable<number>;
  constructor({
    name,
    score,
    buildings,
    theme,
    amountToBuy,
  }: GameWorldConstructor) {
    this.name = name;
    this.score = writable(score);
    this.theme = theme;
    this.amountToBuy = amountToBuy;
    const buildingMachine = buildings.map(
      (building) =>
        new Building({
          name: building.name,
          worldScore: this.score,
          amountToBuy: this.amountToBuy,
          amount: building.amount,
          image: building.image,
          description: building.description,
          cost: building.cost,
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
    const data = {
      name: this.name,
      score: this.getWorldScore(),
      amountToBuy: this.amountToBuy,
      buildings: [
        // amount
        // ismanaged
        // name
      ],
    };
    this.buildings.forEach((building) => {
      let upgrades = building.upgrades.map((upgrade) => {
        return {
          name: upgrade.name,
          isPurchased: upgrade.getIsPurchased(),
        };
      });
      console.log("upgrades", upgrades);
      let amount = building.getAmount();
      let isManaged = building.getIsManaged();
      console.log(building, building.name, amount, isManaged);
    });
    return data;
    //localStorage.setItem("saveData", JSON.stringify(world));
  };
}
