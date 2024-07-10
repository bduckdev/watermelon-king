import { writable, type Writable } from "svelte/store";
import { Upgrade, type UpgradeConstructor } from "./Upgrade";
import { Achievment, type UngoodAchievmentConstructor } from "./Achievment";
import { delay } from "./Utils";

export type BuildingConstructor = {
    name: string;
    image: string;
    worldScore: Writable<number>;
    amount: number;
    description: string;
    cost: number;
    baseIncome: number;
    speed: number;
    manager: ManagerType;
    upgrades: UngoodUpgradeConstructor[];
    achievments: UngoodAchievmentConstructor[];
    amountToBuy: Writable<number>;
};
export type UngoodUpgradeConstructor = {
    name: string;
    multiplier: number;
    description: string;
    cost: number;
    isPurchased: boolean;
};

export type ManagerType = {
    name: string;
    image: string;
    cost: number;
};

export class Building {
    name: string;
    image: string;
    description: string;
    worldScore: Writable<number>;
    amount: Writable<number>;
    amountToBuy: Writable<number>;
    progress: Writable<number>;
    cost: Writable<number>;
    speed: Writable<number>;
    countdown: Writable<number>;
    isFast: Writable<boolean>;
    income: Writable<number>;
    manager: ManagerType;
    upgradeMultiplier: Writable<number>;
    upgrades: Upgrade[];
    achievments: Achievment[];
    canBuy: Writable<boolean>;
    nextAchievmentAt: Writable<Number>;

    constructor({
        name,
        image,
        amount,
        cost,
        baseIncome,
        speed,
        worldScore,
        description,
        manager,
        upgrades,
        achievments,
        amountToBuy,
    }: BuildingConstructor) {
        this.name = name;
        this.image = image;
        this.amount = writable(amount);
        this.cost = writable(cost);
        this.description = description;
        this.countdown = writable(speed / 100);
        this.amountToBuy = amountToBuy;
        this.income = writable(baseIncome);
        this.progress = writable(0);
        this.speed = writable(speed);
        this.isFast = writable(false);
        this.worldScore = worldScore;
        this.manager = manager;
        this.upgradeMultiplier = writable(1);
        this.canBuy = writable(false);
        this.nextAchievmentAt = writable(achievments[0].requirement);
        this.upgrades = upgrades.map(
            (upgrade) =>
                new Upgrade({
                    name: upgrade.name,
                    multiplier: upgrade.multiplier,
                    isPurchased: upgrade.isPurchased,
                    description: upgrade.description,
                    gameScore: this.worldScore,
                    handleUpgradeMultiplier: this.handleUpgrade,
                    cost: upgrade.cost,
                }),
        );
        this.achievments = achievments.map(
            (achievment) =>
                new Achievment({
                    name: achievment.name,
                    requirement: achievment.requirement,
                    isAchieved: writable(false),
                    quantity: this.amount,
                    multiplier: achievment.multiplier,
                    speed: this.speed,
                }),
        );
    }
    isManaged: Writable<boolean> = writable(false);
    isRunning: Writable<boolean> = writable(false);

    public getAmount = () => {
        let amount;
        this.amount.subscribe((a) => (amount = a));
        return amount;
    };

    public getCountdown = () => {
        let countdown;
        this.countdown.subscribe((c) => (countdown = c));
        return countdown;
    };
    public resetCountdown = () => {
        let speed = this.getSpeed()!;
        this.countdown.update((c) => (c = speed / 100));
    };
    private getCost = () => {
        //this should simply get the cost store and return the value based on the cost times the amount
        let cost;
        this.cost.subscribe((c) => (cost = c));
        return +cost!.toFixed(2);
    };

    public getIsFast = () => {
        let isFast;
        let speed = this.getSpeed()!;
        let isManaged = this.getIsManaged()!;
        if (speed < 500 && isManaged == true) {
            isFast = true;
        } else {
            isFast = false;
        }
        this.isFast.update((b) => (b = isFast));
        return isFast;
    };

