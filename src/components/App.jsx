import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { EngineerLogin } from "@/components/field-engineer/Login";
import { BookingForm } from "@/components/field-engineer/BookingForm";
import { EngineerPayment } from "@/components/field-engineer/Payment";
import { EngineerTracking } from "@/components/field-engineer/Tracking";
import { EngineerCompletion } from "@/components/field-engineer/Completion";
import { Marketplace } from "@/components/services/Marketplace";
import { ServiceModal } from "@/components/services/ServiceModal";
import { services } from "@/components/services/catalog";
import { MyBookings } from "@/components/bookings/MyBookings";
import { OrderConfirmationModal } from "@/components/common/OrderConfirmationModal";
import { ProjectSettings } from "@/components/project/ProjectSettings";

const titles = { marketplace: "Marketplace", login: "Sign in", booking: "Field Engineer Support", payment: "Booking & payment", tracking: "Booking tracking", completion: "Service completion", bookings: "My orders", project: "Project team" };
const sampleTickets = [
  { title: "Fiber link instability at Kochi branch", priority: "Urgent", city: "Kochi", customer: "Federal Bank", status: "Open", engineer: "Unassigned", progress: 8 },
  { title: "New store WiFi readiness survey", priority: "Medium", city: "Mysuru", customer: "Croma", status: "Open", engineer: "Unassigned", progress: 12 },
  { title: "Core switch replacement and testing", priority: "High", city: "Chennai", customer: "TVS Motors", status: "In Progress", engineer: "Neha Singh", progress: 55 },
  { title: "Structured cabling certification", priority: "Low", city: "Ahmedabad", customer: "Adani Retail", status: "Open", engineer: "Unassigned", progress: 8 },
];

export function App() {
  const [view, setView] = useState("marketplace");
  const [category, setCategory] = useState("All");
  const [modal, setModal] = useState(null);
  const [booking, setBooking] = useState(null);
  const [confirmedTicket, setConfirmedTicket] = useState(null);
  const [role, setRole] = useState("customer");
  const [projectSection, setProjectSection] = useState("dashboard");
  const [notifications, setNotifications] = useState([]);
  const [customerTickets, setCustomerTickets] = useState(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(window.localStorage.getItem("last-mile-customer-tickets") ?? "[]");
  });
  const visibleServices = services.filter((service) => category === "All" || service.category === category);
  const goHome = () => setView("marketplace");
  const selectCategory = (nextCategory) => { setCategory(nextCategory); goHome(); };
  const selectRole = (nextRole) => { setRole(nextRole); setView(nextRole === "team" ? "project" : "marketplace"); setProjectSection(nextRole === "team" ? "dashboard" : "dashboard"); };
  const createSampleTicket = () => {
    const sample = sampleTickets[customerTickets.length % sampleTickets.length];
    const ticket = { ...sample, id: `PT-2026-${String(Date.now()).slice(-5)}`, updated: "Just now", unreadComments: 0 };
    setCustomerTickets((current) => {
      const nextTickets = [ticket, ...current];
      window.localStorage.setItem("last-mile-customer-tickets", JSON.stringify(nextTickets));
      return nextTickets;
    });
    setNotifications((current) => [{ id: `${ticket.id}-created`, title: "New ticket created", detail: `${ticket.id} · ${ticket.customer}` }, ...current]);
    setProjectSection("tickets");
  };
  const createTicket = (nextBooking) => {
    const ticket = {
      id: `FE-2026-${String(Date.now()).slice(-5)}`,
      title: `${nextBooking.level} field engineer dispatch - Pune Store 24`,
      status: "Open",
      priority: nextBooking.priority,
      engineer: "Unassigned",
      updated: "Just now",
      city: "Pune",
      customer: "Airtel Business",
      progress: 12,
      unreadComments: 0,
    };
    setBooking({ ...nextBooking, ticketId: ticket.id });
    setCustomerTickets((current) => {
      const nextTickets = [ticket, ...current];
      window.localStorage.setItem("last-mile-customer-tickets", JSON.stringify(nextTickets));
      return nextTickets;
    });
    setNotifications((current) => [{ id: `${ticket.id}-created`, title: "Booking ticket created", detail: `${ticket.id} · Assignment pending` }, ...current]);
    setConfirmedTicket(ticket);
  };
  const dismissConfirmation = () => {
    setConfirmedTicket(null);
    setView("bookings");
  };
  const addNotification = (notification) => setNotifications((current) => [{ id: `${Date.now()}-${current.length}`, ...notification }, ...current]);
  return <AppShell crumbs={["Home", titles[view]]} activeService={category} onServiceSelect={selectCategory} onBookingsSelect={() => setView("bookings")} role={role} onRoleChange={selectRole} projectSection={projectSection} onProjectSectionChange={setProjectSection} onCreateProjectTicket={createSampleTicket} notifications={notifications} showServiceNav={view !== "bookings" && view !== "project"}>
    {view === "marketplace" && <Marketplace category={category} services={visibleServices} onDetails={setModal} onCategoryChange={selectCategory} />}
    {view === "login" && <EngineerLogin onBack={goHome} onVerified={() => setView("booking")} />}
    {view === "booking" && <BookingForm onBack={goHome} onSubmit={createTicket} />}
    {view === "payment" && <EngineerPayment booking={booking} onBack={() => setView("booking")} onConfirm={() => createTicket(booking)} />}
    {view === "tracking" && <EngineerTracking booking={booking} onComplete={() => setView("completion")} />}
    {view === "completion" && <EngineerCompletion booking={booking} onBack={goHome} />}
    {view === "bookings" && <MyBookings onBack={goHome} customerTickets={customerTickets} mode="customer" onNotify={addNotification} />}
    {view === "project" && (projectSection === "dashboard" || projectSection === "tickets") && <MyBookings onBack={goHome} customerTickets={customerTickets} mode="team" showDashboard={projectSection === "dashboard"} showTickets={projectSection === "tickets"} onNotify={addNotification} />}
    {view === "project" && (projectSection === "roles" || projectSection === "payment") && <ProjectSettings section={projectSection} onNotify={addNotification} />}
    {modal && <ServiceModal service={modal} onClose={() => setModal(null)} onBook={() => { setModal(null); setView("login"); }} />}
    {confirmedTicket && <OrderConfirmationModal ticket={confirmedTicket} onClose={dismissConfirmation} />}
  </AppShell>;
}