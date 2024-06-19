import { writable, type Writable } from "svelte/store";

export type BuildingConstructor = {
    name: string;
    image: string;
    worldScore: Writable<number>;
    amount: number;
    cost: number;
    baseIncome: number;
    speed: number;
};

export class Building {
    name: string;
    image: string;
    worldScore: Writable<number>;
    amount: Writable<number>;
    cost: Writable<number>;
    speed: number;
    income: Writable<number>;

    constructor({
        name,
        image,
        amount,
        cost,
        baseIncome,
        speed,
        worldScore,
    }: BuildingConstructor) {
        this.name = name;
        this.image = image;
        this.amount = writable(amount);
        this.cost = writable(cost);
        this.income = writable(baseIncome);
        this.speed = speed;
        this.worldScore = worldScore;
    }
    isManaged: Writable<boolean> = writable(false);
    isRunning: Writable<boolean> = writable(false);

    private getAmount = () => {
        let amount;
        this.amount.subscribe((a) => (amount = a));
        return amount;
    };

    private getCost = () => {
        let cost;
        this.cost.subscribe((c) => (cost = c));
        return cost;
    };

    public canBuy = () => {
        let score;
        this.worldScore.subscribe((s) => (score = s));
        const cost = this.getCost();
        if (score! >= cost!) {
            return true;
        } else {
            return false;
        }
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

    public handleIsManaged = () => {
        this.isManaged.update((b) => (b = true));
    };
    public handleRun = () => {
        const amount = this.getAmount();
        const income = this.getIncome();
        const isRunning = this.getIsRunning();
        const isManaged = this.getIsManaged();
        this.isRunning.update((b) => (b = true));
        if (!isRunning) {
            setTimeout(() => {
                this.worldScore.update((v) => v + income! * amount!);
                this.isRunning.update((b) => (b = false));
                if (isManaged) {
                    this.handleRun();
                }
            }, this.speed);
        }
    };

    public handleBuy = () => {
        const cost = this.getCost();
        if (this.canBuy()) {
            this.cost.update((c) => (c = Math.trunc(c * 1.05)));
            this.amount.update((a) => (a = a + 1));
            this.worldScore.update((s) => (s = s - cost!));
        }
    };
}
