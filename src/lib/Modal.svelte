<script>
    import cx from "classnames";
    import {X} from "lucide-svelte";
    let isActive = true;
    export let buttonText = "Open Modal";
    export let modalHeading = "My Modal";

    function handleModalButton() {
        return (isActive = !isActive);
    }
</script>

<button on:click={handleModalButton}>{buttonText}</button>
{#if isActive}
<div class={cx( "h-screen w-screen bg-[rgba(0,0,0,0.25)] fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-30 transition-opacity duration-[2500ms] opacity-0"
    , isActive ? "opacity-100 visible" : "hidden" , )}>
    <div class="relative bg-white p-5 rounded-xl w-1/2">
        <button class="absolute right-[0rem] top-[-1.5rem]" on:click={handleModalButton}>
            <X size="24" class="text-secondary-content hover:text-secondary transition-all" />
        </button>
        <p class="text-xl font-black">{modalHeading}</p>
        <slot></slot>
    </div>
</div>
{/if}
