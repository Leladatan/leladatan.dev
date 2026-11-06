import { describe, expect, it } from "vitest";
import { workCopyHasInventedMetrics, works } from "./works";

describe("works", () => {
  it("publishes three commercial drafts without media or invented metrics", () => {
    expect(works).toHaveLength(3);
    expect(new Set(works.map((work) => work.slug)).size).toBe(3);

    for (const work of works) {
      expect(work.type).toBe("commercial");
      expect(work.draft).toBe(true);
      expect(work.media).toEqual([]);
      expect(work.links).toEqual({});
      expect(work.title.ru.trim().length).toBeGreaterThan(0);
      expect(work.title.en.trim().length).toBeGreaterThan(0);
      expect(work.task.en.trim().length).toBeGreaterThan(0);
      expect(work.done.ru.trim().length).toBeGreaterThan(0);
      expect(workCopyHasInventedMetrics(work)).toBe(false);
    }
  });

  it("does not publish a phone number or mailbox", () => {
    const blob = JSON.stringify(works);
    expect(blob).not.toContain("7774197");
    expect(blob).not.toContain("@");
  });
});
