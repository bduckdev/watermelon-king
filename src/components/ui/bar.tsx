import * as ProgressPrimitive from "@radix-ui/react-progress";
import "./progbar.css";
function Bar({ value, duration }: { value: number; duration: number }) {
    return (
        <>
            <ProgressPrimitive.Root
                className={
                    "relative h-4 w-full overflow-hidden rounded-full bg-secondary"
                }
            >
                <ProgressPrimitive.Indicator
                    className="h-full w-full flex-1 bg-primary transition-all progbar"
                    style={{
                        //transform: `translateX(-${100 - (value || 0)}%)`,
                        width: `${value}%`,
                        transition: `width ${duration}ms`,
                    }}
                />
            </ProgressPrimitive.Root>
        </>
    );
}
export default Bar;
