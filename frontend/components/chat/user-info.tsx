"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Video,
  Mail,
  Calendar,
  MapPin,
  Briefcase,
  Link as LinkIcon,
  MessageSquare,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "@/lib/types";

interface UserInfoProps {
  user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
  // Mock data for demonstration
  const userDetails = {
    email:
      user.email || `${user.name.toLowerCase().replace(" ", ".")}@example.com`,
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    company: "Acme Inc.",
    position: "Senior Designer",
    joined: "January 2022",
    mutualFriends: 12,
    mutualGroups: 4,
    sharedMedia: {
      photos: 42,
      files: 18,
      links: 7,
    },
  };

  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-gray-400",
  };

  return (
    <div className="space-y-6">
      {/* User Profile Header */}
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-2xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-background",
              statusColors[user.status],
            )}
          />
        </div>

        <h3 className="text-xl font-semibold">{user.name}</h3>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div
            className={cn("w-2 h-2 rounded-full", statusColors[user.status])}
          />
          <span className="text-sm text-muted-foreground capitalize">
            {user.status}
          </span>
          {user.lastSeen && user.status === "offline" && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                Last seen {formatRelativeTime(user.lastSeen)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button variant="outline" size="sm" className="flex-col h-auto py-3">
          <MessageSquare className="h-5 w-5 mb-1" />
          <span className="text-xs">Message</span>
        </Button>
        <Button variant="outline" size="sm" className="flex-col h-auto py-3">
          <Phone className="h-5 w-5 mb-1" />
          <span className="text-xs">Audio</span>
        </Button>
        <Button variant="outline" size="sm" className="flex-col h-auto py-3">
          <Video className="h-5 w-5 mb-1" />
          <span className="text-xs">Video</span>
        </Button>
      </div>

      {/* Contact Information */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h4 className="font-semibold text-sm">Contact Information</h4>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  {userDetails.email}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">
                  {userDetails.phone}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {userDetails.location}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h4 className="font-semibold text-sm">Profile Details</h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Company & Position</p>
                  <p className="text-sm text-muted-foreground">
                    {userDetails.company} • {userDetails.position}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Connected since</p>
                  <p className="text-sm text-muted-foreground">
                    {userDetails.joined}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Privacy</p>
                  <p className="text-sm text-muted-foreground">
                    Standard encryption
                  </p>
                </div>
              </div>
              <Badge variant="outline">Verified</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shared Statistics */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold text-sm mb-3">
            Shared with {user.name}
          </h4>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-semibold">
                {userDetails.sharedMedia.photos}
              </div>
              <div className="text-xs text-muted-foreground">Photos</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {userDetails.sharedMedia.files}
              </div>
              <div className="text-xs text-muted-foreground">Files</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {userDetails.sharedMedia.links}
              </div>
              <div className="text-xs text-muted-foreground">Links</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-muted rounded">
              <div className="font-semibold">{userDetails.mutualFriends}</div>
              <div className="text-xs text-muted-foreground">
                Mutual Friends
              </div>
            </div>
            <div className="text-center p-2 bg-muted rounded">
              <div className="font-semibold">{userDetails.mutualGroups}</div>
              <div className="text-xs text-muted-foreground">Shared Groups</div>
            </div>
          </div>

          <Button variant="ghost" className="w-full mt-4" size="sm">
            <LinkIcon className="h-4 w-4 mr-2" />
            View all shared media
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20">
        <CardContent className="p-4">
          <h4 className="font-semibold text-sm text-destructive mb-3">
            Danger Zone
          </h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Block User
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Delete Conversation
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Report User
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString();
}
