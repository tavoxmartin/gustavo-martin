// Upserts per-edition intro/closing copy into the editions table by
// issue_number, using the service role key.
//
// CLI:   node --env-file=.env.local scripts/add-edition-text.js editions.json
//        (input is a .json file, or a .js module exporting an array)
// Code:  const { addEditionText } = require("./scripts/add-edition-text");
//
// Each entry: { issue_number, intro_text?, closing_text? }
// A field you omit is left untouched; pass null to clear it.
const { createAdminClient, normalizeNewlines, loadInputFile } = require("./lib/admin-client");

const TEXT_FIELDS = ["intro_text", "closing_text"];

function validate(edition, index) {
  const label = edition?.issue_number ?? `#${index}`;
  if (!Number.isInteger(edition?.issue_number)) {
    throw new Error(`Edition ${label}: issue_number must be an integer`);
  }
  if (!TEXT_FIELDS.some((f) => edition[f] !== undefined)) {
    throw new Error(`Edition ${label}: provide intro_text and/or closing_text`);
  }
}

async function addEditionText(editions, supabase = createAdminClient()) {
  if (!Array.isArray(editions) || editions.length === 0) {
    throw new Error("Expected a non-empty array of editions");
  }
  editions.forEach(validate);

  let failed = 0;
  for (const edition of editions) {
    const row = { issue_number: edition.issue_number };
    for (const field of TEXT_FIELDS) {
      if (edition[field] !== undefined) {
        row[field] = edition[field] === null ? null : normalizeNewlines(edition[field]);
      }
    }

    const { data, error } = await supabase
      .from("editions")
      .upsert(row, { onConflict: "issue_number" })
      .select("issue_number");

    if (error || data?.length !== 1) {
      failed++;
      console.error(`✗ edition ${edition.issue_number}:`, error ?? `expected 1 row, got ${data?.length}`);
      continue;
    }
    console.log(`✓ edition ${edition.issue_number} (${Object.keys(row).slice(1).join(", ")})`);
  }
  if (failed) throw new Error(`${failed} of ${editions.length} editions failed`);
}

module.exports = { addEditionText };

if (require.main === module) {
  (async () => addEditionText(loadInputFile(process.argv)))().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
