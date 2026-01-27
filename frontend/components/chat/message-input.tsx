"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Paperclip,
  Smile,
  Mic,
  Send,
  Image as ImageIcon,
  File,
  Video,
  MapPin,
  Calendar,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  conversationId: string;
  onSendMessage?: (content: string) => void;
}

export default function MessageInput({
  conversationId,
  onSendMessage,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage?.(message);
      setMessage("");
      setAttachments([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachment = (file: File) => {
    setAttachments((prev) => [...prev, file]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const emojis = ["😀", "😂", "🥰", "😎", "🤔", "👏", "🎉", "🔥", "⭐", "❤️"];

  return (
    <div className="space-y-3">
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-muted/50">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-background border rounded-md"
            >
              <File className="h-4 w-4 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate max-w-37.5">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={() => removeAttachment(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2">
        {/* Attachment Button */}
        <Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attach file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PopoverContent className="w-48 p-2" align="start">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" size="sm" className="justify-start">
                <ImageIcon className="h-4 w-4 mr-2" />
                Photo
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <File className="h-4 w-4 mr-2" />
                File
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Event
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Emoji Button */}
        <Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Smile className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add emoji</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PopoverContent className="w-48 p-2" align="start">
            <div className="grid grid-cols-5 gap-2">
              {emojis.map((emoji, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-lg"
                  onClick={() => setMessage((prev) => prev + emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Text Input */}
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            // Auto-resize textarea
            if (textareaRef.current) {
              textareaRef.current.style.height = "auto";
              textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-h-10 max-h-30 resize-none"
          rows={1}
        />

        {/* Voice/Send Button */}
        <div className="flex items-center gap-1">
          {isRecording ? (
            <>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => setIsRecording(false)}
              >
                <X className="h-5 w-5" />
              </Button>
              <div className="animate-pulse text-sm text-destructive">
                Recording...
              </div>
            </>
          ) : message.trim() || attachments.length > 0 ? (
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!message.trim() && attachments.length === 0}
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsRecording(true)}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Voice message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* Input Hints */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <div>
          Press <kbd className="px-1 py-0.5 bg-muted rounded">Enter</kbd> to
          send,{" "}
          <kbd className="px-1 py-0.5 bg-muted rounded">Shift + Enter</kbd> for
          new line
        </div>
        <div className="flex items-center gap-4">
          <span>Max file size: 100MB</span>
          <span>Supported: JPG, PNG, PDF, DOC, MP4</span>
        </div>
      </div>
    </div>
  );
}
