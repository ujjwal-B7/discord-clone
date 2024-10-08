import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/currentProfile";

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        // initial member who creates server is assigned as admin
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server, { status: 201 });
  } catch (error) {
    console.log("SERVERS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