    public getNextAchievmentAt = () => {
        let nextA = 0;
        const stupidArr = this.achievments.filter((achievment) => {
            const isAchieved = achievment.getIsAchieved()!;
            if (isAchieved) {
                return achievment;
            }
        });
        let allAchieved = true;
        if (this.achievments.length === stupidArr.length) {
            this.nextAchievmentAt.update((n) => (n = nextA));
            return nextA;
        } else {
            for (let i = 0; i < this.achievments.length; i++) {
                let isAchieved = this.achievments[i].getIsAchieved();
                if (!isAchieved!) {
                    allAchieved = false;
                    let amount = this.getAmount()!;
                    nextA = this.achievments[i]!.requirement;
                    let prevA: number;
                    prevA = 0;
                    if (i > 0) {
                        prevA = this.achievments[i - 1].requirement;
                    }
                    if (amount === prevA) {
                        nextA = prevA;
                    }
                    this.nextAchievmentAt.update((n) => (n = nextA));
                    return nextA;
                }
            }
        }
    };
    private updateCost = () => {
        // this should update the cost based on a value
        let cost = this.getCost();

        this.cost.update(() => +(cost * 1.05).toFixed(2));
    };

    public getCanBuy = () => {
        let score = this.getScore()!;
        let cost = this.getCost()!;
        if (score < cost) {
            this.canBuy.update((b) => (b = false));
            return false;
        }
        this.canBuy.update((b) => (b = true));
        return true;
    };

    public getIsManaged = () => {
        let isManaged;
        this.isManaged.subscribe((b) => (isManaged = b));
        return isManaged;
    };

    public getIsRunning = () => {
        let isRunning;
        this.isRunning.subscribe((b) => (isRunning = b));
        return isRunning;
    };

    public getIncome = () => {
        let income;
        this.income.subscribe((v) => (income = v));
        return income;
    };

    private getScore = () => {
        let score;
        this.worldScore.subscribe((s) => (score = +s.toFixed(2)));
        return score;
    };
    public canBuyManager = () => {
        let score = this.getScore();
        const cost = this.manager.cost;
        if (score! >= cost!) {
            return true;
        } else {
            return false;
        }
    };

    private getSpeed = () => {
        let speed;
        this.speed.subscribe((s) => (speed = s));
        return speed;
    };
    public getProgress = () => {
        let progress;
        this.progress.subscribe((p) => (progress = p));
        return progress;
    };

    public getUpgradeMultiplier = () => {
        let multiplier;
        this.upgradeMultiplier.subscribe((i) => (multiplier = i));
        return multiplier;
    };

    public handleRun = () => {
        this.getCanBuy();
        const amount = this.getAmount();
        const income = this.getIncome();
        const isRunning = this.getIsRunning();
        const isManaged = this.getIsManaged();
        const speed = this.getSpeed();
        const isFast = this.getIsFast()!;
        this.isRunning.update((b) => (b = true));
        if (!isRunning) {
            let progInterval: number;
            let countdownInterval: number;
            if (!isFast) {
                let countdown = this.getCountdown()!;
                countdownInterval = setInterval(() => {
                    countdown--;
                    this.countdown.update((c) => (c = countdown));
                }, 100);
                let prog = 1;
                let full = speed! / 25;
                progInterval = setInterval(() => {
                    this.progress.update((p) => (p = (prog / full) * 100));
                    prog++;
                    if (isFast) {
                        clearInterval(progInterval);
                    }
                }, 25);
            }
            setTimeout(() => {
                clearInterval(progInterval);
                this.resetCountdown();
                clearInterval(countdownInterval);
                //this.worldScore.update((v) => v + income! * amount!);
                this.incrementScore(income! * amount!);
                this.isRunning.update((b) => (b = false));
                if (isManaged) {
                    this.handleRun();
                }
                this.progress.update((p) => (p = 0));

                return this.getCanBuy();
            }, speed!);
        }
    };

    public handleUpgrade = (num: number) => {
        this.upgradeMultiplier.update((v) => v * num);
        const multiplier = this.getUpgradeMultiplier();
        this.income.update((v) => v * multiplier!);
    };

    public handleBuyManager = () => {
        if (this.canBuyManager()) {
            this.isManaged.update((b) => (b = true));
            this.incrementScore(-this.manager.cost);
            this.handleRun();
        } else {
            return;
        }
    };
    private checkAchievments = () => {
        this.achievments.forEach((achievment) => {
            achievment.handleAchievment();
        });
        this.resetCountdown();
    };
    public handleBuy = () => {
        let cost = this.getCost();
        let canBuy = this.getCanBuy();
        if (!canBuy) return;
        this.incrementScore(-cost);
        this.amount.update((a) => (a = a + 1));
        this.updateCost();
        this.checkAchievments();
        this.getNextAchievmentAt();
        this.getCost();
        this.getCanBuy();
    };
    private incrementScore = (n: number) => {
        this.worldScore.update((s) => (s = +(s + n).toFixed(2)));
    };
}
