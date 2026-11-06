import { describe, expect, it } from "vitest";
import { messages } from "./messages";

function leafKeys(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") return [prefix];
  if (!value || typeof value !== "object") return [prefix];
  return Object.entries(value).flatMap(([key, nested]) =>
    leafKeys(nested, prefix ? `${prefix}.${key}` : key),
  );
}

describe("messages", () => {
  it("uses the same keys in Russian and English", () => {
    expect(leafKeys(messages.ru).sort()).toEqual(leafKeys(messages.en).sort());
  });

  it("keeps every line filled in", () => {
    for (const key of leafKeys(messages.ru)) {
      const read = (locale: "ru" | "en") =>
        key.split(".").reduce<unknown>((node, part) => {
          if (!node || typeof node !== "object") return undefined;
          return (node as Record<string, unknown>)[part];
        }, messages[locale]);
      expect(read("ru")).toEqual(expect.any(String));
      expect(read("en")).toEqual(expect.any(String));
      expect(String(read("ru")).trim().length).toBeGreaterThan(0);
      expect(String(read("en")).trim().length).toBeGreaterThan(0);
    }
  });
});
