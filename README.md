This project documentation details the headless rebuild of the AFS Foiling website using Next.js and WordPress/WooCommerce.

* * * * *

🏄 AFS Foiling -- Headless WordPress + Next.js Rebuild
=====================================================

This project is a **headless rebuild** of the [AFS Foiling](https://afs-foiling.com/) website. The main goal was to replace the **slow Elementor + WPML frontend** with a **high-performance React/Next.js frontend**, while retaining **WordPress + WooCommerce** as the backend.

📂 GitHub Repository:

👉 https://github.com/i514/afs-next-js

👤 My GitHub Profile:

👉 https://github.com/engromerbaig

* * * * *

🚀 Objective
------------

Rebuild the AFS Foiling website frontend with:

-   ⚡ **Headless architecture**: React/Next.js frontend + WordPress/WooCommerce backend

-   ✨ **Improved performance**: Remove Elementor, improve Core Web Vitals

-   🌍 **Multilingual support**: Preserve WPML integration via WordPress REST API

-   🧑‍💻 **Dynamic shop**: WooCommerce REST API for product pages, cart, checkout

-   📱 **Responsive design**: Fully optimized for Desktop, Tablet, and Mobile

-   🎨 **Modern UI**: Built with TailwindCSS for scalability and maintainability

* * * * *

🔧 Tech Stack
-------------

| Category | Technology Used |
| --- | --- |
| **Frontend** | [Next.js](https://nextjs.org/) (App Router, JavaScript) |
| **Styling** | [TailwindCSS](https://tailwindcss.com/) |
| **Backend** | [WordPress](https://wordpress.org/) (Headless CMS) |
| **E-commerce** | [WooCommerce](https://woocommerce.com/) (via REST API) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **API Layer** | WooCommerce REST API + WordPress REST API |

* * * * *

📁 Project Structure
--------------------

| Directory | Description |
| --- | --- |
| `/app` | Next.js App Router pages (static + dynamic) |
| `/components` | Shared UI (Header, Footer, ProductCard, Loader) |
| `/lib` | API utilities (`woocommerce.js`, `wordpress.js`) |
| `/config` | Site metadata & configuration |
| `/public` | Static assets (images, icons) |
| `/styles` | Global Tailwind styles |

* * * * *

📊 Static vs Dynamic Pages Breakdown
------------------------------------

| Page Type | Route | Data Source | Rendering |
| --- | --- | --- | --- |
| **Static** | `/` (Home) | Static content | Static |
| **Static** | `/about` | Static content | Static |
| **Static** | `/contact` | Static content | Static |
| **Static** | `/story` | Static content | Static |
| **Dynamic** | `/shop` | WooCommerce API | Server-side |
| **Dynamic** | `/shop/[slug]` | WooCommerce API | Server-side |
| **Dynamic** | `/blog` | WordPress REST API | Server-side |
| **Dynamic** | `/blog/[slug]` | WordPress REST API | Server-side |
| **Dynamic** | `/cart` | WooCommerce API | Client-side |
| **Dynamic** | `/checkout` | WooCommerce API | Client-side |
| **Dynamic** | `/account` | WooCommerce API | Client-side |

* * * * *

✅ Features Implemented
----------------------

-   ✅ **Static Pages**: Home, About, Contact, Story

-   ✅ **WooCommerce Integration**: Dynamic shop pages, product detail, cart, checkout

-   ✅ **WordPress Integration**: Blog listing + blog details via WP REST API

-   ✅ **Multilingual Support**: WPML integrated via backend API

-   ✅ **Responsive Layout**: Optimized across Desktop, Tablet, Mobile

-   ✅ **Reusable Components**: Header, Footer, ProductCard, Loader, etc.

-   ✅ **Performance Optimizations**: Tailwind utilities, lazy loading, Next.js Image

* * * * *

🛠 Development Setup
--------------------

### 1\. Clone the repository

Bash

```
git clone https://github.com/i514/afs-next-js.git
cd afs-next-js

```

### 2\. Install dependencies

Bash

```
npm install

```

### 3\. Setup environment variables

Create `.env.local` in the root:

Code snippet

```
NEXT_PUBLIC_WC_API_URL=https://afs-foiling.com/wp-json/wc/v3
NEXT_PUBLIC_WC_KEY=ck_xxxxx
NEXT_PUBLIC_WC_SECRET=cs_xxxxx
NEXT_PUBLIC_WP_API_URL=https://afs-foiling.com/wp-json/wp/v2

```

### 4\. Run locally

Bash

```
npm run dev

```

Open `http://localhost:3000`

* * * * *

📆 Timeline
-----------

-   **Week 1** → Setup Next.js project, Tailwind config, scaffold static pages

-   **Week 2** → WooCommerce REST API integration (shop, product detail)

-   **Week 3** → Blog + WP REST API integration, multilingual setup

-   **Week 4** → Cart, Checkout, Account pages + Final QA & Deployment

* * * * *

🔮 Future Improvements
----------------------

-   🔄 **Headless CMS**: Use WPGraphQL or Sanity for richer queries

-   🧪 **Testing**: Add unit tests with React Testing Library / Playwright

-   📈 **Analytics**: Add GA4 & performance monitoring

-   ♿ **Accessibility**: Improve ARIA roles & keyboard navigation

-   🚀 **Further Optimization**: Image compression, route-level loaders

* * * * *

🙌 Author
---------

**Muhammad Omer Baig**

-   **Portfolio**: [omerbaig.dev](https://www.google.com/search?q=https://omerbaig.dev)

-   **Email**: <omerbaigde@gmail.com>

-   **GitHub**: [@engromerbaig](https://github.com/engromerbaig)
