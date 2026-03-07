import { db } from "../src/lib/db";
import { users } from "../src/lib/db/schema";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    console.log("--- Baza Yoxlanılır ---");

    try {
        const allUsers = await db.select().from(users);

        console.log(`Bazadakı istifadəçi sayı: ${allUsers.length}`);

        if (allUsers.length > 0) {
            console.log("İstifadəçilər:");
            allUsers.forEach((user, index) => {
                console.log(`${index + 1}. Username: ${user.username}, ID: ${user.id}`);
            });
        } else {
            console.log("XƏBƏRDARLIQ: Bazada heç bir istifadəçi tapılmadı!");
        }
    } catch (err) {
        console.error("Baza bağlantısında xəta baş verdi:", err);
    }

    process.exit(0);
}

main();
