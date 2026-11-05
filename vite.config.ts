import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    nitro() // ⬅️ Vercel ডেপ্লয়ের জন্য এটি যোগ করা হলো
  ],
  tanstackStart: {
    server: { entry: "server" },
  },
});