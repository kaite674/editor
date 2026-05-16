# Agent Instructions — `pascalorg/editor`

Public, open-source home of `@pascal-app/{core,viewer,editor,mcp}` and the standalone editor app. Consumed both as npm packages and (in `pascalorg/private-editor`) as a git submodule.

## Repo Shape

| Path | Purpose |
|---|---|
| `packages/core` | Scene graph, node schemas, stores, event bus, core systems — pure logic, no Three.js |
| `packages/viewer` | Standalone 3D canvas: renderers, viewer systems, presentation state |
| `packages/editor` | Editor UI components reused by the standalone app and embedders |
| `packages/mcp` | MCP server and scene storage adapters |
| `apps/editor` | Standalone editor app — composes `viewer` + `editor` + tools |

## Where to look

- **Architecture rules** — `wiki/architecture/` (read on demand; index in `wiki/architecture/README.md`).
- **Skills (ready workflows)** — `.agents/skills/<name>/SKILL.md`. Same content is reachable as `.claude/skills/`, `.cursor/skills/`, `.codex/skills/` (symlinks to `.agents/skills/`).
- **Repo orientation for humans** — `README.md`, `SETUP.md`, `CONTRIBUTING.md`.

`CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` are symlinks to this file. Codex reads this file directly.

## Layer Boundaries (read once, internalise)

- **`packages/core`** owns domain data and pure logic. It must not import Three.js, `packages/viewer`, `apps/editor`, rendering/UI concepts, tools, modes, phases, or view-specific concepts such as floorplan or paint preview.
- **`packages/viewer`** owns the standalone 3D canvas, renderers, viewer systems, and genuine presentation state. It must not know about `useEditor`, editor tools, phases, modes, paint mode, floorplan state, or editor-only presentation vocabulary.
- **`apps/editor`** owns the editing experience: tools, `useEditor`, panels, floorplan helpers, paint mode, keyboard shortcuts, command palette, action menus, cursor badges, and editor-only overlays. Editor features are injected into `<Viewer>` via props and children.

Details, examples, and rationale live in `wiki/architecture/layers.md`, `wiki/architecture/viewer-isolation.md`, `wiki/architecture/systems.md`, `wiki/architecture/renderers.md`, `wiki/architecture/tools.md`.

## When making architecture-sensitive changes

Read the relevant page in `wiki/architecture/` **before** writing code. The page list lives in `wiki/architecture/README.md`. As a minimum:

- Adding a node type → `node-schemas.md`, `renderers.md`, `systems.md`
- Adding a tool → `tools.md`, `spatial-queries.md`, `events.md`
- Adding a system → `systems.md`, `scene-registry.md`
- Anything in `packages/viewer` → `viewer-isolation.md`, `layers.md`
- Anything touching selection → `selection-managers.md`, `scene-registry.md`, `events.md`

## When reviewing a PR

Invoke the `review-architecture` skill (`.agents/skills/review-architecture/SKILL.md`). It loads the required architecture pages, fetches the diff, classifies each new file by layer, and reports findings grouped by severity.

## Operating rules

- Read the full file before editing. Plan all changes, then make one complete edit.
- When the user corrects you, stop and re-read their message.
- After two consecutive tool failures, stop and change approach.
- Don't introduce backwards-compatibility shims, dead code, or speculative abstractions.
- Don't write new comments unless they explain a non-obvious *why*.

## Coze Configuration

This project is configured for Coze platform deployment.

### Project Type
- **Type**: Web (Next.js 3D Editor)
- **Runtime**: Node.js 24
- **Package Manager**: pnpm (via pnpm-workspace.yaml)

### Coze Files
- **Root `.coze`**: `/workspace/projects/.coze`
- **Subproject `.coze`**: `/workspace/projects/apps/editor/.coze`

### Preview Configuration
- **Preview Enabled**: Yes
- **Dev Scripts**: `apps/editor/scripts/coze-preview-build.sh`, `apps/editor/scripts/coze-preview-run.sh`
- **Preview Port**: 5000 (IPv4: 0.0.0.0)
- **Verification**: curl returns 200, ss shows 0.0.0.0:5000

### Deploy Configuration
- **Kind**: Service
- **Flavor**: Web
- **Build Script**: `.cozeproj/scripts/deploy_build.sh`
- **Run Script**: `.cozeproj/scripts/deploy_run.sh`
- **Port**: 5000

### Workspace Adaptations
- Created `pnpm-workspace.yaml` for pnpm compatibility (original uses bun)
- Fixed local package references: `@repo/typescript-config` → `@pascal/typescript-config`, `@repo/eslint-config` → `@pascal/eslint-config`
- All workspace dependencies use `workspace:*` protocol

### Key Entry Points
- **Dev**: `pnpm exec next dev --hostname 0.0.0.0 --port 5000`
- **Build**: `pnpm exec next build`
- **Start**: `pnpm exec next start --port 5000`
