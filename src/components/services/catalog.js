import engineerImage from "@/assets/field-engineer.jpg";
import auditImage from "@/assets/site-audit.jpg";
import dataCenterImage from "@/assets/data-center.jpg";

export const services = [
  { title: "Field Engineer Support", category: "Field Engineer", image: engineerImage, description: "Certified engineers for installation, configuration, troubleshooting, and on-ground support." },
  { title: "Enterprise Site Readiness Audit", category: "Site Audit", image: auditImage, description: "Physical, power, and connectivity readiness assessment." },
  { title: "Structured Cabling Build-Out", category: "Passive Services", image: dataCenterImage, description: "Cabling, terminations, and certification." },
  { title: "WiFi Predictive & Passive Heatmap Survey", category: "Survey", image: dataCenterImage, description: "Heatmaps, AP placement, and channel planning." },
  { title: "Internet Leased Line Provisioning", category: "ISP Gateway", image: auditImage, description: "Multi-ISP feasibility and last-mile delivery." },
  { title: "Managed Switch Supply & Staging", category: "Products & Inventory", image: dataCenterImage, description: "Procure, configure, and deliver network equipment." },
];

export const fieldEngineerScope = {
  in: ["Engineer deployment under the agreed visit-count or man-day model", "Installation, basic configuration, testing, and issue troubleshooting", "Standard working hours and defined coverage locations", "Daily or visit-wise reporting and closure sign-off"],
  out: ["Work beyond agreed hours, holidays, or night shifts", "Travel, lodging, and boarding outside the agreed location limit", "Height work, hot work, or activity requiring special safety clearance", "Tools, ladders, lifts, consumables, or OEM-level advanced support unless agreed"],
};