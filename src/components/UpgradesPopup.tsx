import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { UpgradeType } from "@/lib/types";

type PopupType = {
    data: UpgradeType[];
    handleUpgrade: (name: string) => void;
};

function UpgradesPopup({ data, handleUpgrade }: PopupType) {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>Upgrades</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-center underline underline-offset-2">
                    Upgrades
                </DialogTitle>
                <ul>
                    {data.map((upgrade) => {
                        return (
                            <>
                                {!upgrade.isPurchased && (
                                    <li className="flex justify-between items-center">
                                        <div className="">
                                            <p className="font-bold text-lg">{upgrade.name}</p>
                                            <p className="text-sm font-mono">Cost: {upgrade.cost}</p>
                                            <p className="text-xs font-mono">
                                                increase total output of {upgrade.building} by{" "}
                                                {upgrade.multiplier}x
                                            </p>
                                        </div>
                                        <Button onClick={() => handleUpgrade(upgrade.name)}>
                                            Purchase
                                        </Button>
                                    </li>
                                )}
                            </>
                        );
                    })}
                </ul>
            </DialogContent>
        </Dialog>
    );
}
export default UpgradesPopup;
