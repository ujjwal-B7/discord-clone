import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { ChatHeader } from "@/components/chat/ChatHeader";

interface ChannelIdProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

export default async function ChannelPage({ params }: ChannelIdProps) {
  const profile = await currentProfile();

  if (!profile) return auth().redirectToSignIn();

  const channel = await db.channel.findUnique({
    where: {
      id: params?.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) return redirect("/");

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverId={channel.serverId}
        name={channel.name}
        type="channel"
      />
    </div>
  );
}
