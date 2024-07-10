<script lang="ts">
    import cx from "classnames";
    import { handleNumberDisplay } from "./Utils";
    import { Play } from "lucide-svelte";
    export let building;
    let {
        progress,
        isRunning,
        speed,
        isManaged,
        income,
        amount,
        isFast,
        countdown,
    } = building;
</script>

<div class="flex flex-col w-full">
    <div class="relative">
        <div class="bg-base-300 w-full h-full min-h-8">
            <div
                class={cx(
                    `bg-primary h-full min-h-8 transition-colors ${
                        $isFast &&
                        "animate-pulse bg-gradient-to-l from-primary to-secondary"
                    }`,
                )}
                style={!$isFast
                    ? `width:
                ${$progress}%`
                    : "width: full"}
            >
                {#if !$isManaged}
                    <p class="absolute right-3 top-1">
                        ${handleNumberDisplay($income * $amount)}
                    </p>
                {:else}
                    <p class="absolute right-3 top-1">
                        ${handleNumberDisplay(
                            +(($income * $amount) / ($speed / 1000)).toFixed(2),
                        )}
                        per second
                    </p>
                {/if}
            </div>
        </div>
        <div class="flex justify-end pt-1">
            {#if !$isFast && !$isRunning}
                <button
                    class="bg-primary p-1 rounded-sm hover:opacity-75 transition-opacity flex justify-center items-center"
                    on:click={building.handleRun()}
                >
                    <Play size="18" />
                    <span class="text-xs">Run</span>
                </button>
            {:else if !$isFast && $isRunning}
                <p class="font-mono">
                    {($countdown / 10).toFixed(1)}s
                </p>
            {/if}
        </div>
    </div>
</div>

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
