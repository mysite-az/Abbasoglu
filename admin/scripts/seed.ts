import { db } from "../src/lib/db";
import { users } from "../src/lib/db/schema";
import { hash } from "bcrypt";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";


dotenv.config();

async function main() {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin";

    const hashedIconsPassword = await hash(password, 10);

    console.log("Seeding admin user...");

    try {
        const existing = await db.query.users.findFirst({
            where: eq(users.username, username),
        });

        if (existing) {
            await db.update(users)
                .set({ password: hashedIconsPassword })
                .where(eq(users.username, username));
            console.log(`Admin user "${username}" updated with current password from .env.`);
        } else {
            await db.insert(users).values({
                id: nanoid(),
                username,
                password: hashedIconsPassword,
            });
            console.log(`Admin user "${username}" created.`);
        }
    } catch (err) {
        console.error("Error seeding:", err);
    }


    process.exit(0);
}

main();
