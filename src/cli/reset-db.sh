#!/usr/bin/env bash
set -euo pipefail

PS3="Choose an option: "
select action in "Reset Database" "Quit"; do
  case "$REPLY" in
  1)
    bun ./src/db/reset-db.ts
    bun run db:migrate
    bun run db:seed
    break
    ;;
  2)
    exit 0
    ;;
  *)
  echo "Invalid choice."
  ;;
    esac
  done