<div align="center">
  <h1>🌙 Moonlight Website</h1>
  <p>A comprehensive tourism booking platform and modern admin dashboard built with the latest web technologies to deliver an ultra-fast, seamless user experience.</p>
</div>

---

## 🚀 Key Features

- **Complete Booking System**: A user-friendly interface for booking tours and customizing travel packages.
- **Admin Dashboard**: Full management of bookings and tickets with secure authentication and real-time updates (Server-Side Rendering).
- **Internationalization (i18n)**: Full support for multiple languages and routing using `next-intl`.
- **Promo Codes System**: Instant validation of discount codes and dynamic price calculation.
- **Modern & Interactive UI**: 
  - Automatic support for Light/Dark mode.
  - Smooth scrolling effects using `Lenis`.
  - High-performance professional image galleries using `Swiper`.
- **High Performance**: Built on Next.js (App Router) maximizing the use of Server Components for improved SEO and loading speeds.

## 🛠 Tech Stack

### Core Framework
- **Next.js 15+** (App Router & Server Components)
- **React 19**
- **TypeScript**

### Database & Authentication
- **Supabase** (Database & Auth)

### Styling & UI
- **Tailwind CSS v4**
- **Lenis** (Smooth Scrolling)
- **Swiper** (Carousels & Galleries)

### State Management & Forms
- **React Query (TanStack)**
- **React Hook Form** + **Zod** (Form Management & Validation)

### Other Tools
- **Next-Intl** (Internationalization)
- **Resend** (Email Service)

## 📂 Project Structure

The project relies on an organized architecture to separate features from shared components, making it scalable and easy to maintain:

```text
├── public/             # Static assets (Images, Icons)
├── messages/           # Translation files for different languages (i18n)
└── src/
    ├── app/            # Main application routes (App Router)
    ├── features/       # Project-specific features (Components, Hooks, Services)
    ├── i18n/           # Internationalization routing & configuration
    └── shared/         # Shared components and utilities (UI Components, Utils)
```

## ⚙️ Prerequisites

Before running the project, ensure you have the following installed:
- Node.js (Version 18 or higher)
- npm, yarn, or pnpm
- A [Supabase](https://supabase.com) account to set up the database and authentication.

## 💻 Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Moonlight-Website
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory of the project and add the required variables based on the `env-example.txt` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   # Add any other required variables here
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the website.

## 📦 Deployment

The project is fully optimized and ready to be deployed on **[Vercel](https://vercel.com/)**.
It also supports automatic Sitemap generation for SEO using `next-sitemap`, which runs automatically after the build process (`npm run build`).

---
<div align="center">
  <p>Developed by <b>Mostafa Ahmed</b>.</p>
</div>
