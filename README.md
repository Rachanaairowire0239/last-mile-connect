# Last Mile Connect

Build the Last Mile portal application with both the Survey Form and the Field Engineer Support booking page, applying the dark theme styling from image 2 across the app.

Key requirements:
1. Theme & Navigation (from image 2):
   - Dark navy top navigation bar with 'Last Mile' branding, breadcrumbs, search input, 'All Systems Operational' status badge, notifications, and user profile ('Airtel Business').
   - Dark navy sidebar with menu items: Site Audit, Survey, Field Engineer Support, Products & Inventories, ISP Gateway, and 'Need help?' support card.
   - Smooth navigation between the Survey Form and Field Engineer Support pages.

2. Survey Form (image 2):
   - Stepper: Survey Type, Survey Details, Attachments, Review & Schedule.
   - Active Survey vs Passive Survey toggle.
   - Floor details dynamic table (Floor name, floor area in sq ft, Add Floor).
   - POC details, address, pincode, attachment dropzone, and schedule picker.

3. Field Engineer Support Page (content and layout from image 1, styled in image 2's theme):
   - 1. Select Service bar (Site Audit, Survey, Field Engineer Support, Products, ISP Link, Passive Work) — clicking Survey switches to Survey Form, Field Engineer Support stays here.
   - Engineer Type toggle: 'Active Field Engineer' vs 'Passive Field Engineer'.
   - 2. Customer toggle: Existing Customer vs New Customer with Customer ID.
   - 3. Site Details: Site code lookup (e.g., NX-PUN-024) fetching site name, address, GPS location, POC name, and phone numbers.
   - 4. Work Details: Issue description, tools/accessories to carry, number of engineers counter, priority dropdown (P0 - Critical, etc.), and file upload.
   - 5. Schedule: Date picker, time slot, duration selector, and non-working hours warning banner.

4. Dynamic Payment Window (right side panel):
   - Existing rate card breakdown, engineer count multiplier.
   - Conditional logic based on Engineer Type:
     - If Active Field Engineer: Material / spares row is disabled or blank/₹0 (not applicable).
     - If Passive Field Engineer: Visiting charges PLUS materials/spares (cables, wires, patch cords, conduits) are included in calculation.
   - Non-working hours fee, platform charges, subtotal, AMC discount (-₹1,200), GST 18%, and dynamic Total Payable.
   - Action buttons: Cancel and Book.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9eccfec0-1fa9-491e-a486-dbd9a444248b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
