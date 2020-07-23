function uncaughtError(event) {
  let error = event.error || event.reason;
  const origin = event.reason ? "unhandledRejection" : "uncaughtException";

  if (!(error instanceof Error)) {
    error = new Error(error);
  }

  let { name, message, stack } = error;

  remote.uncaughtError({ error: { name, message, stack }, origin });
}

if (!__isDev__) {
  window.addEventListener("error", uncaughtError);
  window.addEventListener("unhandledrejection", uncaughtError);
}
