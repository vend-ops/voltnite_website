import assert from "node:assert/strict";
import test from "node:test";
import { validateContact } from "./contact.ts";

const valid = { name: "Sam Example", email: "sam@example.com", company: "", details: "We need an IoT controller for a connected machine." };

test("accepts and trims a valid enquiry with an optional company", () => {
  const result = validateContact({ ...valid, name: "  Sam Example  " });
  assert.deepEqual(result.errors, {});
  assert.equal(result.fields.name, valid.name);
});

test("rejects malformed payloads without throwing", () => {
  for (const input of [null, undefined, [], 1, "text", { name: {}, email: [], details: true }]) {
    assert.deepEqual(Object.keys(validateContact(input).errors).sort(), ["details", "email", "name"]);
  }
});

test("rejects invalid email, short descriptions and excessive field lengths", () => {
  const { errors } = validateContact({ name: "n".repeat(101), email: "sam@", company: "c".repeat(151), details: "short" });
  assert.equal(Object.keys(errors).length, 4);
  assert.ok(validateContact({ ...valid, details: "x".repeat(5001) }).errors.details);
  assert.ok(validateContact({ ...valid, email: `${"x".repeat(250)}@example.com` }).errors.email);
});
