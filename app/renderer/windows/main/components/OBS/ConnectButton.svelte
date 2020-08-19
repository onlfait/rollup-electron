<script>
  import { connecting, connected, autoConnectAtStartup } from "../../stores/obs";
  import { _ } from "../../../../i18n"

  function connect() {
    if ($connected || $connecting) return;
    app.obs.connect();
  }

  function disconnect() {
    if (!$connected) return;
    app.obs.disconnect();
  }

  if ($autoConnectAtStartup) {
    connect();
  }
</script>

{#if !$connected}
<button {...$$props} disabled={$connecting} on:click={connect}>{_('words.connect')}</button>
{:else}
<button {...$$props} on:click={disconnect}>{_('words.disconnect')}</button>
{/if}
