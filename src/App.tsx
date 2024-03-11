import { useState } from "react";
import Building from "@/components/Building";
import UpgradesPopup from "./components/UpgradesPopup";
import ManagersPopup from "./components/ManagersPopup";
import {
    BuildingType,
    UpgradeType,
    ManagerType,
    AchievmentType,
} from "./lib/types";
import AchievmentsPopup from "./components/AchievmentsPopup";
import AchievmentAlert from "./components/AchievmentAlert";

const buildingsArr: BuildingType[] = [
    {
        name: "Watermelon Garden",
        cost: 1,
        quantity: 1,
        clickPower: 1,
        speed: 2500,
        isManaged: false,
    },
    {
        name: "Watermelon Farm",
        cost: 5,
        quantity: 0,
        clickPower: 5,
        speed: 5000,
        isManaged: false,
    },
    {
        name: "Watermelon Factory",
        cost: 25,
        quantity: 0,
        clickPower: 25,
        speed: 10000,
        isManaged: false,
    },
    {
        name: "Watermelon Workforce",
        cost: 50,
        quantity: 0,
        clickPower: 50,
        speed: 15000,
        isManaged: false,
    },
    {
        name: "Wage Slavery",
        cost: 100,
        quantity: 0,
        clickPower: 100,
        speed: 20000,
        isManaged: false,
    },
    {
        name: "Total Domination",
        cost: 250,
        quantity: 0,
        clickPower: 250,
        speed: 45000,
        isManaged: false,
    },
];
const upgradesArr: UpgradeType[] = [
    {
        name: "Improved Equipment",
        cost: 50,
        building: "Watermelon Garden",
        multiplier: 2,
        isPurchased: false,
    },
    {
        name: "Hire Farmers",
        cost: 150,
        building: "Watermelon Farm",
        multiplier: 2,
        isPurchased: false,
    },
    {
        name: "Embrace OSHA Standards",
        cost: 500,
        building: "Watermelon Factory",
        multiplier: 2,
        isPurchased: false,
    },
];

const managersArr: ManagerType[] = [
    {
        name: "John Managerson",
        cost: 100,
        building: "Watermelon Garden",
        isPurchased: false,
    },
];
const achievmentsArr: AchievmentType[] = [
    {
        name: "nice achievment bro",
        building: "Watermelon Garden",
        amount: 25,
        multiplier: 2,
        isAchieved: false,
    },
    {
        name: "nicer achievment bro",
        building: "Watermelon Farm",
        amount: 25,
        multiplier: 2,
        isAchieved: false,
    },
];

function App() {
    const [score, setScore] = useState(5000);
    const [buildings, setBuildings] = useState(buildingsArr);
    const [upgrades, setUpgrades] = useState(upgradesArr);
    const [managers, setManagers] = useState(managersArr);
    const [achievments, setAchievments] = useState(achievmentsArr);

    function incScore(amount: number) {
        setScore(score + amount);
    }
    function buyBuilding(name: string) {
        const newBuildings = buildings.map((building) => {
            if (building.name === name) {
                if (building.cost <= score) {
                    setScore(score - building.cost);
                    building.quantity = building.quantity + 1;
                    building.cost = building.cost * 1.15;
                    checkAchievments(building);
                    return building;
                }
                return building;
            } else {
                return building;
            }
        });
        setBuildings(newBuildings);
    }
    function handleUpgrade(name: string) {
        const newUpgrades = upgrades.map((upgrade) => {
            if (upgrade.name === name) {
                if (upgrade.cost <= score) {
                    setScore(score - upgrade.cost);
                    upgrade.isPurchased = true;
                    const newBuildings = buildings.map((building) => {
                        if (building.name === upgrade.building) {
                            building.clickPower = building.clickPower * upgrade.multiplier;
                            return building;
                        } else {
                            return building;
                        }
                    });
                    setBuildings(newBuildings);
                    return upgrade;
                }
                return upgrade;
            } else {
                return upgrade;
            }
        });
        setUpgrades(newUpgrades);
    }
    function handleManager(name: string) {
        const newManagers = managers.map((manager) => {
            if (manager.name === name) {
                if (manager.cost <= score) {
                    setScore(score - manager.cost);
                    manager.isPurchased = true;
                    const newBuildings = buildings.map((building) => {
                        if (building.name === manager.building) {
                            building.isManaged = true;
                            return building;
                        } else {
                            return building;
                        }
                    });
                    setBuildings(newBuildings);
                    return manager;
                }
                return manager;
            } else {
                return manager;
            }
        });
        setManagers(newManagers);
    }
    function checkAchievments(building: BuildingType) {
        const newAchievments = achievments.map((achievment) => {
            if (achievment.building === building.name) {
                if (building.quantity >= achievment.amount) {
                    achievment.isAchieved = true;
                    building.speed = building.speed / achievment.multiplier;
                    return achievment;
                }
                return achievment;
            } else {
                return achievment;
            }
        });
        setAchievments(newAchievments);
    }

    return (
        <>
            <header>
                <h1 className="text-5xl font-bold text-center py-5">
                    Watermelon King 🍉
                </h1>
            </header>
            <main>
                <p className="text-3xl font-black text-center p-5  rounded-xl">
                    ${Math.round(score)}
                </p>
                <div className="flex w-full justify-center p-3 gap-3">
                    <UpgradesPopup data={upgrades} handleUpgrade={handleUpgrade} />
                    <ManagersPopup data={managers} handleUpgrade={handleManager} />
                    <AchievmentsPopup data={achievments} />
                </div>
                <section className="grid sm:grid-cols-1 md:grid-cols-3 grid-rows-3 grid-flow-dense gap-3 p-3">
                    {buildings.map((building) => (
                        <Building
                            key={building.name}
                            quantity={building.quantity}
                            cost={Math.round(building.cost)}
                            name={building.name}
                            incScore={incScore}
                            buyBuilding={buyBuilding}
                            clickPower={building.clickPower}
                            isManaged={building.isManaged}
                            speed={building.speed}
                        />
                    ))}
                </section>
            </main>
        </>
    );
}
export default App;
