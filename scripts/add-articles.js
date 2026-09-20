// Upserts articles into Supabase by slug, using the service role key.
//
// CLI:   node --env-file=.env.local scripts/add-articles.js articles.json
//        (input is a .json file, or a .js module exporting an array)
// Code:  const { addArticles } = require("./scripts/add-articles");
//
// Each article: { title, excerpt, content, date, slug, category, issue_number }
// Optional: cover_image. `notified` is never touched, so re-running this for an
// edition that already went out will not trigger a second digest email.
const { createAdminClient, normalizeNewlines, loadInputFile } = require("./lib/admin-client");

const CATEGORIES = [
  "El Primer Crack",
  "Segundo Crack",
  "Desarrollo",
  "Origen",
  "Radar de Impacto",
];
const REQUIRED = ["title", "excerpt", "content", "date", "slug", "category", "issue_number"];
const COLUMNS = [...REQUIRED, "cover_image"];

function validate(article, index) {
  const label = article?.slug ?? `#${index}`;
  const missing = REQUIRED.filter((k) => article?.[k] === undefined || article[k] === "");
  if (missing.length) throw new Error(`Article ${label}: missing ${missing.join(", ")}`);
  if (!CATEGORIES.includes(article.category)) {
    throw new Error(`Article ${label}: invalid category "${article.category}"`);
  }
  if (!Number.isInteger(article.issue_number)) {
    throw new Error(`Article ${label}: issue_number must be an integer`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(article.date)) {
    throw new Error(`Article ${label}: date must be YYYY-MM-DD`);
  }
}

async function addArticles(articles, supabase = createAdminClient()) {
  if (!Array.isArray(articles) || articles.length === 0) {
    throw new Error("Expected a non-empty array of articles");
  }
  // Validate everything up front so a typo in article 5 doesn't leave 1-4 half-applied.
  articles.forEach(validate);

  let failed = 0;
  for (const article of articles) {
    const row = {};
    for (const col of COLUMNS) if (article[col] !== undefined) row[col] = article[col];
    row.content = normalizeNewlines(row.content);

    const { data, error } = await supabase
      .from("articles")
      .upsert(row, { onConflict: "slug" })
      .select("slug, content");

    if (error || data?.length !== 1) {
      failed++;
      console.error(`✗ ${article.slug}:`, error ?? `expected 1 row, got ${data?.length}`);
      continue;
    }
    const paragraphs = data[0].content.split(/\n\n+/).length;
    console.log(`✓ ${article.slug} (${paragraphs} paragraphs)`);
  }
  if (failed) throw new Error(`${failed} of ${articles.length} articles failed`);
}

module.exports = { addArticles };

if (require.main === module) {
  (async () => addArticles(loadInputFile(process.argv)))().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
