const bootstrapApp = require('./app')

(async () => {
  const app = await bootstrapApp();
  app.listen(5000, () => {
    console.log("Server is running");
  });
})