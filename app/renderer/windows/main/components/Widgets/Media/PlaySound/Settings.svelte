<script>
  export let widget;
  export let props;

  $: console.log("props:", props);
</script>

<div id="widget-{widget.id}">
  {widget.id}
</div>
