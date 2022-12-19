import { createServer } from "node:http";
import { App, createNodeMiddleware } from "octokit";
import "dotenv/config";

const { APP_ID, PRIVATE_KEY, SECRET } = process.env;

const app = new App({
  appId: APP_ID as string,
  privateKey: PRIVATE_KEY as string,
  webhooks: { secret: SECRET as string },
});

app.webhooks.on("issues.opened", ({ octokit, payload }) => {
  console.log(payload);
});

// Your app can now receive webhook events at `/api/github/webhooks`
createServer(createNodeMiddleware(app)).listen(3000);
