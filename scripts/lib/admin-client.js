const { createClient } = require("@supabase/supabase-js");

// Env vars are not loaded here. Run scripts with Node's built-in loader:
//   node --env-file=.env.local scripts/<script>.js <input-file>
function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "Run with: node --env-file=.env.local <script> <input-file>"
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

// Paragraph breaks are stored as bare \n\n so rendering never depends on the
// line endings of whatever editor the text was written in.
function normalizeNewlines(text) {
  return text.replace(/\r\n?/g, "\n");
}

// Load an input file (.json, or a .js module exporting an array) from the CLI.
function loadInputFile(argv) {
  const file = argv[2];
  if (!file) throw new Error("Usage: node --env-file=.env.local <script> <input.json|input.js>");
  const data = require(require("path").resolve(process.cwd(), file));
  return data.default ?? data;
}

module.exports = { createAdminClient, normalizeNewlines, loadInputFile };
