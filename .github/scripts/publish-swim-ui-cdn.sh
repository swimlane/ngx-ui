#!/bin/bash

# Script to publish swim-ui CDN build to S3 with semantic versioning support
# Usage: ./publish-swim-ui-cdn.sh <s3-bucket-name> <source-directory>

set -e

S3_BUCKET="${1:-sw-widgets-cloud-production-us-west-2}"
SOURCE_DIR="${2:-projects/swimlane/swim-ui/dist-cdn}"
CDN_PREFIX="swim-ui"

# Derive package.json from source dir (parent of dist-cdn)
PACKAGE_JSON="$(dirname "$SOURCE_DIR")/package.json"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: Source directory not found: $SOURCE_DIR"
  exit 1
fi

if [ ! -f "$PACKAGE_JSON" ]; then
  echo "Error: package.json not found at $PACKAGE_JSON"
  exit 1
fi

version=$(node -p "require('$PACKAGE_JSON').version" 2>/dev/null || echo "")
if [ -z "$version" ]; then
  echo "Error: No version found in $PACKAGE_JSON"
  exit 1
fi

# Parse version into major, minor, patch
if [[ ! $version =~ ^([0-9]+)\.([0-9]+)\.([0-9]+) ]]; then
  echo "Error: Invalid version format '$version' (expected semver, e.g. 1.0.0)"
  exit 1
fi
major="${BASH_REMATCH[1]}"
minor="${BASH_REMATCH[2]}"
patch="${BASH_REMATCH[3]}"

echo "Publishing swim-ui from $SOURCE_DIR to s3://$S3_BUCKET/$CDN_PREFIX/ (v$version)..."

total_files=0
total_uploads=0

for source_file in "$SOURCE_DIR"/*; do
  if [ -f "$source_file" ]; then
    file_name=$(basename "$source_file")
    total_files=$((total_files + 1))
    echo ""
    echo "  Uploading $file_name..."

    # Upload to latest (unversioned)
    aws s3 cp "$source_file" "s3://$S3_BUCKET/$CDN_PREFIX/$file_name" --quiet
    echo "    ✓ $CDN_PREFIX/$file_name (latest)"
    total_uploads=$((total_uploads + 1))

    # Upload to major version
    aws s3 cp "$source_file" "s3://$S3_BUCKET/$CDN_PREFIX/$major/$file_name" --quiet
    echo "    ✓ $CDN_PREFIX/$major/$file_name"
    total_uploads=$((total_uploads + 1))

    # Upload to major.minor version
    aws s3 cp "$source_file" "s3://$S3_BUCKET/$CDN_PREFIX/$major.$minor/$file_name" --quiet
    echo "    ✓ $CDN_PREFIX/$major.$minor/$file_name"
    total_uploads=$((total_uploads + 1))

    # Upload to exact version
    aws s3 cp "$source_file" "s3://$S3_BUCKET/$CDN_PREFIX/$major.$minor.$patch/$file_name" --quiet
    echo "    ✓ $CDN_PREFIX/$major.$minor.$patch/$file_name"
    total_uploads=$((total_uploads + 1))
  fi
done

# Trigger CloudFront invalidation
touch .invalidate
aws s3 cp .invalidate "s3://$S3_BUCKET/.invalidate" --quiet

echo ""
echo "=========================================="
echo "Upload Summary:"
echo "  Version: $version"
echo "  Files uploaded: $total_files"
echo "  Total S3 uploads: $total_uploads"
echo "=========================================="
echo "✓ swim-ui CDN publishing complete!"
