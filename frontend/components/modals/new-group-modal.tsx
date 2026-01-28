"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Users,
  UserPlus,
  X,
  Lock,
  Globe,
  Image as ImageIcon,
  Hash,
  MessageSquare,
  Eye,
  EyeOff,
  Check,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { User as UserType } from "@/lib/types";

interface NewGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  users: UserType[];
  onCreateGroup?: (groupData: {
    name: string;
    description: string;
    members: string[];
    isPrivate: boolean;
    avatar?: string;
  }) => void;
}

export default function NewGroupModal({
  open,
  onOpenChange,
  users,
  onCreateGroup,
}: NewGroupModalProps) {
  const [step, setStep] = useState<"select" | "setup">("select");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [groupAvatar, setGroupAvatar] = useState<string | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setStep("select");
      setSelectedUsers([]);
      setGroupName("");
      setGroupDescription("");
      setIsPrivate(true);
      setGroupAvatar(null);
      setSearchQuery("");
    }
  }, [open]);

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.role?.toLowerCase().includes(query),
    );
  }, [users, searchQuery]);

  // Handle user selection
  const toggleUserSelection = (user: UserType) => {
    if (selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
    } else {
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  // Check if a user is selected
  const isUserSelected = (userId: string) => {
    return selectedUsers.some((user) => user.id === userId);
  };

  // Move to setup step
  const handleNextStep = () => {
    if (selectedUsers.length >= 2) {
      setStep("setup");
    }
  };

  // Move back to selection step
  const handleBack = () => {
    setStep("select");
  };

  // Create the group
  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedUsers.length < 2) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const groupData = {
        name: groupName,
        description: groupDescription,
        members: selectedUsers.map((user) => user.id),
        isPrivate,
        avatar: groupAvatar || undefined,
      };

      console.log("Creating group:", groupData);

      // Call the callback
      onCreateGroup?.(groupData);

      // Reset form and close modal
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create group:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setStep("select");
    setSelectedUsers([]);
    setGroupName("");
    setGroupDescription("");
    setIsPrivate(true);
    setGroupAvatar(null);
    setSearchQuery("");
  };

  // Close modal and reset
  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  // Generate group avatar based on group name
  const generateGroupAvatar = () => {
    if (groupName.trim()) {
      const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(groupName)}&size=100&backgroundColor=2563eb`;
      setGroupAvatar(avatar);
    }
  };

  const renderSelectStep = () => (
    <div className="space-y-4">
      {/* Selected users preview - FIXED: Added max-height and overflow */}
      {selectedUsers.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">
              Selected ({selectedUsers.length})
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedUsers([])}
              className="h-7 text-xs"
            >
              Clear All
            </Button>
          </div>
          {/* FIXED: Added max-height and overflow for selected users */}
          <div className="max-h-20 overflow-y-auto pr-1">
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((user) => (
                <Badge
                  key={user.id}
                  variant="secondary"
                  className="gap-1 pl-1 pr-2 py-1.5 max-w-full"
                >
                  <Avatar className="h-5 w-5 shrink-0">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xs">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs truncate max-w-20">
                    {user.name.split(" ")[0]}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-4 w-4 ml-1 shrink-0 hover:bg-transparent"
                    onClick={() => toggleUserSelection(user)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for friends..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Friends list */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">
            Friends ({filteredUsers.length})
          </Label>
          <Badge variant="outline">{selectedUsers.length} selected</Badge>
        </div>

        <ScrollArea className="h-50">
          <div className="space-y-1 pr-4">
            {filteredUsers.map((user) => {
              const selected = isUserSelected(user.id);
              return (
                <div
                  key={user.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                    selected
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-accent",
                  )}
                  onClick={() => toggleUserSelection(user)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selected && (
                        <div className="absolute inset-0 bg-primary/20 rounded-full" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.mutualFriends || 0} mutual friends
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {user.isFriend && (
                      <Badge variant="outline" className="text-xs">
                        Friend
                      </Badge>
                    )}
                    <div
                      className={cn(
                        "h-5 w-5 rounded-full border flex items-center justify-center shrink-0",
                        selected
                          ? "bg-primary border-primary"
                          : "border-muted-foreground/30",
                      )}
                    >
                      {selected && (
                        <Check className="h-3 w-3 text-primary-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );

  const renderSetupStep = () => (
    <div className="space-y-4">
      {/* Step indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button
          size="icon"
          variant="ghost"
          onClick={handleBack}
          className="h-7 w-7"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>Step 2 of 2</span>
      </div>

      {/* Group avatar */}
      <div className="flex flex-col items-center space-y-3">
        <div className="relative">
          <Avatar className="h-20 w-20">
            {groupAvatar ? (
              <AvatarImage src={groupAvatar} />
            ) : (
              <AvatarFallback className="text-xl">
                <Users className="h-8 w-8" />
              </AvatarFallback>
            )}
          </Avatar>
          <Button
            size="icon"
            variant="outline"
            className="absolute -bottom-1 -right-1 h-7 w-7"
            onClick={generateGroupAvatar}
            disabled={!groupName.trim()}
          >
            <ImageIcon className="h-3 w-3" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={generateGroupAvatar}
          disabled={!groupName.trim()}
          className="text-xs"
        >
          Generate group avatar
        </Button>
      </div>

      {/* Group name - FIXED: Added max-width and text-overflow */}
      <div className="space-y-2">
        <Label
          htmlFor="group-name"
          className="flex items-center justify-between"
        >
          <span className="truncate">Group Name *</span>
          <span className="text-xs font-normal text-muted-foreground shrink-0">
            {groupName.length}/50
          </span>
        </Label>
        <Input
          id="group-name"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              setGroupName(e.target.value);
            }
          }}
          className={cn(
            "w-full",
            groupName.length >= 45 && "border-amber-500",
            groupName.length >= 50 && "border-destructive",
          )}
        />
        {groupName.length >= 45 && (
          <p className="text-xs text-amber-600">
            {50 - groupName.length} characters remaining
          </p>
        )}
      </div>

      {/* Group description */}
      <div className="space-y-2">
        <Label
          htmlFor="group-description"
          className="flex items-center justify-between"
        >
          <span>Description (Optional)</span>
          <span className="text-xs font-normal text-muted-foreground">
            {groupDescription.length}/200
          </span>
        </Label>
        <Textarea
          id="group-description"
          placeholder="What's this group about?"
          value={groupDescription}
          onChange={(e) => {
            if (e.target.value.length <= 200) {
              setGroupDescription(e.target.value);
            }
          }}
          className="resize-none min-h-20 max-h-30"
        />
      </div>

      {/* Privacy settings */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="space-y-0.5 min-w-0">
            <Label className="flex items-center gap-2 truncate">
              {isPrivate ? (
                <Lock className="h-4 w-4 shrink-0" />
              ) : (
                <Globe className="h-4 w-4 shrink-0" />
              )}
              <span className="truncate">Privacy Settings</span>
            </Label>
            <p className="text-sm text-muted-foreground truncate">
              {isPrivate
                ? "Only added members can join"
                : "Anyone can join with the link"}
            </p>
          </div>
          <Switch
            checked={isPrivate}
            onCheckedChange={setIsPrivate}
            className="shrink-0"
          />
        </div>

        <div className="text-sm text-muted-foreground p-3 border rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            {isPrivate ? (
              <EyeOff className="h-4 w-4 shrink-0" />
            ) : (
              <Eye className="h-4 w-4 shrink-0" />
            )}
            <span className="font-medium truncate">
              {isPrivate ? "Private Group" : "Public Group"}
            </span>
          </div>
          <p className="wrap-break-word">
            {isPrivate
              ? "Members must be invited by group admins. Group will not appear in search results."
              : "Anyone with the link can join. Group will appear in search results."}
          </p>
        </div>
      </div>

      {/* Selected members preview - FIXED: Added proper height constraint */}
      <div className="space-y-2 pt-2">
        <Label className="flex items-center justify-between">
          <span>Selected Members ({selectedUsers.length})</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="h-7 text-xs"
          >
            Edit
          </Button>
        </Label>
        {/* FIXED: Added max-height and overflow-auto for selected members grid */}
        <div className="max-h-32 overflow-y-auto pr-1">
          <div className="grid grid-cols-3 gap-2">
            {selectedUsers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center p-2 border rounded-lg min-w-0"
              >
                <Avatar className="h-8 w-8 mb-1 shrink-0">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xs">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-xs font-medium truncate w-full text-center">
                  {user.name.split(" ")[0]}
                </p>
                <p className="text-[10px] text-muted-foreground truncate w-full text-center">
                  {user.role?.split(" ")[0] || "Member"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-125 max-h-[85vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center gap-2 truncate">
            {step === "select" ? (
              <>
                <Users className="h-5 w-5 shrink-0" />
                <span className="truncate">Create New Group</span>
              </>
            ) : (
              <>
                <Hash className="h-5 w-5 shrink-0" />
                <span className="truncate">Group Settings</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription className="truncate">
            {step === "select"
              ? "Select members to add to your group (minimum 2)"
              : "Configure your group settings and details"}
          </DialogDescription>
        </DialogHeader>

        {/* Main content with fixed height and scrolling */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-1">
            {step === "select" ? renderSelectStep() : renderSetupStep()}
          </div>
        </ScrollArea>

        {/* Fixed footer always visible */}
        <DialogFooter className="shrink-0 pt-4 border-t">
          <div className="flex items-center justify-between w-full">
            {step === "select" ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  size="sm"
                  className="h-9"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={selectedUsers.length < 2}
                  size="sm"
                  className="h-9"
                >
                  Next
                  <UserPlus className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleBack}
                  size="sm"
                  className="h-9"
                >
                  Back
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  disabled={
                    !groupName.trim() || selectedUsers.length < 2 || isLoading
                  }
                  size="sm"
                  className="h-9"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Group
                      <MessageSquare className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
