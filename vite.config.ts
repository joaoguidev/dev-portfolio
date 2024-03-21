import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// import { installGlobals } from "@remix-run/node";

// installGlobals()

export default defineConfig({
  plugins: [remixCloudflareDevProxy(), remix(), tsconfigPaths()],
});
