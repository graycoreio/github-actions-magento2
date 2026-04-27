# What belongs in a composite action

A composite action should do one thing. The guiding test: **can a caller reasonably want to skip part of what this action does, independently of the rest?** If yes, those parts should be separate actions that the caller composes themselves.

## Good fits for a composite action

**A single tool installation paired with its execution.** Install the tool, run it, done. `coding-standard` installs PHPCS and runs it. `fix-magento-install` applies a known set of patches. The install and the run are not independently useful — splitting them would add complexity with no benefit.

**A utility that extracts and exposes a single value.** `get-composer-version`, `get-magento-version`, and `semver-compare` each run one or two commands and write an output. These exist because their output is needed inline by the next step in the same job. That is the right scope for a composite action.

**A setup operation with a well-defined end state.** `cache-magento` leaves the Composer cache populated. `setup-magento` leaves a Magento project at a known path. The caller gets a clear postcondition and nothing else.

## Signs an action is too broad

**It bundles independent setup concerns with execution.** Imagine a `unit-test` action that sets up PHP, installs Composer dependencies, and then runs the test command. These three things can each be wanted or skipped independently. A caller whose job already has PHP set up cannot avoid step 1. A caller that wants to run tests against already-installed dependencies cannot avoid step 2.

The right scope is just the execution step:

```yaml
inputs:
  test_command:
    required: true
    default: composer run test
  source_folder:
    required: true
    default: .

runs:
  using: composite
  steps:
    - run: ${{ inputs.test_command }}
      shell: bash
      working-directory: ${{ inputs.source_folder }}
```

The caller is then responsible for composing `setup-php`, `cache-magento`, and `composer install` before calling it — each of which is already a separate action in this repo.

**It reimplements logic that already exists in another action.** If a new action rolls its own Composer caching inline rather than calling `cache-magento`, that creates two different cache key strategies in the same repo and makes it harder to update caching behavior consistently.

**The name describes a pipeline, not a step.** Names like "install and test" or "build and deploy" are warning signs. A good action name describes what state it produces or what it checks — not a sequence of operations.