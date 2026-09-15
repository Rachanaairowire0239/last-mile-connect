export type Grade = "L1" | "L2" | "L1+L2";
export type PriorityKey = "P0" | "P1" | "P2";
export type EngineerMode = "Active" | "Passive";

export const BUSINESS_HOURS = { start: 8, end: 20 };

export const RATE_CARD = {
  L1: {
    label: "L1 Engineer",
    hourly: 1000,
    minHours: 4,
    minCharge: 4000,
    offHoursMin: 6000,
    offHoursHourly: 2000,
    card: "RC-2026-FE-L1",
  },
  L2: {
    label: "L2 Engineer",
    hourly: 1500,
    minHours: 4,
    minCharge: 6000,
    offHoursMin: 9000,
    offHoursHourly: 2500,
    card: "RC-2026-FE-L2",
  },
} as const;

export const PRIORITIES: Record<PriorityKey, {
  label: string; multiplier: number; dispatchFee: number; sla: string; scheduled: boolean;
}> = {
  P0: { label: "P0 — Critical (High)", multiplier: 1.35, dispatchFee: 2500, sla: "Engineer allotted in 15–20 min · on site within 2–3 hours", scheduled: false },
  P1: { label: "P1 — High", multiplier: 1.15, dispatchFee: 1000, sla: "Engineer allotted same day", scheduled: true },
  P2: { label: "P2 — Standard", multiplier: 1, dispatchFee: 0, sla: "Scheduled as per selected slot", scheduled: true },
};

export const PLATFORM_FEE = 200;
export const AMC_DISCOUNT = 1200;
export const GST_RATE = 0.18;
export const CANCELLATION_FEE = 1000;

export const MATERIAL_CATALOGUE = [
  { name: "Cat6A cable (per box)", rate: 6500 },
  { name: "LC-LC patch cord", rate: 850 },
  { name: "Managed switch port module", rate: 3200 },
  { name: "PVC conduit (per 10 m)", rate: 450 },
  { name: "Copper wire bundle", rate: 1200 },
] as const;

export type MaterialLine = { name: string; rate: number; qty: number };

export type QuoteInput = {
  grade: Grade;
  l1Count: number;
  l2Count: number;
  hours: number;
  startHour: number;
  priority: PriorityKey;
  mode: EngineerMode;
  materials: MaterialLine[];
  amcLinked: boolean;
};

export type QuoteLine = { label: string; note?: string; amount: number | null; hint?: string };

export const inr = (n: number) => `₹ ${Math.round(n).toLocaleString("en-IN")}`;

export function isOffHours(startHour: number, hours: number) {
  const end = startHour + hours;
  return startHour < BUSINESS_HOURS.start || end > BUSINESS_HOURS.end;
}

export function computeQuote(input: QuoteInput) {
  const { grade, hours, startHour, priority, mode, materials, amcLinked } = input;
  const p = PRIORITIES[priority];
  const offHours = p.scheduled ? isOffHours(startHour, hours) : false;
  const counts: Array<[keyof typeof RATE_CARD, number]> =
    grade === "L1" ? [["L1", input.l1Count]]
    : grade === "L2" ? [["L2", input.l2Count]]
    : [["L1", input.l1Count], ["L2", input.l2Count]];

  const lines: QuoteLine[] = [];
  let labour = 0;

  for (const [key, count] of counts) {
    if (count <= 0) continue;
    const r = RATE_CARD[key];
    const base = offHours ? r.offHoursMin : r.minCharge;
    const extraHours = Math.max(0, hours - r.minHours);
    const extra = extraHours * (offHours ? r.offHoursHourly : r.hourly);
    const subtotal = (base + extra) * count;
    labour += subtotal;
    lines.push({
      label: `${r.label} × ${count}`,
      note: `${offHours ? "Off-hours minimum" : "Minimum block"} ${r.minHours} hr — ${inr(base)}${extraHours ? ` + ${extraHours} extra hr × ${inr(offHours ? r.offHoursHourly : r.hourly)}` : ""} · ${r.card}`,
      amount: subtotal,
    });
  }

  const prioritySurcharge = labour * (p.multiplier - 1);
  if (prioritySurcharge > 0) lines.push({ label: `${priority} priority surcharge`, note: `${Math.round((p.multiplier - 1) * 100)}% on labour`, amount: prioritySurcharge });
  if (p.dispatchFee > 0) lines.push({ label: "Emergency dispatch fee", note: p.sla, amount: p.dispatchFee });

  const materialTotal = mode === "Active" ? materials.reduce((s, m) => s + m.rate * m.qty, 0) : 0;
  const materialLines: QuoteLine[] = mode === "Passive"
    ? [{ label: "Material / spares", note: "Passive engagement — no materials billed", amount: null, hint: "Nil" }]
    : materials.filter(m => m.qty > 0).map(m => ({ label: m.name, note: `${inr(m.rate)} × ${m.qty}`, amount: m.rate * m.qty }));
  if (mode === "Active" && !materialLines.length) materialLines.push({ label: "Material / spares", note: "No items added yet", amount: 0 });

  const subTotal = labour + prioritySurcharge + p.dispatchFee + materialTotal + PLATFORM_FEE;
  const discount = amcLinked ? AMC_DISCOUNT : 0;
  const taxable = Math.max(0, subTotal - discount);
  const gst = taxable * GST_RATE;

  return {
    lines, materialLines, offHours, priority: p,
    labour, prioritySurcharge, dispatchFee: p.dispatchFee, materialTotal,
    platform: PLATFORM_FEE, subTotal, discount, gst, total: taxable + gst,
  };
}

export const IN_SCOPE = [
  "Certified engineer travel to site within city limits",
  "Diagnostics, configuration and restoration of reported issue",
  "Standard tools, ladder and safety equipment",
  "Digital job card, geo-tagged photos and completion certificate",
];

export const OUT_OF_SCOPE = [
  "Civil / masonry work and false-ceiling restoration",
  "OEM hardware replacement cost and licences",
  "Inter-city travel, lodging and toll for remote sites",
  "Work beyond the booked duration (billed per extra hour)",
];
