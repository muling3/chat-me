"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Image as ImageIcon,
  File,
  Link as LinkIcon,
  Download,
  Eye,
  Video,
  Music,
  Calendar,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SharedMediaProps {
  conversationId: string;
}

type MediaType = "all" | "images" | "documents" | "links" | "audio" | "video";

export default function SharedMedia({ conversationId }: SharedMediaProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<MediaType>("all");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  // Mock data for demonstration
  const mediaItems = [
    {
      id: "1",
      type: "image",
      name: "screenshot-2024.png",
      size: "2.4 MB",
      date: "2 hours ago",
      preview: "/api/placeholder/400/300",
      sender: "Dionne Rasmussen",
    },
    {
      id: "2",
      type: "document",
      name: "project-brief.pdf",
      size: "4.1 MB",
      date: "Yesterday",
      preview: null,
      sender: "Ralph Nilsen",
    },
    {
      id: "3",
      type: "link",
      name: "Figma Design File",
      url: "https://figma.com/file/abc123",
      date: "Nov 15",
      preview: null,
      sender: "Savannah Björk",
    },
    {
      id: "4",
      type: "image",
      name: "color-palette.jpg",
      size: "1.8 MB",
      date: "Nov 14",
      preview: "/api/placeholder/400/300",
      sender: "Jenny Lund",
    },
    {
      id: "5",
      type: "video",
      name: "demo-recording.mp4",
      size: "45.2 MB",
      date: "Nov 13",
      preview: null,
      sender: "Dionne Rasmussen",
    },
    {
      id: "6",
      type: "document",
      name: "meeting-notes.docx",
      size: "0.8 MB",
      date: "Nov 12",
      preview: null,
      sender: "Ralph Nilsen",
    },
    {
      id: "7",
      type: "link",
      name: "Button Component Docs",
      url: "https://design-system.com/buttons",
      date: "Nov 11",
      preview: null,
      sender: "Savannah Björk",
    },
    {
      id: "8",
      type: "image",
      name: "wireframe.png",
      size: "3.2 MB",
      date: "Nov 10",
      preview: "/api/placeholder/400/300",
      sender: "Jenny Lund",
    },
  ];

  const filteredMedia = mediaItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sender.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || item.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5" />;
      case "document":
        return <File className="h-5 w-5" />;
      case "link":
        return <LinkIcon className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "audio":
        return <Music className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "image":
        return "Image";
      case "document":
        return "Document";
      case "link":
        return "Link";
      case "video":
        return "Video";
      case "audio":
        return "Audio";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for a file..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as MediaType)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-6">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="images" className="text-xs">
                Images
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-xs">
                Docs
              </TabsTrigger>
              <TabsTrigger value="links" className="text-xs">
                Links
              </TabsTrigger>
              <TabsTrigger value="video" className="text-xs">
                Video
              </TabsTrigger>
              <TabsTrigger value="audio" className="text-xs">
                Audio
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Recent Preview Quote */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm italic text-muted-foreground">
                "Hey, did you check the new button design?"
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Yesterday, 2:30 PM
                </span>
              </div>
            </div>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Media Stats */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="p-2 bg-muted rounded">
          <div className="font-semibold">24</div>
          <div className="text-xs text-muted-foreground">Images</div>
        </div>
        <div className="p-2 bg-muted rounded">
          <div className="font-semibold">18</div>
          <div className="text-xs text-muted-foreground">Files</div>
        </div>
        <div className="p-2 bg-muted rounded">
          <div className="font-semibold">7</div>
          <div className="text-xs text-muted-foreground">Links</div>
        </div>
        <div className="p-2 bg-muted rounded">
          <div className="font-semibold">45.2</div>
          <div className="text-xs text-muted-foreground">MB Total</div>
        </div>
      </div>

      {/* Media List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Recent Media</h4>
          <Badge variant="outline" className="text-xs">
            {filteredMedia.length} items
          </Badge>
        </div>

        {filteredMedia.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <File className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No media found</p>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredMedia.map((item) => (
              <Card
                key={item.id}
                className={cn(
                  "hover:bg-accent transition-colors cursor-pointer",
                  selectedMedia === item.id && "border-primary",
                )}
                onClick={() =>
                  setSelectedMedia(item.id === selectedMedia ? null : item.id)
                }
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded",
                        item.type === "image" &&
                          "bg-blue-100 dark:bg-blue-900/30",
                        item.type === "document" &&
                          "bg-green-100 dark:bg-green-900/30",
                        item.type === "link" &&
                          "bg-purple-100 dark:bg-purple-900/30",
                        item.type === "video" &&
                          "bg-red-100 dark:bg-red-900/30",
                        item.type === "audio" &&
                          "bg-yellow-100 dark:bg-yellow-900/30",
                      )}
                    >
                      {getIconForType(item.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">
                          {item.name}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {getTypeLabel(item.type)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{item.size}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                        <span>•</span>
                        <span className="truncate">From: {item.sender}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {item.type === "link" && (
                    <div className="mt-2 pl-11">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 truncate block"
                      >
                        {item.url}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View All Button */}
        <Button variant="outline" className="w-full">
          View all shared media
        </Button>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter by Date
          </Button>
        </div>
      </div>
    </div>
  );
}
