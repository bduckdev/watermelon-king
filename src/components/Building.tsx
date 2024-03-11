import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Bar from "@/components/ui/bar";

type BuildingPropsType = {
    name: string;
    quantity: number;
    cost: number;
    incScore: (amount: number) => void;
    buyBuilding: (name: string) => void;
    clickPower: number;
    speed: number;
    isManaged: boolean;
};

function Building({
    name,
    quantity,
    cost,
    buyBuilding,
    incScore,
    clickPower,
    speed,
    isManaged,
}: BuildingPropsType) {
    const [bar, setBar] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [internalDuration, setInternalDuration] = useState(speed);

    function clickMachine() {
        if (isRunning) {
            return;
        } else {
            setInternalDuration(speed);
            setIsRunning(true);
            setBar(100);
            setTimeout(function f() {
                incScore(clickPower * quantity);
                setIsRunning(false);
                setBar(0);
                setInternalDuration(0);
            }, speed);
        }
    }
    //useEffect(() => {
    //    if (isManaged) {
    //        clickMachine();
    //    }
    //}, [isManaged, clickMachine]);
    return (
        <>
            <Card className="w-full p-5">
                <CardContent>
                    <div className="pb-5 w-full flex items-center justify-between">
                        <CardTitle className="text-xl">{name}</CardTitle>
                        {/*<Progress className="px-5 rounded-md" value={bar} />*/}
                        <div className="gap-2 flex items-center">
                            <p>{quantity}</p>
                            <Button onClick={() => buyBuilding(name)}>{cost}🪙</Button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {quantity > 0 && (
                            <>
                                <Bar value={bar} duration={internalDuration} />
                                {clickPower * quantity}
                            </>
                        )}
                        {!isManaged && quantity > 0 && (
                            <Button onClick={() => clickMachine()}>▶️</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default Building;
