<script>
  import {
    connected,
    connecting,
    autoConnectAtStartup
  } from "../../../stores/obs";
  import { _ } from "@/renderer/i18n";
  import Button from "../../Button.svelte";
  import MdPowerSettingsNew from "svelte-icons/md/MdPowerSettingsNew.svelte";

  function disconnect() {
    app.obs.disconnect();
  }

  function connect() {
    if ($connected || $connecting) return;
    app.obs.connect();
  }

  if ($autoConnectAtStartup) {
    connect();
  }

  $: connectingClass = $connecting ? "bg-yellow-600" : "bg-red-600";
</script>

<div class="flex space-x-2">
  {#if $connected || $connecting}
  <Button icon={MdPowerSettingsNew} iconSize={6} class={connectingClass} on:click={disconnect}>
    <span class="hidden md:inline">{_("words.disconnect")}</span>
  </Button>
  {:else}
  <Button icon={MdPowerSettingsNew} iconSize={6} class="bg-primary-darker" on:click={connect}>
    <span class="hidden md:inline">{_("words.connect")}</span>
  </Button>
  {/if}

  {#if $connecting}
  <div class="p-2 bg-primary-lighter rounded">
    <span class="animate-pulse">
      {_("sentences.waitingForConnection")}...
    </span>
  </div>
  {/if}
</div>
