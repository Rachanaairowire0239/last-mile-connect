import { defineConfig } from "@lovable.dev/vite-tanstack-config";
var stdin_default = defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.js (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server.js" }
  }
});
export {
  stdin_default as default
};
