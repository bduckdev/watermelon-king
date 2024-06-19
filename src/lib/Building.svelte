<script>
    import cx from "classnames";
    export let building;
    let {amount, cost, income, isRunning, isManaged} = building;
    if ($isManaged) {
        building.handleRun();
    }
</script>

<div class="bg-base-200 p-5">
    <div class="flex justify-between items-center">
        <div class="flex items-center">
            <button class={cx( "hover:bg-primary transition-all p-5 m-2 cursor-pointer rounded-xl" , $isManaged
                && "bg-primary" , )} on:click={building.handleRun}>
                <div class="w-16 rounded-xl">
                    <img src={building.image} alt={`Image of ${building.name}`} class="" />
                </div>
            </button>
            <p class="font-black text-2xl lg:text-sm">
                {building.name}
            </p>
        </div>
        <div class="flex items-center gap-3">
            <p class="font-black">{$amount}</p>
            <button class="btn btn-primary" on:click={building.handleBuy}>Buy: ${$cost}</button>
        </div>
    </div>
    <div class="relative">
        <div class="w-full bg-base-300 h-full min-h-8 flex">
            <div class={cx( `h-full min-h-8 transition-all `, $isRunning ? `w-full bg-primary
                duration-[${building.speed}ms]` : "duration-0 w-0 bg-secondary" , )}></div>
            <p class="absolute right-3 top-1">${$income * $amount}</p>
        </div>
    </div>
</div>
