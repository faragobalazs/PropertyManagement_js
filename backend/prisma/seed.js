import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const westend = await prisma.building.create({
    data: {
      name: "Westend",
      address: "1062 Budapest, Váci út 1-3.",
      architect: "Finta József",
      owner: "TriGránit",
      year: 1999,
      levels: 3,
      webpage: "https://westend.hu/",
      email: "info@westend.hu",
      phone: "+36707054477",
    },
  });

  const mol = await prisma.building.create({
    data: {
      name: "MOL Campus",
      address: "1117 Budapest, Dombóvári út 28.",
      architect: "Foster + Partners",
      owner: "MOL Group",
      year: 2022,
      levels: 28,
      webpage: "https://www.molcampus.hu/",
      email: "campusvisitorcenter@mol.hu",
      phone: "+36000000000",
    },
  });

  const rossmann = await prisma.tenants.create({
    data: {
      name: "rossmann",
      building: "westend",
      level: 0,
      number: 5,
      sqm: 2000,
    },
  });

  const dm = await prisma.tenants.create({
    data: {
      name: "dm",
      building: "westend",
      level: 1,
      number: 12,
      sqm: 1500,
    },
  });

  const cafe = await prisma.tenants.create({
    data: {
      name: "cafe",
      building: "mol",
      level: 0,
      number: 1,
      sqm: 120,
    },
  });
}

main();
