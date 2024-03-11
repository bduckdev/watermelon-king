import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Trophy } from "lucide-react";
import { AchievmentType } from "@/lib/types";

function AchievmentAlert(achievment: AchievmentType) {
    return (
        <Alert>
            <Trophy className="h-4 w-4" />
            <AlertTitle className="font-bold">Achievment Unlocked</AlertTitle>
            <AlertDescription>{achievment.name}</AlertDescription>
        </Alert>
    );
}

export default AchievmentAlert;
