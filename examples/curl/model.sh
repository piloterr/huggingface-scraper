#!/usr/bin/env bash
# Hugging Face Model API – cURL example
# Usage: PILOTERR_API_KEY=your-key ./model.sh
set -euo pipefail

curl -sS --fail-with-body -G "https://api.piloterr.com/v2/huggingface/model" \
  -H "x-api-key: ${PILOTERR_API_KEY}" \
  --data-urlencode query=google-bert/bert-base-uncased
