"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = JSON.parse(fs.readFileSync(
  path.join(__dirname, "../contracts/test-system-reset.v1.schema.json"),
  "utf8"
));

test("test reset v1 exposes only explicit canonical mode", () => {
  assert.equal(schema.$defs.request.properties.mode.const, "canonical");
  assert.equal(schema.$defs.request.required.includes("testEnvironmentId"), true);
  assert.equal(schema.$defs.request.additionalProperties, false);
});

test("test reset v1 reports ordered legacy and canonical phases", () => {
  const required = schema.$defs.result.required;
  assert.equal(required.includes("legacyPurge"), true);
  assert.equal(required.includes("canonicalReset"), true);
  assert.equal(schema.$defs.status.properties.legacyPurgeRequired.type.includes("boolean"), true);
  assert.equal(schema.$defs.result.properties.contractVersion.const, 1);
  assert.equal(schema.$defs.result.properties.alert.enum.includes("pending"), true);
  assert.equal(required.includes("progress"), true);
  assert.equal(schema.$defs.progress.properties.completedUnits.minimum, 0);
});
