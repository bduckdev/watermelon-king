import type { Writable } from "svelte/store";

type AchievmentConstructor = {
  name: string;
  quantity: Writable<number>;
  requirement: number;
  isAchieved: Writable<boolean>;
  multiplier: number;
  speed: Writable<number>;
};
export type UngoodAchievmentConstructor = {
  name: string;
  requirement: number;
  multiplier: number;
  isAchieved: boolean;
};

export class Achievment {
  name: string;
  quantity: Writable<number>;
  requirement: number;
  isAchieved: Writable<boolean>;
  multiplier: number;
  speed: Writable<number>;

  constructor({
    name,
    quantity,
    requirement,
    isAchieved,
    multiplier,
    speed,
  }: AchievmentConstructor) {
    this.name = name;
    this.quantity = quantity;
    this.requirement = requirement;
    this.isAchieved = isAchieved;
    this.multiplier = multiplier;
    this.speed = speed;
  }

  private getQuantity = () => {
    let quantity;
    this.quantity.subscribe((q) => (quantity = q));
    return quantity;
  };

  public getIsAchieved = () => {
    let isAchieved;
    this.isAchieved.subscribe((b) => (isAchieved = b));
    return isAchieved;
  };
  public handleAchievment = () => {
    const quantity = this.getQuantity();
    if (this.getIsAchieved()) {
      return false;
    }
    if (quantity! >= this.requirement) {
      this.speed.update((speed) => speed / this.multiplier);
      this.isAchieved.update((a) => (a = true));
      return true;
    }
  };
}
