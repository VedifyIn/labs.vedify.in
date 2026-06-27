#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

COMBOS=(
  "3001:polished:dark"
  "3002:polished:light"
  "3003:terminal:dark"
  "3004:terminal:light"
  "3005:bento:dark"
  "3006:bento:light"
)

echo "Generating data…"
node scripts/generate-data.mjs

echo ""
echo "Starting 6 demo instances on ports 3001–3006…"
echo ""
for combo in "${COMBOS[@]}"; do
  IFS=':' read -r port view theme <<< "$combo"
  echo "  :$port → view=$view  theme=$theme"
  DEMO_VIEW="$view" DEMO_THEME="$theme" npx next dev --port "$port" &
done

echo ""
echo "All 6 started. Open URLs:"
echo "  http://localhost:3001  (polished · dark)"
echo "  http://localhost:3002  (polished · light)"
echo "  http://localhost:3003  (terminal · dark)"
echo "  http://localhost:3004  (terminal · light)"
echo "  http://localhost:3005  (bento · dark)"
echo "  http://localhost:3006  (bento · light)"
echo ""
echo "Press Ctrl+C to stop all."
trap 'kill $(jobs -p) 2>/dev/null; exit 0' INT TERM
wait
