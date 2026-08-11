'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const execution = JSON.parse(fs.readFileSync(
  path.join(root, 'contracts/execution-envelope.v1.schema.json'), 'utf8'
));
const intent = JSON.parse(fs.readFileSync(
  path.join(root, 'contracts/intent-jurisdiction.v1.schema.json'), 'utf8'
));
const examples = JSON.parse(fs.readFileSync(
  path.join(root, 'contracts/examples/execution-envelope.v1.examples.json'), 'utf8'
));

test('execution v1 keeps all three planes and effect states explicit', () => {
  assert.deepEqual(execution.$defs.plane.enum, ['browser-main', 'file-worker', 'compute-jpl']);
  assert.deepEqual(execution.$defs.effect.properties.status.enum, ['requested', 'authorized', 'applied', 'denied']);
  assert.ok(execution.$defs.effect.properties.type.enum.includes('communication'));
  assert.ok(execution.$defs.effect.properties.type.enum.includes('navigation'));
  assert.equal(examples[0].recordType, 'execution-invocation');
  assert.equal(examples[1].recordType, 'execution-effect');
});

test('intent v1 freezes the lowest-effect and capability-evolution vocabulary', () => {
  assert.ok(intent.properties.effectClass.enum.includes('read.graph'));
  assert.ok(intent.properties.effectClass.enum.includes('repair.capability'));
  assert.ok(intent.properties.effectClass.enum.includes('fork.capability'));
  assert.ok(intent.properties.evolutionOutcome.anyOf[0].enum.includes('reuse'));
  assert.ok(intent.properties.evolutionOutcome.anyOf[0].enum.includes('repair'));
  assert.ok(intent.properties.evolutionOutcome.anyOf[0].enum.includes('fork'));
});
