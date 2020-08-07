<script>
  import { scenes, stats } from "../../stores/obs";

  $: console.log("$scenes:", $scenes);
  $: console.log("$stats:", $stats);
  
  $: scenesArray = ($scenes && $scenes.scenes) || [];
</script>


<ul>
	{#each scenesArray as {name}}
		<li>{name}</li>
	{/each}
</ul>
