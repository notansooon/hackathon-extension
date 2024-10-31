import path from "node:path";
import { fileURLToPath } from "node:url";
import * as vite from "vite";
import * as esbuild from "esbuild";
import react from "@vitejs/plugin-react";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const extension = () => {
    const src = path.resolve(__dirname, "../src");
    const dist = path.resolve(__dirname, "../dist");

    /**
     * Create a dev server for the extension.
     */
    async function dev() {

        // Create dist folder if it doesn't exist.
        if (!existsSync(dist)) {
            mkdirSync(dist, { recursive: true });
        }

        // Create a Vite dev server for the popup.
        const server = await vite.createServer({
            configFile: false,
            root: path.resolve(src, "app"),
            plugins: [react()],
        });

        await server.listen();

        // Log Vite output.
        server.printUrls();
        server.bindCLIShortcuts({ print: true });

        // Get the url of the server.
        const appDevUrl = server.resolvedUrls?.local[0];

        /**
         * @vitejs/plugin-react injects this inline script to the index.html.
         * Chrome does not allow extensions to include inline scripts, so we write
         * it to an external js file, which we will include in the dev index.html.
         */
        const appDevHMRjs = `
            import RefreshRuntime from "${appDevUrl}@react-refresh"
            RefreshRuntime.injectIntoGlobalHook(window)
            window.$RefreshReg$ = () => {}
            window.$RefreshSig$ = () => (type) => type
            window.__vite_plugin_react_preamble_installed__ = true
        `;

        /**
         * The custom popup HTML for dev.
         * NOTE: This will need to be updated if the structure of the src index.html changes.
         */
        const appDevHtml = `
            <html>
                <head>
                    <script type="module" src="hmr.js"></script>

                    <script type="module" src="${appDevUrl}@vite/client"></script>

                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>DEV</title>
                </head>

            <body>
                <div id="root"></div>
                <script type="module" src="${appDevUrl}main.tsx"></script>
            </body>

            </html>
        `;

        // Create popup folder if it doesn't exist.
        const appDir = path.resolve(dist, "app");

        if (!existsSync(appDir)) {
            mkdirSync(appDir, { recursive: true });
        }

        // Write the custom dev dist files.
        writeFileSync(path.resolve(dist, "app/index.html"), appDevHtml);
        writeFileSync(path.resolve(dist, "app/hmr.js"), appDevHMRjs);

        // Dev the content script with esbuild.
        const context = await esbuild.context({
            entryPoints: ["src/background/index.ts"],
            bundle: true,
            outfile: path.resolve(dist, "background.js"),
            format: "esm"
        });

        context.watch();

        // Create the manifest.
        const manifest: chrome.runtime.ManifestV3 = {
            name: "Test Extension",
            version: "1",
            manifest_version: 3,
            action: {},
            background: {
                service_worker: "background.js",
            },
            permissions: ["tabs"],
            host_permissions: ["<all_urls>"],
            content_security_policy: {
                extension_pages: `script-src 'self' 'wasm-unsafe-eval' ${appDevUrl}; object-src 'self'`
            }
        };

        writeFileSync(path.resolve(dist, "manifest.json"), JSON.stringify(manifest, null, 2));
    }

    /**
     * Build the extension.
     */
    function build() {
        
    }

    return {
        dev,
        build
    }
}