import {
  applyDiscount,
  formatToman,
  parsePrice,
  toEnglishDigits,
  toPersianDigits,
} from "@/lib/price";

describe("toEnglishDigits", () => {
  it("converts Persian digits to their ASCII equivalents", () => {
    expect(toEnglishDigits("۱۷۴۰۰۰")).toBe("174000");
  });

  it("leaves non-digit characters untouched", () => {
    expect(toEnglishDigits("۱۷۴,۰۰۰ تومان")).toBe("174,000 تومان");
  });

  it("is a no-op for strings that are already ASCII", () => {
    expect(toEnglishDigits("174000")).toBe("174000");
  });
});

describe("toPersianDigits", () => {
  it("converts ASCII digits to Persian digits", () => {
    expect(toPersianDigits("174000")).toBe("۱۷۴۰۰۰");
  });
});

describe("parsePrice", () => {
  it("parses a Persian-formatted price string with comma separators", () => {
    expect(parsePrice("۱۷۴,۰۰۰")).toBe(174000);
  });

  it("parses a plain ASCII price string", () => {
    expect(parsePrice("174000")).toBe(174000);
  });

  it("strips Persian thousands separators (٬)", () => {
    expect(parsePrice("۶۰۰٬۰۰۰")).toBe(600000);
  });

  it("returns 0 for null, undefined, or empty input", () => {
    expect(parsePrice(null)).toBe(0);
    expect(parsePrice(undefined)).toBe(0);
    expect(parsePrice("")).toBe(0);
  });

  it("returns 0 for unparsable input instead of NaN", () => {
    expect(parsePrice("تماس بگیرید")).toBe(0);
  });

  it("accepts a plain number", () => {
    expect(parsePrice(50000)).toBe(50000);
  });
});

describe("applyDiscount", () => {
  it("applies a percentage discount and rounds to the nearest Toman", () => {
    expect(applyDiscount(174000, 5)).toBe(165300);
  });

  it("returns the original price when discount is 0", () => {
    expect(applyDiscount(100000, 0)).toBe(100000);
  });

  it("returns the original price when discount is undefined or null", () => {
    expect(applyDiscount(100000, undefined)).toBe(100000);
    expect(applyDiscount(100000, null)).toBe(100000);
  });

  it("rounds fractional results to the nearest integer", () => {
    // 100 * (1 - 33/100) = 67
    expect(applyDiscount(100, 33)).toBe(67);
  });
});

describe("formatToman", () => {
  it("formats a number using Persian digit grouping with the toman suffix", () => {
    // fa-IR groups thousands with the Arabic thousands separator (٬, U+066C).
    expect(formatToman(174000)).toBe("۱۷۴٬۰۰۰ تومان");
  });

  it("formats zero correctly", () => {
    expect(formatToman(0)).toBe("۰ تومان");
  });
});
