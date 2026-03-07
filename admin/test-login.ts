import { db } from "../src/lib/db";
import { users } from "../src/lib/db/schema";
import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config();

async function test() {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin";

    console.log(`Checking user: ${username}`);
    console.log(`Checking password from .env: ${password}`);

    const user = await db.query.users.findFirst({
        where: eq(users.username, username),
    });

    if (!user) {
        console.log("Error: User NOT found in database!");
        process.exit(1);
    }

    const isValid = await compare(password, user.password);
    console.log(`Bcrypt compare result: ${isValid}`);

    if (isValid) {
        console.log("SUCCESS: Password matches!");
    } else {
        console.log("FAILURE: Password does NOT match. Seed might have used a different .env value.");
    }

    process.exit(0);
}

test();
