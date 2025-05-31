# [Multi-Tenant Ecommerce Platform](https://funroad-multi-tenant-ecommerce-next.vercel.app/)

**A modern multi-tenant ecommerce platform built with Next.js 15 that allows store owners to create their own storefronts, manage products, and process payments. The application provides a seamless experience for both store owners and customers.**

![Application Screenshot](/funroad-multi-tenant-ecommerce.png "Application Screenshot")
![Application Screenshot](/funroad-multi-tenant-ecommerce-dashboard.png "Application Screenshot")

## 🚀 Features  

- **Multi-Tenant Architecture**: Each store gets its own subdomain and customizable storefront.
- **Product Management**: Create and manage products with rich descriptions and images
- **Shopping Cart**: Add products to cart and checkout seamlessly
- **Secure Payments**: Integrated with Stripe for secure payment processing
- **Order Management**: Track and manage orders for both customers and store owners
- **User Authentication**: Secure user authentication system
- **Admin Dashboard**: Comprehensive admin interface powered by PayloadCMS
- **Responsive Design**: Works seamlessly on all device sizes

## 🛠️ Technologies Used  

- **Frontend**:  
  - [Next.js 15](https://nextjs.org/) - React framework with server-side rendering capabilities
  - [React 19](https://react.dev/) - JavaScript library for building user interfaces

- **Backend**:  
  - [PayloadCMS](https://payloadcms.com/) - Headless CMS for content management
  - [tRPC](https://trpc.io/) - End-to-end typesafe APIs
  - [MongoDB](https://www.mongodb.com/) - Database for storing application data
  - [Stripe](https://stripe.com/) - Payment processing platform

- **Programming Language**:  
  - [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

- **Styling**:  
  - [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [Shadcn UI](https://ui.shadcn.com/) - A collection of accessible and customizable UI components

## 📦 NPM Packages  

- [React Hook Form](https://www.react-hook-form.com/) - Performant form validation
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit

## 💻 Setup

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/KayqueGoldner/funroad-multi-tenant-ecommerce-nextjs.git
cd funroad-multi-tenant-ecommerce-nextjs
```

### 2. Install Dependencies

```bash
npm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env` file with the following variables:

```
# Added by Payload
DATABASE_URI=
PAYLOAD_SECRET=
FIRST_ADMIN_EMAIL=admin@demo.com
FIRST_ADMIN_PASSWORD=demo

# Global
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### 4. Set Up the Database

```bash
npm run db:fresh
# or
bun run db:fresh
```

### 5. Seed the Database (Optional)

```bash
npm run db:seed
# or
bun run db:seed
```

### 6. ### Run the Application

```bash
npm run dev
# or
bun run dev
```

## 🔒 Authentication 

The application uses Clerk for secure authentication with support for:
- Email and password authentication
- Role-based access control
- Tenant-specific permissions

## 💳 Payment Processing

- **Stripe Integration**: Secure payment processing with Stripe
- **Platform Fee**: Configurable platform fee percentage (default: 10%)
- **Checkout Flow**: Streamlined checkout experience
- **Order Management**: - Comprehensive order tracking and management

## 🤝 Contribute

1. Fork this repository
2. Create a branch for your changes (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

All contributions are welcome!