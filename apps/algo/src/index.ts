import { validatedEnv } from "./constants";
import { app } from "./graphql";
import { createStartupMenu } from "./menu";
app.listen(Number(validatedEnv.PORT), () => {
  createStartupMenu();
});

export default app;
