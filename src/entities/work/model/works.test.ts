import { describe, expect, it } from "vitest";
import { workCopyHasInventedMetrics, works } from "./works";

describe("works", () => {
  it("publishes three commercial drafts and one public project", () => {
    expect(works).toHaveLength(4);
    expect(new Set(works.map((work) => work.slug)).size).toBe(4);

    const commercial = works.filter((work) => work.type === "commercial");
    expect(commercial).toHaveLength(3);
    for (const work of commercial) {
      expect(work.draft).toBe(true);
      expect(work.media).toEqual([]);
      expect(work.links).toEqual({});
      expect(work.title.ru.trim().length).toBeGreaterThan(0);
      expect(work.title.en.trim().length).toBeGreaterThan(0);
      expect(work.task.en.trim().length).toBeGreaterThan(0);
      expect(work.done.ru.trim().length).toBeGreaterThan(0);
      expect(workCopyHasInventedMetrics(work)).toBe(false);
    }

    const dream = works.find((work) => work.slug === "dream-anime");
    expect(dream?.type).toBe("public");
    expect(dream?.draft).toBe(false);
    expect(dream?.year).toBe("2025");
    expect(dream?.media).toEqual([]);
    expect(dream?.links.demo).toBe("https://dream-anime-frontend.vercel.app");
    expect(dream?.links.github).toBe(
      "https://github.com/Leladatan/dream-anime-frontend",
    );
    expect(dream ? workCopyHasInventedMetrics(dream) : true).toBe(false);
  });

  it("does not publish a phone number or mailbox", () => {
    const blob = JSON.stringify(works);
    expect(blob).not.toContain("7774197");
    expect(blob).not.toContain("@");
  });
});
