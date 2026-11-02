<p align="center">
  <a href="https://www.piloterr.com"><img src="images/banner.png" alt="Hugging Face Scraper API by Piloterr – scrape Hugging Face data as JSON" width="100%"></a>
</p>

# Hugging Face Scraper API

[![Discord](https://img.shields.io/badge/Discord-Join%20the%20community-5865F2?logo=discord&logoColor=white)](https://discord.gg/CFj3ph8aHU) [![Get API key](https://img.shields.io/badge/Piloterr-Get%20a%20free%20API%20key-111827)](https://app.piloterr.com) [![API docs](https://img.shields.io/badge/Docs-OpenAPI-0EA5E9)](https://app.piloterr.com/openapi) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

The **Piloterr Hugging Face Scraper API** lets you extract public data from Hugging Face as **clean, structured JSON** — no proxies, headless browsers or HTML parsing to maintain. Endpoints available in production:

- **Hugging Face Model API** — Read one public Hugging Face model by an id such as google-bert/bert-base-uncased.
- **Hugging Face Search API** — Search the public Hugging Face models API by keyword and follow pagination.next to the next cursor page.

Use it for price monitoring, assortment tracking, competitor analysis, product research or catalog enrichment.

| Endpoint | Path | Credits | What you get |
|---|---|---|---|
| [Hugging Face Model API](#hugging-face-model-api) | `/v2/huggingface/model` | 1 | Read one public Hugging Face model by an id such as google-bert/bert-base-uncased. |
| [Hugging Face Search API](#hugging-face-search-api) | `/v2/huggingface/search` | 1 | Search the public Hugging Face models API by keyword and follow pagination.next to the next cursor page. |

## Table of contents

- [How it works](#how-it-works)
- [Hugging Face Model API](#hugging-face-model-api)
- [Hugging Face Search API](#hugging-face-search-api)
- [Code examples in other languages](#code-examples-in-other-languages)
- [Practical use cases](#practical-use-cases)
- [Why Piloterr?](#why-piloterr)
- [FAQ](#faq)
- [Related scrapers](#related-scrapers)
- [Support](#support)

## How it works

1. **Create a free Piloterr account** and copy your API key from the [dashboard](https://app.piloterr.com).
2. **Send a `GET` (or `POST`) request** to `https://api.piloterr.com/v2/...` with the header `x-api-key: YOUR_API_KEY`.
3. **Receive structured JSON** — Piloterr handles rendering, proxies, retries and parsing.

```bash
export PILOTERR_API_KEY="your-api-key"
pip install requests        # Python
# TypeScript: Node.js 18+ (native fetch), run with `npx tsx file.ts`
```

> Every endpoint accepts both `GET` (query string) and `POST` (JSON body with the same fields).

## Hugging Face Model API

Read one public Hugging Face model by an id such as google-bert/bert-base-uncased.

`GET | POST https://api.piloterr.com/v2/huggingface/model` · **1 credit per request** · [Full reference](https://app.piloterr.com/openapi)

### Request parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `query` | string | ✅ | Required. A public model id (owner/name) or a huggingface.co model URL. Reserved site paths such as models, datasets, or spaces return 400. |

### Python example

```python
import json
import os
import requests

response = requests.get(
    "https://api.piloterr.com/v2/huggingface/model",
    headers={"x-api-key": os.environ["PILOTERR_API_KEY"]},
    params={
        "query": "google-bert/bert-base-uncased",
    },
    timeout=120,
)
response.raise_for_status()
data = response.json()

print(json.dumps(data, indent=2, ensure_ascii=False)[:2000])
```

### TypeScript example

```typescript
type HuggingFaceModel = {
  id?: string;
  sha?: string;
  url?: string;
  tags?: string[];
  gated?: boolean;
  likes?: number;
  author?: string;
  license?: string;
  private?: boolean;
  datasets?: string[];
  disabled?: boolean;
  language?: string[];
  downloads?: number;
  created_at?: string;
  mask_token?: string;
  library_name?: string;
  pipeline_tag?: string;
  last_modified?: string;
  trending_score?: unknown;
};

const params = new URLSearchParams({
  "query": "google-bert/bert-base-uncased",
});

const response = await fetch(`https://api.piloterr.com/v2/huggingface/model?${params}`, {
  headers: { "x-api-key": process.env.PILOTERR_API_KEY! },
});
if (!response.ok) throw new Error(`Piloterr error ${response.status}: ${await response.text()}`);

const data = (await response.json()) as HuggingFaceModel;

console.log(JSON.stringify(data, null, 2).slice(0, 2000));
```

<details>
<summary><b>POST variant</b></summary>

```http
POST https://api.piloterr.com/v2/huggingface/model
x-api-key: YOUR_API_KEY
Content-Type: application/json

{"query": "google-bert/bert-base-uncased"}
```
</details>

### Output example

Example response from the API reference, abridged — real values depend on the page you scrape.

```json
{
  "id": "google-bert/bert-base-uncased",
  "sha": "86b5e0934494bd15c9632b12f734a8a67f723594",
  "url": "https://huggingface.co/google-bert/bert-base-uncased",
  "tags": [
    "transformers",
    "pytorch"
  ],
  "gated": false,
  "likes": 3060,
  "author": "example",
  "license": "apache-2.0",
  "private": false,
  "datasets": [
    "bookcorpus",
    "wikipedia"
  ],
  "disabled": false,
  "language": [
    "en"
  ],
  "downloads": 29160167,
  "created_at": "2022-03-02T23:29:04.000Z",
  "mask_token": "[MASK]",
  "library_name": "transformers",
  "pipeline_tag": "fill-mask",
  "last_modified": "2024-02-19T11:06:12.000Z",
  "trending_score": null
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `id` | string |  |
| `sha` | string |  |
| `url` | string |  |
| `tags` | string[] |  |
| `gated` | boolean |  |
| `likes` | integer |  |
| `author` | string |  |
| `license` | string |  |
| `private` | boolean |  |
| `datasets` | string[] |  |
| `disabled` | boolean |  |
| `language` | string[] |  |
| `downloads` | integer |  |
| `created_at` | string |  |
| `mask_token` | string |  |
| `library_name` | string |  |
| `pipeline_tag` | string |  |
| `last_modified` | string |  |
| `trending_score` | object |  |

## Hugging Face Search API

Search the public Hugging Face models API by keyword and follow pagination.next to the next cursor page.

`GET | POST https://api.piloterr.com/v2/huggingface/search` · **1 credit per request** · [Full reference](https://app.piloterr.com/openapi)

### Request parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `query` | string | ✅ | Required. A model keyword, a huggingface.co/models URL, or the full pagination.next cursor URL from a previous page. |

### Python example

```python
import json
import os
import requests

response = requests.get(
    "https://api.piloterr.com/v2/huggingface/search",
    headers={"x-api-key": os.environ["PILOTERR_API_KEY"]},
    params={
        "query": "bert",
    },
    timeout=120,
)
response.raise_for_status()
data = response.json()

print(json.dumps(data, indent=2, ensure_ascii=False)[:2000])
```

### TypeScript example

```typescript
type HuggingFaceSearch = {
  results?: {
    id?: string;
    url?: string;
    tags?: string[];
    likes?: number;
    private?: boolean;
    downloads?: number;
    created_at?: string;
    library_name?: string;
    pipeline_tag?: string;
    trending_score?: number;
  }[];
  pagination?: {
    next?: string;
    page?: number;
    per_page?: number;
    total_pages?: unknown;
    total_results?: unknown;
  };
};

const params = new URLSearchParams({
  "query": "bert",
});

const response = await fetch(`https://api.piloterr.com/v2/huggingface/search?${params}`, {
  headers: { "x-api-key": process.env.PILOTERR_API_KEY! },
});
if (!response.ok) throw new Error(`Piloterr error ${response.status}: ${await response.text()}`);

const data = (await response.json()) as HuggingFaceSearch;

console.log(JSON.stringify(data, null, 2).slice(0, 2000));
```

<details>
<summary><b>POST variant</b></summary>

```http
POST https://api.piloterr.com/v2/huggingface/search
x-api-key: YOUR_API_KEY
Content-Type: application/json

{"query": "bert"}
```
</details>

### Output example

Example response from the API reference, abridged — real values depend on the page you scrape.

```json
{
  "results": [
    {
      "id": "google-bert/bert-base-uncased",
      "url": "https://huggingface.co/google-bert/bert-base-uncased",
      "tags": [
        "transformers",
        "pytorch"
      ],
      "likes": 3060,
      "private": false,
      "downloads": 29160167,
      "created_at": "2022-03-02T23:29:04.000Z",
      "library_name": "transformers",
      "pipeline_tag": "fill-mask",
      "trending_score": 6
    }
  ],
  "pagination": {
    "next": "https://huggingface.co/api/models?search=bert&limit=20&cursor=eyIkb3IiOlt7InRyZW5kaW5nU2NvcmUiOjEsIl9pZCI6eyIkZ3QiOiI2MjFmZmRjMDM2NDY4ZDc…",
    "page": 1,
    "per_page": 20,
    "total_pages": null,
    "total_results": null
  }
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `results[]` | object[] |  |
| `results[].id` | string |  |
| `results[].url` | string |  |
| `results[].tags` | string[] |  |
| `results[].likes` | integer |  |
| `results[].private` | boolean |  |
| `results[].downloads` | integer |  |
| `results[].created_at` | string |  |
| `results[].library_name` | string |  |
| `results[].pipeline_tag` | string |  |
| `results[].trending_score` | integer |  |
| `pagination` | object |  |
| `pagination.next` | string |  |
| `pagination.page` | integer |  |
| `pagination.per_page` | integer |  |
| `pagination.total_pages` | object |  |
| `pagination.total_results` | object |  |

## Code examples in other languages

Ready-to-run examples live in the [`examples/`](examples) folder. Each one reads your key from the `PILOTERR_API_KEY` environment variable.

| Language | Model | Search |
|---|---|---|
| cURL (Bash) | [`model`](examples/curl/model.sh) | [`search`](examples/curl/search.sh) |
| PHP | [`model`](examples/php/model.php) | [`search`](examples/php/search.php) |
| C# | [`model`](examples/csharp/Model.cs) | [`search`](examples/csharp/Search.cs) |
| Go | [`model`](examples/go/model.go) | [`search`](examples/go/search.go) |
| Java | [`model`](examples/java/ModelExample.java) | [`search`](examples/java/SearchExample.java) |
| Ruby | [`model`](examples/ruby/model.rb) | [`search`](examples/ruby/search.rb) |
| Node.js | [`model`](examples/nodejs/model.mjs) | [`search`](examples/nodejs/search.mjs) |

## Practical use cases

- **Price monitoring** — Track prices, promotions and availability over time to react to competitors.
- **Assortment & catalog tracking** — Follow new products, delisted items and category changes.
- **Competitor analysis** — Benchmark ranges, brands and positioning across retailers.
- **Product research** — Spot best-sellers and trends from search results.
- **Catalog enrichment** — Pull titles, images and attributes into your PIM or marketplace listings.

## Why Piloterr?

- **No infrastructure** — no proxies, headless browsers or CAPTCHA solving to run yourself.
- **Structured JSON** — stable, documented fields instead of brittle HTML selectors.
- **Pay per request** — transparent credit cost per endpoint, failed requests are retried for you.
- **One API key, hundreds of sources** — Hugging Face plus many other e-commerce, search and company data endpoints in the [Piloterr library](https://www.piloterr.com/library).
- **Any language** — plain HTTPS + JSON, with examples for Python, TypeScript, cURL, PHP, C#, Go, Java, Ruby and Node.js.

## FAQ

### Is it legal to scrape Hugging Face?

Collecting publicly available data is generally allowed in many jurisdictions, but rules depend on your country, the data you collect and how you use it. Avoid personal data unless you have a lawful basis, respect the website's terms where they apply, and get legal advice for your specific use case. This is not legal advice.

### Do I need proxies or a headless browser?

No. Piloterr handles rendering, proxy rotation and retries on its side. You only send an HTTPS request with your `x-api-key` header and receive JSON.

### How much does a request cost?

Credits per call: `/v2/huggingface/model` **1**, `/v2/huggingface/search` **1**. See the [Piloterr website](https://www.piloterr.com) for plans.

### What data does the Hugging Face API return?

Each endpoint returns structured JSON: **Hugging Face Model** — `id`, `sha`, `url`, `tags`, `gated`, `likes`; **Hugging Face Search** — `results[]`, `results[].id`, `results[].url`, `results[].tags`, `results[].likes`, `results[].private`.

### Which languages are supported?

Any language that can make an HTTP request. This README shows Python and TypeScript; the [`examples/`](examples) folder contains cURL, PHP, C#, Go, Java, Ruby and Node.js.

## Related scrapers

- [About You Scraper API](https://github.com/piloterr/aboutyou-scraper)
- [Action Scraper API](https://github.com/piloterr/action-scraper)
- [Aldi Scraper API](https://github.com/piloterr/aldi-scraper)
- [Alibaba Scraper API](https://github.com/piloterr/alibaba-scraper)
- [AliExpress Scraper API](https://github.com/piloterr/aliexpress-scraper)
- [Allegro Scraper API](https://github.com/piloterr/allegro-scraper)
- [All Piloterr scrapers on GitHub](https://github.com/piloterr)

## Support

- 💬 Join the [Piloterr Discord](https://discord.gg/CFj3ph8aHU) to ask questions and share what you build.
- 📚 Browse the [API reference (OpenAPI)](https://app.piloterr.com/openapi) and the [Piloterr library](https://www.piloterr.com/library).
- 🔑 [Get your API key](https://app.piloterr.com).

---

<p align="center">
  <a href="https://www.piloterr.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="images/logo-dark.svg">
      <img src="images/logo.svg" alt="Piloterr" height="32">
    </picture>
  </a>
  <br>
  <sub>Built by <a href="https://www.piloterr.com">Piloterr</a> — web scraping APIs for e-commerce, search, real estate and more, one API key.</sub>
</p>

<sub>Hugging Face is a trademark of its respective owner. This repository is not affiliated with or endorsed by Hugging Face. Examples are released under the MIT license.</sub>
