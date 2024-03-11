export type BuildingType = {
    name: string;
    cost: number;
    quantity: number;
    clickPower: number;
    speed: number;
    isManaged: boolean;
};

export type UpgradeType = {
    name: string;
    building: string;
    cost: number;
    multiplier: number;
    isPurchased: boolean;
};

export type AchievmentType = {
    name: string;
    building: string;
    amount: number;
    multiplier: number;
    isAchieved: boolean;
};

export type ManagerType = {
    name: string;
    cost: number;
    building: string;
    isPurchased: boolean;
};
