import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ManagerType } from "@/lib/types";

type PopupType = {
    data: ManagerType[];
    handleUpgrade: (name: string) => void;
};

function ManagersPopup({ data, handleUpgrade }: PopupType) {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>Managers</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-center underline underline-offset-2">
                    Managers
                </DialogTitle>
                <ul>
                    {data.map((manager) => {
                        return (
                            <>
                                {!manager.isPurchased && (
                                    <li className="flex justify-between items-center">
                                        <div className="">
                                            <p className="font-bold text-lg">{manager.name}</p>
                                            <p className="text-sm font-mono">
                                                Manages {manager.building} for you!
                                            </p>
                                        </div>
                                        <Button onClick={() => handleUpgrade(manager.name)}>
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
export default ManagersPopup;
