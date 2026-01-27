"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Search, VolumeX, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface GroupInfoProps {
  conversation: any;
}

export default function GroupInfo({ conversation }: GroupInfoProps) {
  const participants = conversation.participants || [];

  return (
    <div className="space-y-6">
      {/* Participants Count */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-lg">Group Info</h4>
          <Badge variant="secondary">{participants.length} participants</Badge>
        </div>

        {/* Participants List */}
        <div className="space-y-3">
          {participants.map((participant: any) => (
            <div
              key={participant.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={participant.avatar} />
                  <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{participant.name}</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        participant.status === "online" && "bg-green-500",
                        participant.status === "away" && "bg-yellow-500",
                        participant.status === "offline" && "bg-gray-400",
                      )}
                    />
                    <span className="text-sm text-muted-foreground">
                      {participant.status}
                    </span>
                  </div>
                </div>
              </div>
              {participant.isAdmin && <Badge variant="outline">Admin</Badge>}
            </div>
          ))}
        </div>

        {/* Add Participant */}
        <Button variant="outline" className="w-full mt-4">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Participant
        </Button>
      </div>

      {/* Shared Media Preview */}
      <div>
        <h4 className="font-semibold mb-3">Shared Media</h4>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search for a file" className="pl-9" />
        </div>
        <div className="text-sm text-muted-foreground italic mb-4">
          "Hey, did you check the new button design?"
        </div>
        <Button variant="ghost" className="w-full justify-start">
          View all shared media
        </Button>
      </div>

      {/* Group Preferences */}
      <div>
        <h4 className="font-semibold mb-3">Group Preferences</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent">
            <div className="flex items-center gap-3">
              <VolumeX className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Mute Group</p>
                <p className="text-sm text-muted-foreground">
                  Turn off notifications
                </p>
              </div>
            </div>
            <Checkbox />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Private Group</p>
                <p className="text-sm text-muted-foreground">
                  Require approval to join
                </p>
              </div>
            </div>
            <Checkbox />
          </div>
        </div>
      </div>
    </div>
  );
}
