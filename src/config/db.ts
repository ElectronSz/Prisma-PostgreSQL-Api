import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});
db.$on("query", (e) => {
  //console.log("Duration: " + e.duration + "ms");
});

export { db };
