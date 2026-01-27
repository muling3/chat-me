"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  BellOff,
  Lock,
  Eye,
  EyeOff,
  Download,
  Trash2,
  Archive,
  Volume2,
  VolumeX,
  Hash,
  Edit,
  UserPlus,
  Shield,
  Key,
  Link as LinkIcon,
  Globe,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
  conversation: any;
}

export default function SettingsPanel({ conversation }: SettingsPanelProps) {
  const [notifications, setNotifications] = useState(!conversation.isMuted);
  const [privateChat, setPrivateChat] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);
  const [typingIndicators, setTypingIndicators] = useState(true);
  const [groupName, setGroupName] = useState(conversation.name);
  const [groupDescription, setGroupDescription] = useState(
    "Monday planning group for project discussions",
  );
  const [editingName, setEditingName] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);

  const isGroup = conversation.type === "group";

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">General Settings</CardTitle>
          <CardDescription>Configure your chat preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label
                htmlFor="notifications"
                className="flex items-center gap-2"
              >
                {notifications ? (
                  <Bell className="h-4 w-4" />
                ) : (
                  <BellOff className="h-4 w-4" />
                )}
                Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new messages
              </p>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label
                htmlFor="read-receipts"
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Read Receipts
              </Label>
              <p className="text-sm text-muted-foreground">
                Show when messages are read
              </p>
            </div>
            <Switch
              id="read-receipts"
              checked={readReceipts}
              onCheckedChange={setReadReceipts}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label
                htmlFor="typing-indicators"
                className="flex items-center gap-2"
              >
                {typingIndicators ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
                Typing Indicators
              </Label>
              <p className="text-sm text-muted-foreground">
                Show when others are typing
              </p>
            </div>
            <Switch
              id="typing-indicators"
              checked={typingIndicators}
              onCheckedChange={setTypingIndicators}
            />
          </div>
        </CardContent>
      </Card>

      {/* Group/User Specific Settings */}
      {isGroup ? (
        <>
          {/* Group Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Group Information</CardTitle>
              <CardDescription>
                Manage group details and visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="group-name"
                  className="flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Group Name
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingName(!editingName)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    {editingName ? "Save" : "Edit"}
                  </Button>
                </Label>
                {editingName ? (
                  <Input
                    id="group-name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    onBlur={() => setEditingName(false)}
                    autoFocus
                  />
                ) : (
                  <div className="px-3 py-2 border rounded-md bg-muted/50">
                    {groupName}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="group-description"
                  className="flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Description
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingDescription(!editingDescription)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    {editingDescription ? "Save" : "Edit"}
                  </Button>
                </Label>
                {editingDescription ? (
                  <Input
                    id="group-description"
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    onBlur={() => setEditingDescription(false)}
                  />
                ) : (
                  <div className="px-3 py-2 border rounded-md bg-muted/50">
                    {groupDescription}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="private-chat"
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Private Group
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Require approval to join
                  </p>
                </div>
                <Switch
                  id="private-chat"
                  checked={privateChat}
                  onCheckedChange={setPrivateChat}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Group Link
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={`https://chat.app/join/${conversation.id}`}
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Member Management */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Member Management</CardTitle>
              <CardDescription>
                Manage group members and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Member Approval</p>
                  <p className="text-sm text-muted-foreground">
                    Require admin approval for new members
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Member Invites</p>
                  <p className="text-sm text-muted-foreground">
                    Allow members to invite others
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Admin Permissions
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    Add Admin
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    View Admins
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Direct Message Settings */
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Privacy Settings</CardTitle>
            <CardDescription>
              Configure privacy for this conversation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="encryption" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  End-to-End Encryption
                </Label>
                <p className="text-sm text-muted-foreground">
                  Messages are encrypted
                </p>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Message Expiry
                </Label>
                <p className="text-sm text-muted-foreground">
                  Automatically delete messages after
                </p>
              </div>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>Never</option>
                <option>24 hours</option>
                <option>7 days</option>
                <option>30 days</option>
              </select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Add to Group
              </Label>
              <p className="text-sm text-muted-foreground">
                Create a group with this person and others
              </p>
              <Button variant="outline" className="w-full">
                Start a Group Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Management */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Data Management</CardTitle>
          <CardDescription>Manage chat data and exports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Export Chat History
          </Button>

          <Button variant="outline" className="w-full justify-start">
            <Archive className="h-4 w-4 mr-2" />
            Archive Conversation
          </Button>

          <Separator />

          <div className="space-y-2">
            <Label className="text-destructive">Danger Zone</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
              >
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Chat
              </Button>
              <Button
                variant="outline"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Chat
              </Button>
            </div>
            {isGroup && (
              <Button
                variant="outline"
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20 mt-2"
              >
                <Users className="h-4 w-4 mr-2" />
                Leave Group
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Advanced Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="auto-download">Auto-download Media</Label>
            <select
              id="auto-download"
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option>Never</option>
              <option>Wi-Fi Only</option>
              <option>Always</option>
              <option>Ask Every Time</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="media-quality">Media Quality</Label>
            <select
              id="media-quality"
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option>Auto (Recommended)</option>
              <option>High Quality</option>
              <option>Data Saver</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="storage">Local Storage</Label>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Chat Data</span>
                <span>245 MB</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                65% of 500 MB limit
              </p>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Clear Local Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
