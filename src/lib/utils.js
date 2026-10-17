export function toBanglaNumber(value) {
  const digits = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };

  return String(value).replace(/\d/g, (digit) => digits[digit]);
}

export function formatPrice(value) {
  return Number(value || 0).toLocaleString("bn-BD");
}

export function getUnitLabel(unit) {
  const labels = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return labels[unit] || unit;
}

export function parseNumericValue(value) {
  const banglaDigits = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  const normalized = String(value ?? "")
    .replace(/[০-৯]/g, (digit) => banglaDigits[digit])
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");

  return Number(normalized) || 0;
}

export function getChangeStyle(direction) {
  if (direction === "up") {
    return {
      symbol: "▲",
      className:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
    };
  }

  if (direction === "down") {
    return {
      symbol: "▼",
      className: "border-red-500/20 bg-red-500/10 text-red-600",
    };
  }

  return {
    symbol: "—",
    className: "border-slate-300 bg-slate-100 text-slate-500",
  };
}