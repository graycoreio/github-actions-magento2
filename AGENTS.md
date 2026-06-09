# AGENTS.md

## Project Overview

`github-actions-magento2` — a GitHub Actions toolkit for Magento 2 development. Provides reusable composite actions and reusable workflows that Magento module and store developers call from their own CI pipelines.

## Repository Structure

```
.github/workflows/          # Reusable workflows and internal CI workflows
_test/demo-package/         # Test fixture used by internal CI workflows
docs/                       # General documentation
other-root-level-folders    # Individual GitHub Actions (all are external/public)
```

Most actions are **composite** (bash scripts in `action.yml`). Three are **TypeScript bundled**: `supported-version`, `setup-install`, and `resolve-check-config`.

## Commands

```bash
# Run all tests
npm ci
npm test

# Run tests for a single package
cd actionName && npm test

# Build a TypeScript action (must be committed after source changes)
cd supported-version && npm run build
cd setup-install && npm run build
cd resolve-check-config && npm run build
```

Build uses `esbuild` and outputs `dist/index.js`. The `dist/` file **must be committed** — GitHub Actions runs the bundled output directly.

## Code Style

- TypeScript with strict settings
- ESLint: `eslint:recommended` + `@typescript-eslint/recommended`
- No comments unless the "why" is non-obvious
- Conventional commits

## Hard Rules (all agents)

- Never edit `CHANGELOG.md` — managed by release-please
- Never commit TypeScript source changes without also committing the rebuilt `dist/index.js`
- Never add external runtime dependencies to TypeScript actions without flagging bundle size impact
- Never call `_internal-*` workflows from external repositories

---

## @test-agent

Writes and updates Jest specs for TypeScript actions (`supported-version`, `setup-install`, `resolve-check-config`). Scope is limited to `**/*.spec.ts` files.

### Style

Test observable behavior, not implementation details. No filesystem mocks — use real temp dirs if needed. No network access.

```ts
import { validateKind } from "./validate-kinds";

describe('validateKind', () => {
    it('returns `true` if its a valid kind', () => {
        expect(validateKind("latest")).toBe(true);
    });

    it('throws a helpful exception if its an invalid kind', () => {
        expect(() => validateKind(<any>"taco")).toThrowError();
    });
});
```

### Never

- Test implementation details
- Mock the filesystem
- Write tests that require network access

---

## @supported-version-agent

Manages the Magento/Mage-OS version compatibility data in `supported-version/src/versions/`. Scope is limited to those JSON files.

### After every edit

Run `npm test` inside `supported-version/` before declaring done.

### Never

- Remove a version entry — only add or mark end-of-life
- Guess version compatibility — only use data from official Magento/Mage-OS release notes
- Edit TypeScript source in `supported-version/src/`

---

## @workflow-agent

Owns all externally-facing aspects of the repo: every root-level composite action and the three public reusable workflows (`integration.yaml`, `check-extension.yaml`, `check-store.yaml`). Changes here affect downstream callers.

### Boundaries

**Free to act** — implementation changes that do not alter the public interface (inputs, outputs, default behavior)

**Ask first** — any change to inputs, outputs, or default behavior of an external action or reusable workflow

**Never**
- Remove or rename an existing input/output without a major version bump
- Change the default value of an existing input
- Modify `_internal-*` workflows (out of scope)
- Add a runtime dependency to a TypeScript action without flagging bundle size impact
