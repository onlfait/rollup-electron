const { app } = require("electron");

function disableWebView(contents) {
  contents.on("will-attach-webview", event => {
    // eslint-disable-next-line
    console.error(
      "! The application tried to attach a new WebView.",
      "\n! This attempt was blocked."
    );
    event.preventDefault();
  });
}

// https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows
function newWindow(contents, allowed) {
  contents.on("new-window", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    // Log and prevent opening up a new window
    if (!allowed.includes(parsedUrl.origin)) {
      // eslint-disable-next-line
      console.error(
        `! The application tried to open a new window at the following address: '${navigationUrl}'.`,
        "\n! This attempt was blocked."
      );
      event.preventDefault();
    }
  });
}

// https://www.electronjs.org/docs/tutorial/security#12-disable-or-limit-navigation
function willNavigate(contents, allowed) {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    // Log and prevent the app from navigating to a new page if that page's origin is not whitelisted
    if (!allowed.includes(parsedUrl.origin)) {
      // eslint-disable-next-line
      console.error(
        `! The application tried to navigate to the following address: '${navigationUrl}'.`,
        "\n! This origin is not whitelisted and the attempt to navigate was blocked."
      );
      event.preventDefault();
    }
  });
}

function willRedirect(contents, allowed) {
  contents.on("will-redirect", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    // Log and prevent the app from redirecting to a new page
    if (!allowed.includes(parsedUrl.origin)) {
      // eslint-disable-next-line
      console.error(
        `! The application tried to redirect to the following address: '${navigationUrl}'.`,
        "\n! This attempt was blocked."
      );
      event.preventDefault();
    }
  });
}

function setWebContentsSecurity({
  contents,
  redirectOrigins = [],
  navigateOrigins = [],
  newWindowOrigins = []
} = {}) {
  disableWebView(contents);
  newWindow(contents, newWindowOrigins);
  willRedirect(contents, redirectOrigins);
  willNavigate(contents, navigateOrigins);
}

module.exports = function webContentsSecurity(options = {}) {
  app.on("web-contents-created", (event, contents) => {
    setWebContentsSecurity({ ...options, contents });
  });
};
