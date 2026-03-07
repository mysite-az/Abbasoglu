import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";
import { login } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        console.log(`[API Login] Attempting login for user: ${username}`);

        const user = await db.query.users.findFirst({
            where: eq(users.username, username),
        });

        if (!user) {
            console.log(`[API Login] User not found: ${username}`);
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isValid = await compare(password, user.password);
        console.log(`[API Login] Password comparison for ${username}: ${isValid}`);

        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        await login({ id: user.id, username: user.username });
        console.log(`[API Login] Success! Login for ${username}`);

        return NextResponse.json({ success: true });
    } catch (_error) {
        console.error("[API Login] Error:", _error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

