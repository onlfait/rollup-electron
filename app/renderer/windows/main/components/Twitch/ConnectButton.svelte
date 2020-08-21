<script>
  import { _ } from "@/renderer/i18n";
  import TwitchIcon from '@/static/images/Twitch_Icon.svg';

  async function loginTwitch() {
    try {
      const me = await app.remote.call('twitch.getMe');
      console.log("twitch.getMe", me);
    } catch (e) {
      console.log("twitch error:", e);
    }
  }
</script>

<button class="p-2 flex items-center space-x-2 bg-purple-500" on:click={loginTwitch}>
  <TwitchIcon width="16" fill="#fefefe" />
  <div>{_('sentences.loginTwitch')}</div>
</button>
