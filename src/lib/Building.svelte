<script>
    import cx from "classnames";
    import {delay, handleNumberDisplay} from "./Utils";
    import {writable} from "svelte/store";
    import ProgressBar from "./ProgressBar.svelte";
    import {ArrowUp01, InfoIcon} from "lucide-svelte";
    //@ts-ignore
    export let building;
    let {
        amount,
        cost,
        income,
        isRunning,
        isManaged,
        speed,
        canBuy,
        progress,
        description,
        nextAchievmentAt,
    } = building;
    if ($isManaged) {
        building.handleRun();
    }

    let showDescription = false;
    building.getCanBuy();
</script>

<!--<p class="text-5xl">{$speed}</p>-->
{#if $amount > 0}
<div class="bg-base-200 p-5 flex">
    <div class="flex flex-col items-center justify-center">
        <button class={cx( "hover:bg-primary bg-base-300 transition-all h-24 p-5 m-2 cursor-pointer rounded-full" ,
            $isManaged && "bg-gradient-to-r from-secondary to-primary " , $isRunning && "bg-primary pointer-events-none"
            , )} on:click={async ()=> {
            building.handleRun();
            }}
            >
            <div class="w-16 rounded-xl">
                <img src={building.image} alt={`Image of ${building.name}`} class="" />
            </div>
        </button>
        <div class="relative w-2/3">
            <div class="bg-base-300 w-full h-6 rounded">
                <div class="bg-primary h-full min-h-6 rounded" style={`width: ${($amount / $nextAchievmentAt) * 100}%`}>
                    <p class="absolute text-primary-content right-0 left-0 text-center text-[.75rem] top-1">
                        {$amount}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full">
        <div class="flex justify-between items-center pb-5">
            <div class="flex flex-col">
                <div class="flex justify-center items-center">
                    <p class="font-black text-xl lg:text-sm">
                        {building.name}
                    </p>
                    <button class="hover:text-primary transition-colors" on:click={()=>
                        (showDescription = !showDescription)}
                        >
                        <InfoIcon size="12" />
                    </button>
                </div>

                {#if showDescription}
                <p class="text-sm bg-base-100 rounded-xl p-2 italic">
                    {description}
                </p>
                {/if}
            </div>
            <div class="flex flex-col-reverse md:flex-row items-center gap-3">
                <button class={cx( "btn btn-primary " , !$canBuy && " pointer-events-none opacity-50" , )}
                    on:click={()=> {
                    building.handleBuy();
                    }}
                    ><span class="text-[.75em]">Buy:</span>
                    ${handleNumberDisplay($cost)}</button>
            </div>
        </div>
        <ProgressBar {building} />
    </div>
</div>
{:else}
<div class="bg-base-200 p-5">
    <div class="flex flex-col justify-center">
        <p class="font-black text-2xl lg:text-sm text-center">
            {building.name}
        </p>
        <button class={cx( "btn btn-primary " , !$canBuy && " pointer-events-none opacity-50" , )} on:click={()=> {
            building.handleBuy();
            }}>Unlock for ${handleNumberDisplay($cost)}</button>
    </div>
</div>
{/if}

<style>
    @keyframes myPulse {

        0%,
        100% {
            opacity: 1;
        }

        50% {
            opacity: 0.5;
        }
    }
</style>
