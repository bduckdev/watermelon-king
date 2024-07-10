<script>
    import cx from "classnames";
    import { X } from "lucide-svelte";
    let isActive = false;
    export let buttonText = "Open Modal";
    export let modalHeading = "My Modal";
    export let buttonClass = "";

    function handleModalOpen() {
        return (isActive = true);
    }
    function handleModalClose() {
        return (isActive = false);
    }
    export let score = 0;
    export let showScore = false;
</script>

<button
    on:click={handleModalOpen}
    class={cx(
        "btn btn-primary w-full h-full text-[.5em] max-w-16 max-h-16",
        buttonClass,
    )}>{buttonText}</button
>
{#if isActive}
    <div
        class={cx(
            "h-screen w-screen bg-[rgba(0,0,0,0.25)] fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-30 transition-opacity duration-[2500ms] opacity-0",
            isActive ? "opacity-100 visible" : "hidden",
        )}
    >
        <div
            class="relative bg-white p-5 lg:rounded-xl w-[85vw] lg:w-1/2 h-screen lg:h-auto"
        >
            <button
                class="absolute right-[0rem] top-[0rem] lg:top-[-1.5rem]"
                on:click={handleModalClose}
            >
                <X
                    size="24"
                    class="text-secondary-content hover:text-secondary transition-all"
                />
            </button>
            <div class="flex flex-col justify-between pb-5">
                <p class="text-xl font-black">{modalHeading}</p>
                {#if showScore}
                    <p class="text-xl font-black text-primary">${score}</p>
                {/if}
            </div>
            <slot></slot>
        </div>
    </div>
{/if}
