# swim-ui CDN Publishing

## Overview

This document describes how to publish the swim-ui CDN build to S3 with semantic versioning support. The output of the `build:cdn` npm script in the swim-ui project is uploaded to the same CDN bucket used for widgets.

## Script

### publish-swim-ui-cdn.sh

Uploads the swim-ui CDN build (e.g. `projects/swimlane/swim-ui/dist-cdn`) to S3 under the `swim-ui/` prefix with semver paths.

**Usage:**
```bash
./publish-swim-ui-cdn.sh <s3-bucket-name> <source-directory>
```

**Parameters:**
- `s3-bucket-name`: The S3 bucket to upload to (default: `sw-widgets-cloud-production-us-west-2`)
- `source-directory`: The directory containing the CDN build output (default: `projects/swimlane/swim-ui/dist-cdn`)

**How it works:**

1. Reads the version from `package.json` in the parent of the source directory (i.e. `projects/swimlane/swim-ui/package.json`).
2. Parses the semantic version (e.g., `1.0.0` → major: `1`, minor: `0`, patch: `0`).
3. For each file in the source directory, uploads to:
   - `swim-ui/{file}` (latest/unversioned)
   - `swim-ui/{major}/{file}` (major version lock)
   - `swim-ui/{major}.{minor}/{file}` (minor version lock)
   - `swim-ui/{major}.{minor}.{patch}/{file}` (exact version)
4. Triggers CloudFront invalidation by uploading `.invalidate` to the bucket (same as widget publishing).

**Example:**

For swim-ui version `1.0.0` with files `swim-ui.js`, `button.js`, `styles.js`, the script uploads each to:
- `swim-ui/swim-ui.js` (latest)
- `swim-ui/1/swim-ui.js`
- `swim-ui/1.0/swim-ui.js`
- `swim-ui/1.0.0/swim-ui.js` (exact version)
(and similarly for every other file in dist-cdn.)

## GitHub Actions workflow

The publishing script is run by the workflow [.github/workflows/publish-swim-ui-cdn.yml](../workflows/publish-swim-ui-cdn.yml).

**Trigger:** Manual only (`workflow_dispatch`). Run it from the Actions tab when you want to publish a new swim-ui version to the CDN.

**Steps:**
1. Checkout, setup Node/Yarn, install dependencies
2. Build swim-ui CDN: `cd projects/swimlane/swim-ui && npm run copy:icon-font && npm run build:cdn`
3. Configure AWS credentials (uses `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` repo secrets)
4. Run `publish-swim-ui-cdn.sh` with the default bucket and source directory

**Requirements:** The repository must have AWS credentials configured (e.g. `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) in GitHub secrets with permission to write to the S3 bucket and trigger invalidation.

## Import patterns (for consumers)

- **Latest:** `https://<cdn-domain>/swim-ui/swim-ui.js`
- **Exact version:** `https://<cdn-domain>/swim-ui/1.0.0/swim-ui.js`
- **Minor lock:** `https://<cdn-domain>/swim-ui/1.0/swim-ui.js`
- **Major lock:** `https://<cdn-domain>/swim-ui/1/swim-ui.js`

## Building the CDN output locally

From the repository root:

```bash
cd projects/swimlane/swim-ui && npm run copy:icon-font && npm run build:cdn
```

Output is written to `projects/swimlane/swim-ui/dist-cdn/` (e.g. `swim-ui.js`, `button.js`, `styles.js`, and other component bundles).

## Troubleshooting

- **Invalid version:** Ensure `projects/swimlane/swim-ui/package.json` has a valid semver `version` field (e.g. `1.0.0`).
- **Source directory not found:** Run the swim-ui CDN build first so `dist-cdn` exists.
- **AWS errors:** Verify AWS credentials and IAM permissions for S3 write and (if applicable) CloudFront invalidation.
