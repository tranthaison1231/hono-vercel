import { Hono } from "hono";
import { handle } from "hono/vercel";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/");

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.get("/apple-app-site-association", async (c) => {
  console.log(c.req.header());
  return c.json({
    applinks: {
      apps: [],
      details: [
        {
          appID: "PBJWXJYNVL.au.com.acciona.linkedsite.dev",
          paths: ["NOT /_/*", "/*"],
        },
      ],
    },
    webcredentials: {
      apps: ["PBJWXJYNVL.au.com.acciona.linkedsite.dev"],
    },
  });
});

export default handle(app);
