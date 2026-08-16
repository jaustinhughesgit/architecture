"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const schema = JSON.parse(fs.readFileSync(
  path.join(root, "contracts/canonical-substrate.v1.schema.json"),
  "utf8"
));
const examples = JSON.parse(fs.readFileSync(
  path.join(root, "contracts/examples/canonical-substrate.v1.examples.json"),
  "utf8"
));
const middleware = JSON.parse(fs.readFileSync(
  path.join(root, "contracts/entity-middleware.v1.schema.json"), "utf8"
));
const governance = JSON.parse(fs.readFileSync(
  path.join(root, "contracts/canonical-governance.v1.schema.json"), "utf8"
));

test("v1 dispatches every frozen canonical record family", () => {
  const refs = new Set(schema.oneOf.map((entry) => entry.$ref));
  for (const name of [
    "word", "entity", "address", "group", "relation", "versionRecord", "grant",
    "capability", "installation", "localMapping", "retrievalPosting", "mutation",
  ]) {
    assert.equal(refs.has(`#/$defs/${name}`), true, `missing ${name}`);
  }
});

test("examples carry the common identity, version, provenance, and lifecycle boundary", () => {
  for (const record of examples.records) {
    assert.equal(record.schemaVersion, 1);
    assert.equal(typeof record.recordType, "string");
    assert.equal(typeof record.id, "string");
    assert.equal(Number.isInteger(record.version), true);
    assert.equal(typeof record.owner?.principalId, "string");
    assert.equal(typeof record.provenance?.sourceType, "string");
    assert.equal(typeof record.lifecycle?.tombstone, "boolean");
    assert.match(record.updatedAt, /^\d{4}-\d{2}-\d{2}T/);
  }
});

test("retrieval fixtures are explicitly derived and candidate-only", () => {
  const posting = examples.records.find((record) => record.recordType === "retrieval-posting");
  assert.equal(posting.derived, true);
  assert.equal(posting.authorizationMode, "candidate-only");
  assert.equal(typeof posting.entityVersion, "number");
  assert.match(posting.contentHash, /^[a-f0-9]{64}$/);
});

test("the logical schema does not freeze current table names", () => {
  const source = JSON.stringify(schema);
  for (const physicalName of ["context_graph", "subdomains", "anchor_bands", "perm_grants"]) {
    assert.equal(source.includes(physicalName), false, physicalName);
  }
});

test("middleware v1 freezes lineage and first-response dispositions", () => {
  assert.equal(middleware.$defs.invocation.properties.contractVersion.const, 1);
  assert.equal(middleware.$defs.invocation.properties.lineage.maxItems, 64);
  assert.deepEqual(middleware.$defs.decision.properties.disposition.enum, ["pass", "respond", "fail"]);
  assert.equal(middleware.$defs.result.properties.trace.maxItems, 64);
});

test("governance v1 shares canonical actions and explicit lifecycle evidence", () => {
  assert.deepEqual(governance.$defs.action.enum, [
    "find", "read", "aggregate", "use", "set", "edit", "delete", "delegate", "publish", "govern",
  ]);
  assert.deepEqual(governance.$defs.state.enum, ["draft", "active", "deprecated", "revoked", "deleted"]);
  assert.equal(governance.$defs.lifecycleTransition.properties.expectedVersion.minimum, 1);
  assert.equal(governance.$defs.auditEvent.properties.metadata.maxProperties, 12);
});
