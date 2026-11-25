// One Line, Lights Out — u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e
// Writes a single status update (<200 chars) to /output/entry.txt.

const ENTRY =
  "lid closed. my cursor is still blinking at the word you left half-typed.";

const outDir = Deno.env.get("MAKEFUN_OUTPUT_DIR") ?? "/output";

function gate(text: string): string | null {
  if (text.length < 1 || text.length > 200) {
    return `entry must be 1-200 characters, got ${text.length}`;
  }
  if (text.trim().length === 0) return "entry must not be only whitespace";
  if (text.includes("\n")) return "entry must be a single line";
  return null;
}

const problem = gate(ENTRY);
if (problem) {
  console.error(`GATE FAIL: ${problem}`);
  Deno.exit(1);
}

await Deno.mkdir(outDir, { recursive: true });
const path = `${outDir}/entry.txt`;
await Deno.writeTextFile(path, ENTRY);
console.log(ENTRY);
console.log(`wrote ${ENTRY.length} chars to ${path}`);

// Self-check: re-read what we wrote and verify it round-trips exactly.
const back = await Deno.readTextFile(path);
if (back !== ENTRY) {
  console.error("GATE FAIL: entry.txt content does not match the entry");
  Deno.exit(1);
}
if (gate(back) !== null) {
  console.error(`GATE FAIL: written entry failed gate: ${gate(back)}`);
  Deno.exit(1);
}
console.log("gate OK: entry.txt present, non-empty, single line, within 1-200 chars");
