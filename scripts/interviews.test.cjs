const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const test = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

const filename = path.resolve("components/interviews/InterviewWrittenContent.tsx");
const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
});
const componentModule = new Module(filename, module);
componentModule.filename = filename;
componentModule.paths = Module._nodeModulePaths(path.dirname(filename));
componentModule._compile(compiled.outputText, filename);
const Content = componentModule.exports.default;
const render = (interview) => renderToStaticMarkup(React.createElement(Content, { interview }));

test("renders the new Sanity body and preserves its paragraph breaks", () => {
  const html = render({ body: "Πρώτη παράγραφος.\n\nΔεύτερη παράγραφος." });
  assert.ok(html.includes("Πρώτη παράγραφος.\n\nΔεύτερη παράγραφος."));
  assert.ok(html.includes("whitespace-pre-line"));
});

test("renders the central quote even without a written interview", () => {
  const html = render({ quote: "Δεν ακούμε μουσική. Την καταναλώνουμε." });
  assert.match(html, /<blockquote[^>]*>/);
  assert.ok(html.includes("Δεν ακούμε μουσική. Την καταναλώνουμε."));
});

test("renders introduction without requiring body or legacy questions", () => {
  assert.ok(render({ introduction: "Η εισαγωγή" }).includes("Η εισαγωγή"));
});

test("keeps old questions visible and gives the new body precedence", () => {
  const questions = [{ question: "Παλιά ερώτηση;", answer: "Παλιά απάντηση." }];
  const legacy = render({ questions });
  assert.ok(legacy.includes("Παλιά ερώτηση;"));
  assert.ok(legacy.includes("Παλιά απάντηση."));
  const updated = render({ body: "Νέο κείμενο", questions });
  assert.ok(updated.includes("Νέο κείμενο"));
  assert.ok(!updated.includes("Παλιά ερώτηση;"));
});

test("renders all written fields together and escapes HTML", () => {
  const html = render({ introduction: "Εισαγωγή", body: '<script>alert("x")</script>', quote: "Απόσπασμα" });
  assert.ok(html.includes("Εισαγωγή"));
  assert.ok(html.includes("Απόσπασμα"));
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(!html.includes("<script>"));
});

test("omits an empty section and ignores incomplete old questions", () => {
  assert.equal(render({ body: "  ", introduction: "\n", quote: " ", questions: [{ question: "Ερώτηση", answer: " " }] }), "");
});

test("passes the new body and quote from the Sanity query through to the page", async () => {
  const filename = path.resolve("lib/interviews-data.ts");
  const rows = [{
    id: "8ffd9902-3c55-46b4-b759-323597fb277f",
    slug: { current: "dimitris-mystakidis-den-akoyme-moysiki-tin-katanalonoyme" },
    title: "Δημήτρης Μυστακίδης", date: "2026-11-20", published: true,
    body: "  Κυρίως θέμα\n\nΔεύτερη παράγραφος  ",
    quote: "  Κεντρικό απόσπασμα  ", introduction: "Εισαγωγή", excerpt: "Περίληψη",
  }];
  const dataModule = new Module(filename, module);
  dataModule.filename = filename;
  dataModule.paths = Module._nodeModulePaths(path.dirname(filename));
  dataModule.require = (id) => {
    if (id === "server-only") return {};
    if (id === "next-sanity") return { defineQuery: (query) => query };
    if (id === "@/components/content/interviews") return { interviews: [] };
    if (id === "@/lib/sanity") return { sanityClient: { fetch: async (query) => {
      assert.match(query, /\bbody\s*,/);
      assert.match(query, /\bquote\s*,/);
      return rows;
    } } };
    return require(id);
  };
  dataModule._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, filename);
  const [interview] = await dataModule.exports.getInterviews();
  assert.equal(interview.id, rows[0].slug.current);
  assert.equal(interview.body, "Κυρίως θέμα\n\nΔεύτερη παράγραφος");
  assert.equal(interview.quote, "Κεντρικό απόσπασμα");
  assert.deepEqual(interview.formats, ["qa"]);
  const html = render(interview);
  assert.ok(html.includes("Κυρίως θέμα"));
  assert.ok(html.includes("Κεντρικό απόσπασμα"));
});
