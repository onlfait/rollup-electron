console.log("Livereload enabled");

process.send("Hi from renderer");

process.on("message", msg => {
  console.log("<<<", msg);
});
