import type { ArrowUp01 } from "lucide-svelte";
import { writable, type Writable } from "svelte/store";

export type UpgradeConstructor = {
  name: string;
  multiplier: number;
  handleUpgradeMultiplier: (num: number) => void;
  cost: number;
  gameScore: Writable<number>;
  description: string;
  isPurchased: boolean;
};

export class Upgrade {
  name: string;
  multiplier: number;
  isPurchased: Writable<boolean>;
  gameScore: Writable<number>;
  cost: number;
  canBuy: Writable<boolean>;
  handleUpgradeMultiplier: (num: number) => void;
  description: string;

  constructor({
    name,
    multiplier,
    handleUpgradeMultiplier,
    cost,
    gameScore,
    isPurchased,
    description,
  }: UpgradeConstructor) {
    this.name = name;
    this.multiplier = multiplier;
    this.isPurchased = writable(isPurchased);
    this.gameScore = gameScore;
    this.cost = cost;
    this.handleUpgradeMultiplier = handleUpgradeMultiplier;
    this.description = description;
    this.canBuy = writable(false);
  }

  private getGameScore = () => {
    let score;
    this.gameScore.subscribe((s) => (score = s));
    return score;
  };

  public getIsPurchased = () => {
    let bool;
    this.isPurchased.subscribe((b) => (bool = b));
    return bool;
  };

  public getCanBuy() {
    let score;
    this.gameScore.subscribe((s) => (score = s));
    if (score! >= this.cost) {
      this.canBuy.update((b) => (b = true));
    } else {
      this.canBuy.update((b) => (b = false));
    }
    let bool;
    this.canBuy.subscribe((b) => (bool = b));
  }

  public handleUpgrade = () => {
    const score = this.getGameScore();
    if (score! >= this.cost) {
      this.gameScore.update((s) => +(s - this.cost).toFixed(2));
      this.isPurchased.update((b) => (b = true));
      this.handleUpgradeMultiplier(this.multiplier);
    }
  };
}
