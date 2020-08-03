<script>
	import { afterUpdate } from "svelte";
	import MdKeyboardArrowLeft from "svelte-icons/md/MdKeyboardArrowLeft.svelte";
	import MdKeyboardArrowRight from "svelte-icons/md/MdKeyboardArrowRight.svelte";

	export let stepSize = 1;
	export let gap = 1;

	let element = null;
	let overflowing = false;

	let arrowClass = "w-8 h-8 flex-shrink-0 bg-secondary rounded-full";

	const isOverflowing = () => {
	  overflowing = element && element.clientWidth < element.scrollWidth;
	};

	const scroll = (n) => {
	  element.scrollLeft += n * element.firstElementChild.clientWidth;
	};

	afterUpdate(isOverflowing);
	window.addEventListener("resize", isOverflowing);
</script>

<div class="p-2 inline-flex items-center overflow-hidden">
  {#if overflowing}
  <div class="{arrowClass} mr-2" on:click={scroll.bind(null, -stepSize)}>
    <MdKeyboardArrowLeft />
  </div>
  {/if}
  <div bind:this={element} class="flex space-x-{gap} items-center overflow-hidden">
    <slot />
  </div>
  {#if overflowing}
  <div class="{arrowClass} ml-2" on:click={scroll.bind(null, +stepSize)}>
    <MdKeyboardArrowRight />
  </div>
  {/if}
</div>
