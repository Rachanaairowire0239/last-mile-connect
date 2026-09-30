import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { panel, label, money } from "@/components/common/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PricingRulebook } from "./PricingRulebook";

export function BookingForm({ onBack, onSubmit }) {
  const [level, setLevel] = useState("L2"), [count, setCount] = useState(1), [priority, setPriority] = useState("Medium"), [extraHours, setExtraHours] = useState(0), [pocs, setPocs] = useState([{ name: "Amit Deshpande", mobile: "+91 98220 41188" }]);
  const urgent = priority === "Urgent"; const rate = level === "L1" ? 1000 : level === "L2" ? 1400 : 2400; const total = (4 + extraHours) * rate * count * ({ Low: 1, Medium: 1.15, High: 1.5, Urgent: 2 }[priority]);
  const chooseLevel = (nextLevel) => { setLevel(nextLevel); if (nextLevel === "L1 + L2") setCount(2); };
  const updatePoc = (index, key, value) => setPocs(pocs.map((poc, pocIndex) => pocIndex === index ? { ...poc, [key]: value } : poc));
  return <div className="mx-auto max-w-[1100px] space-y-5 pb-6">
    <div className="flex items-end justify-between">
      <div><p className="text-[10px] font-bold uppercase text-primary">Field engineer support</p><h1 className="mt-2 text-2xl font-semibold">Book a service</h1></div>
      <Button variant="outline" onClick={onBack}><ArrowLeft />Back</Button>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      <section className={panel}>
        <h2 className="text-sm font-semibold">Customer</h2>
        <div className="mt-4 flex gap-5 text-xs">
          <label className="flex gap-2"><input type="radio" name="customer" defaultChecked />Existing customer</label>
          <label className="flex gap-2"><input type="radio" name="customer" />New customer</label>
        </div>
      </section>

      <section className={panel}>
        <h2 className="text-sm font-semibold">Engineer requirement</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label><span className={label}>Required engineers *</span><select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" value={level} onChange={(event) => chooseLevel(event.target.value)}><option>L1</option><option>L2</option><option>L1 + L2</option></select></label>
          <label><span className={label}>Priority *</span><select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" value={priority} onChange={(event) => setPriority(event.target.value)}><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select></label>
        </div>
        {urgent && <p className="mt-4 rounded-md border border-warning/40 bg-warning/10 p-3 text-xs"><strong>Urgent service request.</strong> Assignment is expected within 15-20 minutes; site arrival target is 2-3 hours.</p>}
      </section>
    </div>

    <section className={panel}>
      <h2 className="text-sm font-semibold">Site details</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {[["Site code *", "NX-PUN-024"], ["Site name *", "Pune Store 24"], ["Site address *", "Shop 4, Baner Road, Pune 411045"], ["GPS location", "18.5591 N, 73.7869 E"]].map(([name, value]) => <label key={name}><span className={label}>{name}</span><Input defaultValue={value} /></label>)}
      </div>
    </section>

    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <section className={panel}>
        <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Site contacts</h2><Button size="sm" variant="outline" onClick={() => setPocs([...pocs, { name: "", mobile: "" }])}>Add POC</Button></div>
        <div className="mt-4 space-y-3">
          {pocs.map((poc, index) => <div key={index} className="grid gap-3 sm:grid-cols-2">
            <label><span className={label}>POC {index + 1} name *</span><Input value={poc.name} onChange={(event) => updatePoc(index, "name", event.target.value)} /></label>
            <label><span className={label}>POC {index + 1} mobile *</span><Input value={poc.mobile} onChange={(event) => updatePoc(index, "mobile", event.target.value)} /></label>
          </div>)}
        </div>
      </section>

      <section className={panel}>
        <h2 className="text-sm font-semibold">Scheduling</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label><span className={label}>No. of engineers required *</span><Input type="number" min="1" disabled={level === "L1 + L2"} value={count} onChange={(event) => setCount(Math.max(1, Number(event.target.value) || 1))} /></label>
          <label><span className={label}>Additional hours per engineer</span><Input type="number" min="0" value={extraHours} onChange={(event) => setExtraHours(Math.max(0, Number(event.target.value) || 0))} /></label>
          <label><span className={label}>Date *</span><Input type="date" disabled={urgent} defaultValue="2026-09-24" /></label>
          <label><span className={label}>Time *</span><Input type="time" disabled={urgent} defaultValue="10:00" /></label>
        </div>
      </section>
    </div>

    <section className={panel}>
      <h2 className="text-sm font-semibold">Work details</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="sm:col-span-2"><span className={label}>Issue description *</span><Textarea placeholder="Describe the installation, configuration, or troubleshooting required" /></label>
        <label><span className={label}>Instructions and equipment to carry</span><Textarea placeholder="Add access, safety, tool, or site instructions" /></label>
        <label><span className={label}>Attachments</span><Input type="file" multiple /></label>
      </div>
    </section>

    <PricingRulebook />

    <section className={`${panel} sticky bottom-4 z-10 shadow-lg`}>
      <div className="flex flex-col gap-4 p-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-xs">
          <div className="flex justify-between gap-6 sm:justify-start"><span className="text-muted-foreground">{count} x {level}, 4-hour minimum + {extraHours} extra hrs each</span><span>{money(total)}</span></div>
          <div className="flex justify-between gap-6 sm:justify-start"><span className="text-muted-foreground">GST (18%)</span><span>{money(Math.round(total * .18))}</span></div>
        </div>
        <div className="flex items-center gap-4 border-t border-border pt-3 sm:border-t-0 sm:border-l sm:pl-4 sm:pt-0">
          <div><p className="text-[10px] text-muted-foreground">Total payable</p><p className="text-lg font-semibold text-primary">{money(Math.round(total * 1.18))}</p></div>
          <Button onClick={() => onSubmit({ level, count, priority, total })}>Book service</Button>
        </div>
      </div>
    </section>
  </div>;
}