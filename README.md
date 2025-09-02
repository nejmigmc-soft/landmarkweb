# LANDMARK Project

A production-ready monorepo for LANDMARK Gayrimenkul Yatırım Hizmetleri real-estate platform.

## 🏗️ Architecture

- **Monorepo** with pnpm workspaces
- **Frontend**: Next.js 14 (App Router, TypeScript, Tailwind CSS, shadcn/ui)
- **Backend**: NestJS REST API
- **Database**: MySQL with Prisma ORM
- **Shared**: Prisma schema and client

## 📁 Project Structure

```
landmark-project/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend
├── packages/
│   └── db/           # Prisma schema & client
├── pnpm-workspace.yaml
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 9+
- MySQL database (cPanel compatible)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Setup

Copy `env.example` to `apps/api/.env` and fill in your values:

```bash
cp env.example apps/api/.env
```

**Important**: Update the `DATABASE_URL` with your cPanel MySQL credentials:
- Host: localhost:3306
- Database: landmar5_landmarkyhdb
- Username: landmar5_nejmi
- Password: [Your actual password]

### 3. Database Setup

```bash
# Generate Prisma client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate

# Seed database with demo data
pnpm db:seed
```

### 4. Development

```bash
# Start both API and Web concurrently
pnpm dev

# Or start individually:
pnpm --filter @landmark/api dev    # API on :3001
pnpm --filter @landmark/web dev    # Web on :3000
```

### 5. Production Build

```bash
pnpm build
pnpm start
```

## 🗄️ Database Schema

- **Users**: Admin, Agents, Regular users
- **Properties**: Real estate listings with detailed attributes
- **Images**: Property photos with ordering
- **Tags**: Categorization system
- **Favorites**: User saved properties
- **Inquiries**: Contact forms

## 🔧 Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all packages
- `pnpm start` - Start production servers
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with demo data

## 🌐 API Endpoints

- `GET /health` - Health check
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `GET /properties` - Property listings with filters
- `GET /properties/:slug` - Property details

## 📱 Frontend Routes

- `/` - Homepage
- `/ilanlar` - Property listings
- `/ilan/[slug]` - Property details

## 🚀 Deployment Notes

### cPanel MySQL Setup
- Use the provided `DATABASE_URL` format
- Ensure MySQL 8.0+ compatibility
- Grant necessary permissions to the database user

### Environment Variables
- Set `JWT_SECRET` to a strong, unique value
- Update `NEXT_PUBLIC_API_URL` for production
- Configure `SITE_URL` for your domain

## 📝 License

Private - LANDMARK Gayrimenkul Yatırım Hizmetleri
