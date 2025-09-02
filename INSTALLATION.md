# LANDMARK Project - Installation Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install all dependencies
pnpm install
```

### 2. Environment Setup

```bash
# Copy environment file
cp env.example apps/api/.env

# Edit apps/api/.env with your actual values:
# - Update DATABASE_URL with your cPanel MySQL credentials
# - Set a strong JWT_SECRET
# - Verify NEXT_PUBLIC_API_URL and SITE_URL
```

### 3. Database Setup

```bash
# Generate Prisma client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate

# Seed database with demo data
pnpm db:seed
```

### 4. Start Development

```bash
# Start both API and Web concurrently
pnpm dev

# Or start individually:
pnpm --filter @landmark/api dev    # API on :3001
pnpm --filter @landmark/web dev    # Web on :3000
```

## 📁 Project Structure

```
landmark-project/
├── apps/
│   ├── web/                    # Next.js 14 frontend
│   │   ├── app/               # App Router pages
│   │   ├── components/        # UI components
│   │   ├── public/            # Static assets
│   │   └── package.json
│   └── api/                   # NestJS backend
│       ├── src/
│       │   ├── modules/       # Feature modules
│       │   └── main.ts        # App entry point
│       └── package.json
├── packages/
│   └── db/                    # Shared Prisma package
│       ├── prisma/            # Database schema & migrations
│       ├── src/               # Prisma client export
│       └── package.json
├── pnpm-workspace.yaml        # Monorepo configuration
├── package.json               # Root scripts
└── README.md                  # Project documentation
```

## 🗄️ Database Configuration

### cPanel MySQL Setup

1. **Create Database**: Create `landmar5_landmarkyhdb` in cPanel
2. **Create User**: Create `landmar5_nejmi` with appropriate permissions
3. **Update .env**: Set the correct DATABASE_URL:

```env
DATABASE_URL="mysql://landmar5_nejmi:YOUR_ACTUAL_PASSWORD@localhost:3306/landmar5_landmarkyhdb"
```

### Prisma Schema Features

- **MySQL Provider**: Optimized for cPanel hosting
- **Decimal Fields**: Price fields use `@db.Decimal(12,2)`
- **JSON Fields**: Location and features stored as JSON
- **Relationships**: Full relational model with proper constraints

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/auth/register` | User registration |
| POST | `/auth/login` | User authentication |
| GET | `/properties` | Property listings with filters |
| GET | `/properties/:slug` | Property details |

### Property Filters

- `q` - Search query
- `type` - Property type (DAIRE, VILLA, etc.)
- `status` - Sale/rental status
- `city` - City filter
- `district` - District filter
- `minPrice`/`maxPrice` - Price range
- `rooms` - Room configuration
- `page`/`pageSize` - Pagination
- `sort` - Sorting (e.g., "price:asc", "createdAt:desc")

## 🎨 Frontend Features

### Pages
- **Homepage** (`/`) - Hero section, features, CTA
- **Properties** (`/ilanlar`) - Search, filters, property grid
- **Property Detail** (`/ilan/[slug]`) - Full property information

### Components
- **UI Components**: Button, Card, Badge (shadcn/ui)
- **Navigation**: Header with logo and menu
- **Property Cards**: Responsive grid layout
- **Image Gallery**: Thumbnail navigation

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional design

## 🔧 Development Scripts

```bash
# Development
pnpm dev                    # Start both servers
pnpm --filter @landmark/api dev    # API only
pnpm --filter @landmark/web dev    # Web only

# Database
pnpm prisma:generate       # Generate Prisma client
pnpm prisma:migrate        # Run migrations
pnpm db:seed              # Seed database

# Build & Production
pnpm build                 # Build all packages
pnpm start                 # Start production servers
```

## 🚀 Deployment

### cPanel Deployment

1. **Build the project**:
   ```bash
   pnpm build
   ```

2. **Upload files** to cPanel:
   - `apps/web/.next/` → `public_html/`
   - `apps/api/dist/` → `public_html/api/`

3. **Set environment variables** in cPanel

4. **Configure domain** and SSL

### Environment Variables

```env
# Production
DATABASE_URL="mysql://user:pass@localhost:3306/database"
JWT_SECRET="your-strong-secret-here"
NEXT_PUBLIC_API_URL="https://yourdomain.com/api"
SITE_URL="https://yourdomain.com"
```

## 🐛 Troubleshooting

### Common Issues

1. **Prisma Client Error**: Run `pnpm prisma:generate`
2. **Database Connection**: Verify DATABASE_URL in `.env`
3. **Port Conflicts**: Check if ports 3000/3001 are available
4. **Dependencies**: Ensure `pnpm install` completed successfully

### Logs

- **API**: Check terminal output for NestJS logs
- **Web**: Check browser console and terminal
- **Database**: Check Prisma migration logs

## 📚 Next Steps

1. **Customize Branding**: Replace placeholder images and content
2. **Add Features**: Implement user authentication, favorites, inquiries
3. **SEO Optimization**: Add meta tags, sitemap, robots.txt
4. **Performance**: Implement image optimization, caching
5. **Analytics**: Add Google Analytics, tracking

## 🤝 Support

For questions or issues:
- Check the README.md for detailed documentation
- Review the code structure and comments
- Ensure all dependencies are properly installed
- Verify environment configuration

---

**LANDMARK Project** - Production-ready real-estate platform built with Next.js 14, NestJS, and Prisma.
