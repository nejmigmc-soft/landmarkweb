# --- LANDMARK local bootstrap (Windows + XAMPP MySQL) ---
$ErrorActionPreference = "Stop"
Write-Host "`n=== LANDMARK Local Setup ===`n" -ForegroundColor Cyan

# 0) Shell kontrolü
$pnpm = (Get-Command pnpm -ErrorAction SilentlyContinue)
if (-not $pnpm) { throw "pnpm bulunamadı. Node yüklü mü? 'corepack enable' ve terminali yeniden aç." }

# 1) .env dosyaları
$DBURL = "mysql://landmar5_nejmi:Nejmi440520!@127.0.0.1:3306/landmar5_landmarkgyhdb"
Set-Content -LiteralPath ".env" -Value @"
DATABASE_URL="$DBURL"
"@ -Encoding UTF8

New-Item -ItemType Directory -Force -Path "apps/api" | Out-Null
Set-Content -LiteralPath "apps/api/.env" -Value @"
DATABASE_URL="$DBURL"
JWT_SECRET="supersecret"
"@ -Encoding UTF8
Write-Host "✓ .env dosyaları yazıldı"

# 2) MySQL kontrolü
Write-Host "MySQL calisiyor mu kontrol ediliyor..." -NoNewline
try {
  $tcp = Test-NetConnection -ComputerName 127.0.0.1 -Port 3306 -InformationLevel Quiet
} catch { $tcp = $false }
if (-not $tcp) { throw ("Port 3306 closed. Open XAMPP -> MySQL -> Start.") }
Write-Host " OK"


# 3) Bağımlılıklar (root + db package)
Write-Host "Bağımlılıklar kuruluyor (pnpm install)..." -ForegroundColor Yellow
pnpm install | Out-Null

Push-Location "packages/db"
pnpm add @prisma/client bcryptjs
pnpm add -D ts-node typescript @types/node @types/bcryptjs
Pop-Location

# 4) Prisma client generate + migrate + seed
Write-Host "Prisma generate..." -ForegroundColor Yellow
pnpm prisma:generate

Write-Host "Prisma migrate dev..." -ForegroundColor Yellow
pnpm prisma:migrate

Write-Host "Running seed..." -ForegroundColor Yellow
pnpm db:seed

# 5) Dev sunucular
Write-Host "`n✓ Kurulum tamam. Sunucular başlatılıyor..." -ForegroundColor Green
pnpm dev
