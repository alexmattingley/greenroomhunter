#!/usr/bin/env bash
# Scaffold a new feature spec from the templates.
# Usage: .cursor/skills/spec-process/scripts/scaffold.sh <block>-<feature-slug>
set -euo pipefail

name="${1:-}"
if [[ -z "$name" ]]; then
  echo "Usage: $0 <block>-<feature-slug>  (kebab-case, e.g. tide-mobile-carousel)" >&2
  exit 1
fi

if [[ ! "$name" =~ ^[a-z0-9]+(-[a-z0-9]+)+$ ]]; then
  echo "Error: '$name' should be kebab-case with at least a <block>-<feature> shape," >&2
  echo "       e.g. tide-mobile-carousel or buoy-swell-breakdown." >&2
  exit 1
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
templates_dir="$script_dir/../templates"
repo_root="$(git -C "$script_dir" rev-parse --show-toplevel)"
target="$repo_root/specs/$name"

if [[ -d "$target" ]]; then
  echo "Error: $target already exists — refusing to overwrite." >&2
  exit 1
fi

mkdir -p "$target"
cp "$templates_dir/"*.md "$target/"

echo "Created spec: specs/$name/"
ls -1 "$target" | sed 's/^/  - /'
echo
echo "Next: read the constitution, then fill README → 01 → 02 → 03 → 04 → 06,"
echo "logging decisions in 05-decisions.md as you go."
