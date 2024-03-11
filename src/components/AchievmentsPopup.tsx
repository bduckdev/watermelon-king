import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { AchievmentType } from "@/lib/types";

type PopupType = {
    data: AchievmentType[];
};

function AchievmentsPopup({ data }: PopupType) {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>Achievments</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-center underline underline-offset-2">
                    Achievments
                </DialogTitle>
                <ul>
                    {data.map((achievment) => {
                        return (
                            <>
                                {achievment.isAchieved && (
                                    <li className="flex justify-between items-center">
                                        <div className="">
                                            <p className="font-bold text-lg">{achievment.name}</p>
                                            <p className="text-sm font-mono">
                                                increase total output by {achievment.multiplier}x
                                            </p>
                                        </div>
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
export default AchievmentsPopup;
