# USE Web Modal Validator Plugin Frontend: use-validator web-gui

Web GUI for use-validator plugin

### Main GUI development environment setup

```
cd use-vite-frontend/use-vite-main
pnpm install
```

Run this command to start development:

```
pnpm run dev
```

Open browser: http://localhost:3000

### Build main GUI

```
pnpm run build
```

Copy `use-vite-frontend/use-vite-main/dist` to `use-backend/src/main/resources/html`

# Plugins

```
cd use-vite-frontend/use-vite-plugin-validator
pnpm install
```

## Development environment setup

**Requirement**: Need to run backend first

### Develop existing plugins

In this document, we will develop existing `use-vite-plugin-validator`

#### Install the required dependencies:

```
cd use-vite-frontend/use-vite-plugin-validator
pnpm install
```

Run up to 4 terminals below:

#### Terminal 1:

Run this terminal to dev with `use-main` web-ui

This command will re-build client code anytime you make change to the code.

```
cd use-vite-frontend/use-vite-main && pnpm run hot
```

#### Terminal 2:

Run this terminal to start `use-main` web-ui and dev plugin-web-ui (port 4000)

```
cd use-vite-frontend/use-vite-main && pnpm run preview
```

#### Terminal 3:

Run this terminal to dev `use-validator` plugin-web-ui

This command will re-build client code anytime you make change to the code.

```
cd use-vite-frontend/use-vite-plugin-validator && pnpm run hot
```

#### Terminal 4:

Run this terminal to serving `use-validator` plugin-web-ui (port 4001) to `use-main` web-ui

```
cd use-vite-frontend/use-vite-plugin-validator && pnpm run preview
```

After opening 4 terminals, open browser: http://localhost:4000 to start using `use-main` web-ui

### Create new plugins

#### Setup new project

Copy `use-vite-plugin-validator` as template for your extension. Remove all files under `src` except `App.tsx`
and `main.tsx`.

Use `App.tsx` as your entry component to start development.

Open `use-vite-frontend/use-vite-plugin-<your_plugin_name>/vite.config.ts`.
Edit plugin name under `federation({name})` and server port, preview port

```
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "use-plugin-<your_plugin_name>",
    
    server: {
        port: 3002,
    },
    preview: {
        port: 4002,
    },

```

#### Enable dev plugins in use-vite-main

Open `use-vite-frontend/use-vite-main/vite.config.ts`. Add under `remotes` object (just uncomment the line)

```
remotes: {
        DevPlugin: "http://localhost:4002/assets/use-plugin.js",
        dummy: "dummy.js",
      },
```

In the example above, plugin preview port is `4002` (port defined in `vite.config.ts`
of `use-vite-plugin-<your_plugin_name>`)

Open `use-vite-frontend/use-vite-main/src/AppModalContents.tsx`

Add import to `DevPlugin` component (just uncomment the line)

```
const DevPlugin = lazy(() => import("DevPlugin/Plugin"));

export function ModalContents() {
```

Use the `DevPlugin` component (just uncomment these lines)

```
{view.pluginDev.map((diaId) => (
    <DraggableModal
        key={diaId}
        id={diaId}
        open
        closable
        mask={false}
        maskClosable={false}
        width={"90%"}
        onCancel={() => {
            // @ts-ignore
            dispatch(closeModal({name: "pluginDev", id: diaId}));
        }
        }
        footer={null}
        title={<div>Dev plugin GUI</div>}
    >
        <DevPlugin/>
    </DraggableModal>
))}
```

Open `use-vite-frontend/use-vite-main/src/NavMenu.tsx`

Add button to trigger plugin (just uncomment these lines)

```
<Button
        icon={<FunctionOutlined/>}
    onClick={() => {
    // @ts-ignore
    dispatch(addModal({name: "pluginDev", id: crypto.randomUUID()}))
    }}
    >
    Dev plugin
</Button>
```

Open browser: http://localhost:4000 and click `Dev plugin` button to test your plugin GUI.

**NOTE**: After finish plugin development, you can safely re-comment all lines that you uncommented at the previous
steps.

### Build plugin

```
pnpm run build
```

Copy `use-vite-frontend/use-vite-plugin-<your_plugin_name>/dist` to `use-<your_plugin_name>/resources/html`

Eg: Copy `use-vite-frontend/use-vite-plugin-validator/dist` to `use-validator/resources/html`