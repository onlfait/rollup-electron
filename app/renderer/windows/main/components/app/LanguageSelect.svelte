<script>
  import { language, languages } from "../../stores/app";
  import i18n, { _ } from "@/renderer/i18n";
  import Modal from "../Modal.svelte";

  let openModal = false;
  let lang = $language;

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

<select {...$$props} bind:value={$language}>
{#each $languages as lang}
  <option value={lang} disabled={lang === $language}>{lang}</option>
{/each}
</select>

{#if openModal}
<Modal>
  <div class="bg-gray-200 text-gray-800 rounded flex flex-col p-2">
    <div class="font-bold p-2">
      {_('sentences.askForAppRestart')}
    </div>
    <div class="flex p-2 space-x-2">
      <button class="uppercase bg-purple-500 p-2 rounded" on:click={restartApp}>
        {_('words.yes')}
      </button>
      <button class="uppercase bg-gray-500 p-2 rounded" on:click={closeModal}>
        {_('words.no')}
      </button>
    </div>
  </div>
</Modal>
{/if}
