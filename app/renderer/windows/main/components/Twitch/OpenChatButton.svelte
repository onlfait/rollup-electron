<script>
  import { _ } from "@/renderer/i18n";
  import TwitchIcon from '@/static/images/Twitch_Icon.svg';

  function openChatWindow() {
    app.remote.call('twitch.getMe')
    .then(me => {
      app.remote.call('twitch.openChatWindow', { channel: me['display_name'] });
    })
    .catch(err => {
      console.error('twitch.getMe', err);
    })
  }
</script>

<button class="p-2 flex items-center space-x-2 bg-purple-500" on:click={openChatWindow}>
  <TwitchIcon width="16" fill="#fefefe" />
  <div>{_('sentences.openTwitchChatWindow')}</div>
</button>
