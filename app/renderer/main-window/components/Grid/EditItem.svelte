<script>
  import { items, editItem } from "../../stores/grid";
  import FileInput from "../FileInput.svelte";
  import ColorPicker from "../ColorPicker.svelte";
  import SettingsPage from "../SettingsPage.svelte";
  import Button from "../Button.svelte";

  $: icon = $editItem && $editItem.icon && $editItem.icon.name;

  function updateItem(item) {
    $editItem = {...$editItem, ...item };
    $items = $items.map(i => (i.id === item.id) ? $editItem : i);
  }

  async function onImage(event) {
    let { name, path } = event.detail;
    name = await remote.addGridIcon({ name, path });
    updateItem({ icon: { name, path } });
  }

  function onColor(event) {
    let { hex } = event.detail;
    updateItem({ color: hex });
  }

  function close() {
    $editItem = null;
  }
</script>

<SettingsPage>
  <div slot="left">
    Menu...
  </div>
  <div slot="right">
    Settings...<br />
      Settings...<br />
        Settings...<br />
          Settings...<br />
            Settings...<br />
              Settings...<br />
                Settings...<br />
                  Settings...<br />
                    Settings...<br />
                      Settings...<br />
                        Settings...<br />
                          Settings...<br />
                            Settings...<br />
                              Settings...<br />
                                Settings...<br />
                                  Settings...<br />
                                    Settings...<br />
                                      Settings...<br />
                                        Settings...<br />
                                          Settings...<br />
                                            Settings...<br />
                                              Settings...<br />
                                                Settings...<br />
                                                  Settings...<br />
                                                    Settings...<br />
                                                      Settings...<br />
                                                        Settings...<br />
                                                          Settings...<br />
                                                            Settings...<br />
                                                              Settings...<br />
                                                                Settings...<br />
                                                                  Settings...<br />
  </div>
</SettingsPage>
