<script>
	import { afterUpdate } from "svelte";
	import Button from "./Button.svelte";

	import MdKeyboardArrowLeft from "svelte-icons/md/MdKeyboardArrowLeft.svelte";
	import MdKeyboardArrowRight from "svelte-icons/md/MdKeyboardArrowRight.svelte";

	import anime from "animejs";

	export let gap = 1;

	let element = null;
	let overflowing = false;

	let arrowClass = "bg-primary-light rounded-full";

	const isOverflowing = () => {
	  overflowing = element && element.clientWidth < element.scrollWidth;
	};

	export const scrollTo = (scrollLeft) => {
	  anime({
	    scrollLeft,
	    duration: 500,
	    targets: element,
	    easing: "easeInOutQuad"
	  });
	};

	const scroll = (n) => {
		console.log("scroll", n);
	  scrollTo(element.scrollLeft + n * element.clientWidth);
	};

	export const scrollLeft = () => {
	  scrollTo(0);
	};

	export const scrollRight = () => {
	  scrollTo(element.scrollWidth);
	};

	afterUpdate(isOverflowing);
	window.addEventListener("resize", isOverflowing);
</script>

<div class="p-2 inline-flex items-center overflow-hidden">
  {#if overflowing}
	<Button icon={MdKeyboardArrowLeft} on:click={scroll.bind(null, -1)} class="mr-2 {arrowClass}" />
  {/if}
  <div bind:this={element} class="flex space-x-{gap} items-center overflow-hidden">
    <slot />
  </div>
  {#if overflowing}
	<Button icon={MdKeyboardArrowRight} on:click={scroll.bind(null, +1)} class="ml-2 {arrowClass}" />
  {/if}
</div>
