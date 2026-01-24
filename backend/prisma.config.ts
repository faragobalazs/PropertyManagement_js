import "dotenv/config"

export default {
  schema: "prisma/schema.prisma",
  datasource: {
    url: "mysql://root:securepassword@localhost:3306/property_db",
  },
}