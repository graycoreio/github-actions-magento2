---
name: new-versions
description: Check magento/magento2 for newly published tags and add any missing entries to supported-version/src/versions/magento-open-source/{individual,composite}.json using Adobe's system requirements docs. Use when user wants to refresh Magento Open Source version data, mentions "new versions", or asks to check for new Magento releases.
---

Refresh the Magento Open Source version data in this repo by adding any tags that have shipped recently but are not yet recorded.

## 1. Find new tags

List tags from `magento/magento2` via the GitHub API:

```
gh api -X GET repos/magento/magento2/tags --paginate -q '.[].name' | head -50
```

Focus on tags from the last several weeks. Tags look like `2.4.8-p4`, `2.4.7-p9`, etc. Ignore preview/RC tags unless the user asks otherwise.

For each candidate tag, get its publish date (needed for the `release` field):

```
gh api repos/magento/magento2/git/refs/tags/<tag> -q '.object.url' | xargs -I{} gh api {} -q '.tagger.date // .author.date'
```

## 2. Diff against the JSON files

The two files to check:

- `supported-version/src/versions/magento-open-source/individual.json` — one entry per concrete tag, keyed `magento/project-community-edition:<tag>`
- `supported-version/src/versions/magento-open-source/composite.json` — range entries keyed `magento/project-community-edition:>=X.Y.Z <X.Y.(Z+1)`, plus the rolling entries `magento/project-community-edition` and `magento/project-community-edition:next`

A tag is "missing" if the `magento/project-community-edition:<tag>` key is absent from `individual.json`.

## 3. Fetch system requirements

For the minor version that the missing tag belongs to (e.g. `2.4.8` for `2.4.8-p4`), pull Adobe's system requirements page:

- https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/system-requirements

Use `WebFetch` and extract: PHP, Composer, MySQL/MariaDB, Elasticsearch/OpenSearch, RabbitMQ, Redis/Valkey, Varnish, Nginx, supported OS. If a component (e.g. `elasticsearch`) is no longer listed for that minor version, omit the field from the new entry — do not carry it over from the previous patch. Compare the new entry against the most recent prior patch in `individual.json` to sanity-check which fields should be present.

For each service field, pin the **latest currently-published tag within the line Adobe lists**, derived from Docker Hub — not whatever the prior patch happened to carry.

- Adobe lists a major+minor (e.g. "Elasticsearch 8.19"): use the highest published `8.19.x` tag.
- Adobe lists only a major (e.g. "Elasticsearch 8"): use the highest published `8.y.z` across all `8.x` minors (today: `8.19.15`).
- Adobe lists multiple majors/lines (e.g. "OpenSearch 2.19, 3"): pick the newest line (`3`).

Query Docker Hub for the latest patch:

```
curl -s "https://hub.docker.com/v2/repositories/library/elasticsearch/tags?page_size=100&name=8.19" \
  | python3 -c "import json,sys; d=json.load(sys.stdin); tags=[t['name'] for t in d['results'] if t['name'].startswith('8.19.') and t['name'].split('.')[2].isdigit()]; print(max(tags, key=lambda t:[int(x) for x in t.split('.')]))"
```

For OpenSearch swap `library/elasticsearch` → `opensearchproject/opensearch`. Services already using rolling minor tags (`redis:7.2`, `varnish:7.7`, `nginx:1.28`, `rabbitmq:4.1-management`) are already "latest of the line" and need no bump.

Also fetch Adobe's lifecycle policy page for the line's EOL date:

- https://experienceleague.adobe.com/en/docs/commerce-operations/release/planning/lifecycle-policy

## 4. Write the entries

### individual.json

Append the new patch entry preserving file ordering (group by minor version, ascending patch number). Schema:

```json
"magento/project-community-edition:<tag>": {
    "magento": "magento/project-community-edition:<tag>",
    "php": <number>,
    "composer": "<string>",
    "mysql": "mysql:<ver>" | "mariadb:<ver>",
    "opensearch": "opensearchproject/opensearch:<ver>",
    "elasticsearch": "elasticsearch:<ver>",
    "rabbitmq": "rabbitmq:<ver>-management",
    "redis": "redis:<ver>",
    "valkey": "valkey/valkey:<ver>",
    "varnish": "varnish:<ver>",
    "nginx": "nginx:<ver>",
    "os": "ubuntu-latest",
    "release": "<ISO8601 from tag date>",
    "eol": "<ISO8601 — see EOL rules below>"
}
```

### EOL rules

- The newest patch on a line gets `eol` set to the line's EOL date from Adobe's lifecycle policy page.
- When a newer patch on the same line releases, overwrite the previous patch's `eol` with the newer patch's `release` date. So when adding a new patch, also update the prior patch's `eol` accordingly.
- Net effect: at any moment only the latest patch on a line carries the line's lifecycle EOL; every older patch's `eol` equals the release date of its successor.

### composite.json

The composite range entry for the affected minor (e.g. `magento/project-community-edition:>=2.4.8 <2.4.9`) should reflect the highest patch's stack. Update its fields to match the new entry if the new tag is now the highest in that minor.

The rolling entries `magento/project-community-edition` and `magento/project-community-edition:next` must always mirror the system requirements of the highest tag across all minors (i.e. the absolute newest patch you just added, if it is the newest overall). Update PHP, Composer, MySQL, OpenSearch, RabbitMQ, Valkey, Varnish, Nginx, OS, release, eol on both. The `magento` field on `:next` stays `magento/project-community-edition:@alpha`.

## 5. Verify

After edits:

```
cd supported-version && npm test
```

All tests must pass before declaring done.

## Notes

- Do not remove existing entries — only add or update.
- Use the tag's actual publish timestamp from the GitHub API for `release`, not today's date.
- If Adobe's docs are ambiguous for a given component, ask the user before guessing.
- Preserve the file's existing key ordering and indentation (4 spaces).
