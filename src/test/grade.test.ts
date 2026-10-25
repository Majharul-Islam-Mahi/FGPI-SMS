import { describe, expect, it } from "vitest";
import { gradeFor } from "@/lib/store";

describe("gradeFor (BTEB scale)", () => {
  it("80+ is A+ / 4.00", () => expect(gradeFor(80)).toEqual({ grade: "A+", gp: 4 }));
  it("60 is B / 3.00", () => expect(gradeFor(60)).toEqual({ grade: "B", gp: 3 }));
  it("40 is D / 2.00", () => expect(gradeFor(40)).toEqual({ grade: "D", gp: 2 }));
  it("below 40 fails", () => expect(gradeFor(39)).toEqual({ grade: "F", gp: 0 }));
});