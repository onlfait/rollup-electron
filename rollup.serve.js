let server = null;

export default function serve() {
  if (server) {
    console.log(">>> KILL SERVER <<<");
  }

  server = true;

  console.log(">>> START SERVER <<<");
}
