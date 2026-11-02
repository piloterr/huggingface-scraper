// Hugging Face Model API – Node.js example (Node 18+, native fetch, ES module)
// Usage: PILOTERR_API_KEY=your-key node model.mjs

const params = new URLSearchParams({
  "query": "google-bert/bert-base-uncased",
});

const response = await fetch(`https://api.piloterr.com/v2/huggingface/model?${params}`, {
  headers: { "x-api-key": process.env.PILOTERR_API_KEY },
  signal: AbortSignal.timeout(120_000),
});

if (!response.ok) {
  console.error(`Piloterr error ${response.status}: ${await response.text()}`);
  process.exit(1);
}

console.log(JSON.stringify(await response.json(), null, 2));
