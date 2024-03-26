import { sentryVitePlugin } from "@sentry/vite-plugin";
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  plugins: [remixCloudflareDevProxy(), remix(), tsconfigPaths(), sentryVitePlugin({
    org: "maple-road-fae78f43a",
    project: "portfolio-remix"
  })],

  build: {
    sourcemap: true
  }
});