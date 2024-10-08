"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import UserAvatar from "../UserAvatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

//here i am directly using lucide icon components as value, so while rendering i directly render the icon as it holds the icon component...but its quite different in the server channel component as there i am storing icon name as a reference so when the icon is selected then the variable is treated as a icon so i rendered Icon component as the icon
const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />,
};

export default function ServerMember({ member, server }: ServerMemberProps) {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const navigateToMemberChatInbox = () => {
    router.push(`/servers/${params?.id}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={navigateToMemberChatInbox}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserAvatar src={member.profile.imageUrl} className="w-8 h-8" />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
}
