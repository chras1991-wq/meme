import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import JavaScriptObfuscator from "javascript-obfuscator";
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

function collectJsFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) collectJsFiles(full, out);
    else if (name.endsWith(".js")) out.push(full);
  }
  return out;
}

function obfuscateAppChunks() {
  return {
    name: "obfuscate-app-chunks",
    apply: "build",
    enforce: "post",
    closeBundle() {
      const assetsDir = join(process.cwd(), "dist", "assets");
      let files = [];
      try {
        files = collectJsFiles(assetsDir);
      } catch {
        return;
      }

      for (const file of files) {
        // Only harden application chunks — never rewrite vendor bundles.
        if (file.includes("vendor")) continue;
        const code = readFileSync(file, "utf8");

        const obfuscated = JavaScriptObfuscator.obfuscate(code, {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.6,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.2,
          debugProtection: false,
          disableConsoleOutput: true,
          identifierNamesGenerator: "hexadecimal",
          ignoreImports: true,
          renameGlobals: false,
          rotateStringArray: true,
          selfDefending: false,
          stringArray: true,
          stringArrayEncoding: ["rc4"],
          stringArrayThreshold: 0.8,
          splitStrings: true,
          splitStringsChunkLength: 8,
          transformObjectKeys: true,
          unicodeEscapeSequence: false,
        }).getObfuscatedCode();

        writeFileSync(file, obfuscated);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), obfuscateAppChunks()],
  build: {
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
