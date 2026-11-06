import { describe, expect, it } from "vitest";
import { withLocale } from "./with-locale";

describe("withLocale", () => {
  it("switches the locale and keeps the rest of the path", () => {
    expect(withLocale("/ru", "en")).toBe("/en");
    expect(withLocale("/en", "ru")).toBe("/ru");
    expect(withLocale("/ru/work/task-manager", "en")).toBe(
      "/en/work/task-manager",
    );
    expect(withLocale("/en/about", "ru")).toBe("/ru/about");
  });
});
