function uncaughtError(event) {
  let error = event.error || event.reason;
  const origin = event.reason ? "unhandledRejection" : "uncaughtException";

  if (!(error instanceof Error)) {
    error = new Error(error);
  }

  let { name, message, stack } = error;

  app.remote.call("app.uncaughtError", {
    origin,
    error: { name, message, stack }
  });
}

window.addEventListener("error", uncaughtError);
window.addEventListener("unhandledrejection", uncaughtError);
