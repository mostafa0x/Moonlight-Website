# ✨ Moonlight Website

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)

**A modern and elegant tourism booking platform with an advanced admin dashboard**

[🌐 Visit Website](https://moonlight-website-new-delta.vercel.app) • [🐛 Report Issues](https://github.com/mostafa0x/Moonlight-Website/issues) • [💪 Contribute](CONTRIBUTING.md)

</div>

---

## 📋 Table of Contents

- [📖 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Requirements](#️-requirements)
- [📦 Installation & Setup](#-installation--setup)
- [🚀 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [🎨 Libraries & Technologies](#-libraries--technologies)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact & Support](#-contact--support)

---

## 📖 Overview

**Moonlight Website** is a comprehensive web platform for booking tours and vacation packages with a powerful admin dashboard. The project combines the latest web technologies to provide a seamless and ultra-fast user experience.

### 🎯 Goals
- ✅ Provide a professional platform for booking tours and vacations
- ✅ Advanced admin dashboard with secure authentication
- ✅ Support for multiple languages and geographic regions
- ✅ High performance and fast response times
- ✅ Exceptional user experience across all devices

---

## ✨ Key Features

### 🎫 Complete Booking System
- 📝 User-friendly interface for booking tours
- 🎯 Customize and modify travel packages
- 💳 Secure and reliable payment system
- 📧 Booking confirmation via email

### 🛡️ Admin Dashboard
- 👨‍💼 Full management of bookings and tickets
- 🔐 Secure authentication (SSR Authentication)
- ⚡ Real-time updates
- 📊 Detailed reports and statistics

### 🌐 Multi-Language Support
- 🗣️ Full support for multiple languages
- 🌍 Dynamic routing based on language
- 🔤 Professional translation for all content

### 💰 Discount Code System
- ✅ Instant validation of discount codes
- 🧮 Dynamic price calculation
- 📉 Automatic discount application

### 🎨 Modern & Interactive UI
- 🌓 Automatic support for light/dark mode
- ✨ Smooth scrolling effects (Lenis)
- 🖼️ Professional image galleries (Swiper)
- 📱 Fully responsive design

### ⚡ High Performance
- 🚀 Built on Next.js with Server Components
- 🔄 Optimized server calls
- 📈 SEO-optimized
- 🗺️ Automatic sitemap generation

---

## 🛠️ Requirements

Before starting, ensure you have:

- **Node.js** version 18 or higher
- **npm** or **yarn** or **pnpm**
- **Supabase account** (for database and authentication)

### Verify Installed Versions:

```bash
node --version    # v18+
npm --version     # 8+
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mostafa0x/Moonlight-Website.git
cd Moonlight-Website
```

### 2️⃣ Install Dependencies

```bash
npm install
# or using yarn
yarn install
# or using pnpm
pnpm install
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend (Email Service)
RESEND_API_KEY=your_resend_api_key

# Other variables (as needed for your project)
```

### 4️⃣ Verify Setup

```bash
npm run dev
```

---

## 🚀 Usage

### Run Development Environment

```bash
npm run dev
```

The application will run at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This will:
- ✅ Build the application
- ✅ Generate sitemap automatically
- ✅ Optimize files for production

### Run Production Server

```bash
npm start
```

### Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development environment |
| `npm run build` | Build for production |
| `npm start` | Run production server |
| `npm run dev -- --webpack` | Development with Webpack |

---

## 📁 Project Structure

```
Moonlight-Website/
├── public/                   # Static files (images, icons)
├── messages/                 # Translation files (i18n)
├── src/
│   ├── app/                  # Application routes (App Router)
│   │   ├── api/              # API Routes
│   │   ├── [locale]/         # Routes with multi-language support
│   │   ├── layout.tsx        # Main layout
│   │   └── page.tsx          # Home page
│   │
│   ├── features/             # Project-specific features & components
│   │   ├── bookings/         # Booking feature
│   │   ├── admin/            # Admin dashboard
│   │   ├── auth/             # Authentication
│   │   └── ...
│   │
│   ├── shared/               # Shared components & utilities
│   │   ├── components/       # Reusable components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Helper functions
│   │   └── constants/        # Project constants
│   │
│   └── i18n/                 # Internationalization configuration
│
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.ts            # Next.js configuration
└── README.md                 # This file
```

---

## 🎨 Libraries & Technologies

### 🏗️ Framework & Basics
| Package | Version | Purpose |
|---------|---------|---------|
| Next.js | 16.2.1 | Advanced React framework |
| React | 19.2.3 | UI library |
| TypeScript | 5 | Typed programming language |

### 💾 Database & Authentication
| Package | Version | Purpose |
|---------|---------|---------|
| @supabase/supabase-js | 2.100.1 | Database |
| @supabase/ssr | 0.9.0 | Secure SSR Authentication |

### 🎨 Design & UI
| Package | Version | Purpose |
|---------|---------|---------|
| Tailwind CSS | 4 | Modern CSS framework |
| tailwindcss-animated | 2.0.0 | Enhanced animations |
| Lenis | 1.3.21 | Smooth scrolling effects |
| Swiper | 12.1.3 | Professional carousels |

### 🔧 State Management & Forms
| Package | Version | Purpose |
|---------|---------|---------|
| @tanstack/react-query | 5.90.21 | Data state management |
| react-hook-form | 7.71.2 | Form management |
| @hookform/resolvers | 5.2.2 | Validation resolvers |
| Zod | 4.3.6 | Data validation |

### 🌐 Localization & Services
| Package | Version | Purpose |
|---------|---------|---------|
| next-intl | 4.8.3 | Multi-language support |
| Resend | 6.12.2 | Email service |
| next-sitemap | 4.2.3 | Sitemap generation |

### 🛠️ Additional Tools
| Package | Version | Purpose |
|---------|---------|---------|
| clsx | 2.1.1 | CSS class merging |
| tailwind-merge | 3.5.0 | Tailwind style merging |

---

## 🚀 Deployment

### Deploy on Vercel (Recommended) ⭐

Vercel is the easiest and fastest way to deploy Next.js projects:

```bash
# Step 1: Connect the project on Vercel
# 1. Go to https://vercel.com/new
# 2. Select "Import Git Repository"
# 3. Choose the project from GitHub

# Step 2: Set environment variables
# 1. In Vercel dashboard
# 2. Go to Settings → Environment Variables
# 3. Add the following variables:
#    - NEXT_PUBLIC_SUPABASE_URL
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY
#    - RESEND_API_KEY

# Step 3: Enable automatic deployment
# Deployment will happen automatically on each push to main
```

### Manual Deployment on Server

```bash
# Build the application
npm run build

# Run the server
npm start
```

### Deploy with Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 🤝 Contributing

We welcome contributions! Whether it's a new feature, bug fix, or documentation improvement.

### 📋 Contributing Steps

1. **Fork the Project**
   ```bash
   # Click the Fork button on the project page
   ```

2. **Create a New Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes and Test**
   ```bash
   npm run dev
   ```

4. **Commit Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push the Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Explain your changes clearly
   - Add screenshots if applicable

### ✅ Contribution Standards

- ✅ Clean and readable code
- ✅ Use TypeScript
- ✅ Follow project patterns
- ✅ Add comments for complex code
- ✅ Test changes locally
- ✅ Don't remove old code without updating documentation

---

## 📄 License

This project is licensed under an open-source license. See the [LICENSE](LICENSE) file for full details.

---

## 📞 Contact & Support

### 👨‍💻 Author
- **Name**: Mostafa Ahmed
- **GitHub**: [@mostafa0x](https://github.com/mostafa0x)
- **Email**: [Contact via GitHub]

### 💬 Support & Help
- 🐛 [Report Issues](https://github.com/mostafa0x/Moonlight-Website/issues)
- 💬 [Discussions & Questions](https://github.com/mostafa0x/Moonlight-Website/discussions)
- 📖 [View Documentation](https://github.com/mostafa0x/Moonlight-Website/wiki)

---

## 🎉 Thank You

Thank you for using **Moonlight Website**!

If you like the project, don't forget to:
- ⭐ Add a star to the project
- 🔗 Share the project with others
- 🤝 Contribute your feedback and suggestions

---

<div align="center">

### Made with ❤️ by Mostafa Ahmed

**Current Version**: 1.0.0 | **Last Updated**: July 2026

[⬆ Back to Top](#-moonlight-website)

</div>
