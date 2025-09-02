import * as PrismaPkg from '@prisma/client';
import * as crypto from 'crypto';
const { PrismaClient } = PrismaPkg as unknown as { PrismaClient: new () => any };

const prisma = new PrismaClient();

async function main() {
  const passwordHash = crypto.createHash('sha256').update("Admin123!").digest('hex');

  await prisma.user.upsert({
    where: { email: "admin@landmark.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@landmark.com",
      passwordHash,
      role: "ADMIN"
    }
  });

  // one sample property so /ilanlar is not empty
  await prisma.property.upsert({
    where: { slug: "parkvadi-peyzaj-manzarali-3-plus-1" },
    update: {},
    create: {
      title: "ParkVadi Sitesi – Peyzaj Manzaralı 3+1",
      slug: "parkvadi-peyzaj-manzarali-3-plus-1",
      description: "Site içi geniş yeşil alanlar, spor sahası ve yürüyüş yolları.",
      type: "DAIRE",
      status: "SATILIK",
      price: "6950000",
      currency: "TRY",
      grossM2: 135,
      netM2: 110,
      rooms: "3+1",
      bath: 2,
      location: { lat: 39.93, lng: 32.85, address: "Bağlıca", city: "Ankara", district: "Etimesgut", neighborhood: "Bağlıca" },
      features: ["Kapalı otopark","Asansör","Güvenlik","Merkezi ısıtma","Oyun parkı","Spor sahası"],
      agent: {
        create: {
          name: "Mert Yılmaz",
          email: "mert@landmark.local",
          passwordHash
        }
      },
      published: true,
      images: {
        create: [
          { url: "/assets/projects/landmark/garden-1.webp", alt: "Site içi peyzaj", order: 1 },
          { url: "/assets/projects/landmark/garden-2.webp", alt: "Yeşil alanlar", order: 2 }
        ]
      }
    }
  });

  console.log("✅ Seed completed (admin + one property).");
}

main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
