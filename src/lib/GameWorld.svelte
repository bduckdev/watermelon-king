<script lang="ts">
    import cx from "classnames";
    import Building from "./Building.svelte";
    import {handleNumberDisplay, numberWithCommas} from "./Utils";
    import {writable} from "svelte/store";
    //@ts-ignore
    export let world;
    let {score, amountToBuy} = world;

    //@ts-ignore
    function handleAmountToBuyClick(x) {
        amountToBuy.update(() => x);
        //@ts-ignore
        for (let i = 0; i < world.buildings.length; i++) {
            //@ts-ignore
            world.buildings[i].getCanBuy();
            //@ts-ignore
            world.buildings[i].getCost();
            //@ts-ignore
            console.log("gameworld", world.buildings[i].getCost());
            //@ts-ignore
            console.log("gameworld canbuy5", world.buildings[i].getCanBuy(500));
        }
    }
</script>

<div class="flex justify-evenly py-2 mx-8">
    <p class="pt-2 pb-5 text-3xl font-black text-primary">
        ${handleNumberDisplay(+$score)}
    </p>
    <!--
    <div class="">
        <div class="flex justify-evenly gap-3">
            <button class={cx( "btn btn-primary text-[.5em] md:font-thin md:text-[1.5em]" , $amountToBuy !=1
                && "btn-outline" , )} on:click={()=> {
                handleAmountToBuyClick(1);
                }}
                >
                x1</button>
            <button class={cx( "btn btn-primary text-[.5em]  md:font-thin md:text-[1.5em]" , $amountToBuy !=5
                && "btn-outline" , )} on:click={()=> {
                handleAmountToBuyClick(5);
                }}
                >
                x5</button>
            <button class={cx( "btn btn-primary text-[.5em]  md:font-thin  md:text-[1.5em]" , $amountToBuy !=25
                && "btn-outline" , )} on:click={()=> {
                handleAmountToBuyClick(25);
                }}
                >
                x25</button>
            <button class={cx( "btn btn-primary text-[.5em]   md:font-thin md:text-[1.5em]" , $amountToBuy !=100
                && "btn-outline" , )} on:click={()=> {
                handleAmountToBuyClick(100);
                }}
                >
                x100</button>
        </div>
    </div>
    -->
</div>
<div class="grid grid-cols-1 overflow-hidden lg:grid-cols-2 mx-0 md:mx-8 gap-5">
    {#each world.buildings as building}
    <Building {building} />
    {/each}
</div>
