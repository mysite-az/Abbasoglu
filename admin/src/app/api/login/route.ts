import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";
import { login } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        const user = await db.query.users.findFirst({
            where: eq(users.username, username),
        });

        if (!user) {
            return NextResponse.json({ error: "Debug: İstifadəçi tapılmadı!" }, { status: 401 });
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
            return NextResponse.json({ error: "Debug: Şifrə yanlışdır!" }, { status: 401 });
        }

        await login({ id: user.id, username: user.username });
        return NextResponse.json({ success: true });
    } catch (_error: any) {
        return NextResponse.json({ error: `Debug: Server xətası: ${_error.message}` }, { status: 500 });
    }
}


