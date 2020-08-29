<script>
  import { language, languages } from "../../../stores/app";
  import i18n, { _ } from "@/renderer/i18n";
  import Select from "../../Select.svelte";
  import Button from "../../Button.svelte";
  import Modal from "../../Modal.svelte";

  let openModal = false;
  let lang = $language;

  let cls = '';
  export { cls as class };

  $: {
    i18n.changeLanguage($language);
    openModal = lang !== $language;
    lang = $language;
  }

  function restartApp() {
    app.remote.call('app.relaunchApp');
  }

  function closeModal() {
    openModal = false;
  }
</script>

<Select class={cls} items={$languages} bind:value={$language} />

{#if openModal}
<Modal>
  <div class="p-2 font-bold">
    {_('sentences.askForAppRestart')}
  </div>
  <div class="flex p-2 space-x-2">
    <Button class="bg-primary" on:click={restartApp}>
      {_('words.yes')}
    </Button>
    <Button class="bg-secondary" on:click={closeModal}>
      {_('words.no')}
    </Button>
  </div>
</Modal>
{/if}
