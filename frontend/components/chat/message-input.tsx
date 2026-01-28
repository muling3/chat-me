"use client";

import React, { useState, useRef, KeyboardEvent, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Paperclip,
  Smile,
  Mic,
  Image as ImageIcon,
  File,
  Video,
  MapPin,
  Calendar,
  X,
  Camera,
  Gift,
  Code,
  AtSign,
  Bold,
  Italic,
  Volume2,
  SendHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  conversationId: string;
  onSendMessage?: (content: string) => void;
  onTyping?: (isTyping: boolean) => void;
  disabled?: boolean;
}

export default function MessageInput({
  conversationId,
  onSendMessage,
  onTyping,
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [textFormat, setTextFormat] = useState<
    "normal" | "bold" | "italic" | "code"
  >("normal");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Emojis
  const emojis = ["😀", "😂", "🥰", "😎", "🤔", "👏", "🎉", "🔥", "⭐", "❤️"];

  // Text formatting options
  const formattingOptions = [
    { type: "bold" as const, icon: Bold, label: "Bold", markdown: "**text**" },
    {
      type: "italic" as const,
      icon: Italic,
      label: "Italic",
      markdown: "*text*",
    },
    { type: "code" as const, icon: Code, label: "Code", markdown: "`code`" },
  ];

  // Handle typing state
  useEffect(() => {
    if (onTyping) {
      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
        onTyping(false);
      }, 1000);

      if (message.trim() && !isTyping) {
        setIsTyping(true);
        onTyping(true);
      }

      return () => clearTimeout(typingTimeout);
    }
  }, [message, onTyping]);

  const handleSend = () => {
    if ((message.trim() || attachments.length > 0) && !disabled) {
      const formattedMessage = applyTextFormatting(message);
      onSendMessage?.(formattedMessage);
      setMessage("");
      setAttachments([]);
      setIsTyping(false);
      if (onTyping) onTyping(false);

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const applyTextFormatting = (text: string) => {
    switch (textFormat) {
      case "bold":
        return `**${text}**`;
      case "italic":
        return `*${text}*`;
      case "code":
        return `\`${text}\``;
      default:
        return text;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === "Enter" && e.shiftKey) {
      // Allow new line
      return;
    } else if (e.key === "b" && e.ctrlKey) {
      e.preventDefault();
      setTextFormat(textFormat === "bold" ? "normal" : "bold");
    } else if (e.key === "i" && e.ctrlKey) {
      e.preventDefault();
      setTextFormat(textFormat === "italic" ? "normal" : "italic");
    } else if (e.key === "e" && e.ctrlKey) {
      e.preventDefault();
      // Open emoji picker
    }
  };

  const handleAttachment = (file: File) => {
    if (file.size > 100 * 1024 * 1024) {
      // 100MB limit
      alert("File size exceeds 100MB limit");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "video/mp4",
      "audio/mpeg",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("File type not supported");
      return;
    }

    setAttachments((prev) => [...prev, file]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);

    // Simulate recording timer
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    // Simulate sending voice message
    if (recordingTime >= 1) {
      console.log(`Voice message recorded: ${recordingTime}s`);
      // In real app, you would upload the audio file
    }

    setRecordingTime(0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    textareaRef.current?.focus();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(handleAttachment);
    }
    e.target.value = ""; // Reset input
  };

  return (
    <div className="space-y-3">
      {/* Text Formatting Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1">
          {formattingOptions.map((option) => (
            <TooltipProvider key={option.type}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                      "h-7 w-7",
                      textFormat === option.type &&
                        "bg-accent text-accent-foreground",
                    )}
                    onClick={() =>
                      setTextFormat(
                        textFormat === option.type ? "normal" : option.type,
                      )
                    }
                  >
                    <option.icon className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {option.label} (Ctrl+{option.type.charAt(0).toUpperCase()})
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}

          <Popover>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-7 w-7">
                      <AtSign className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mention someone</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <PopoverContent className="w-48 p-2">
              <div className="text-sm text-muted-foreground p-2">
                Type @ to mention users in the chat
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-1">
          <Badge variant="outline" className="text-xs">
            {message.length}/2000
          </Badge>
        </div>
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-background border rounded-md group"
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
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeAttachment(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setAttachments([])}
          >
            Clear All
          </Button>
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
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10"
                    disabled={disabled}
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attach file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PopoverContent className="w-56 p-2" align="start">
            <div className="space-y-1">
              <label htmlFor="file-upload">
                <div className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer">
                  <File className="h-4 w-4" />
                  <span className="text-sm">Upload Files</span>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.doc,.docx,.txt,audio/*,video/*"
                />
              </label>

              <div className="grid grid-cols-2 gap-1 pt-1">
                <Button variant="ghost" size="sm" className="justify-start">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" className="justify-start">
                  <Camera className="h-4 w-4 mr-2" />
                  Camera
                </Button>
                <Button variant="ghost" size="sm" className="justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </Button>
                <Button variant="ghost" size="sm" className="justify-start">
                  <Gift className="h-4 w-4 mr-2" />
                  GIF
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
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              if (e.target.value.length <= 2000) {
                setMessage(e.target.value);
              }
              // Auto-resize textarea
              if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              disabled
                ? "Select a conversation to start chatting..."
                : "Type a message..."
            }
            className={cn(
              "min-h-10 max-h-30 resize-none pr-12",
              textFormat === "bold" && "font-bold",
              textFormat === "italic" && "italic",
              textFormat === "code" && "font-mono bg-muted",
              disabled && "cursor-not-allowed opacity-50",
            )}
            rows={1}
            disabled={disabled}
          />

          {/* Character counter */}
          {message.length > 1800 && (
            <div
              className={cn(
                "absolute bottom-2 right-12 text-xs",
                message.length > 1900
                  ? "text-destructive"
                  : "text-muted-foreground",
              )}
            >
              {2000 - message.length}
            </div>
          )}
        </div>

        {/* Voice/Send Button */}
        <div className="flex items-center gap-1">
          {isRecording ? (
            <div className="flex items-center gap-2 animate-pulse">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-destructive animate-ping"></div>
                <div className="h-2 w-2 rounded-full bg-destructive animate-ping delay-75"></div>
                <div className="h-2 w-2 rounded-full bg-destructive animate-ping delay-150"></div>
              </div>
              <span className="text-sm font-medium text-destructive">
                {formatRecordingTime(recordingTime)}
              </span>
              <Button
                size="icon"
                variant="destructive"
                onClick={stopRecording}
                className="h-10 w-10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : message.trim() || attachments.length > 0 ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={
                      disabled || (!message.trim() && attachments.length === 0)
                    }
                    className="h-10 w-10 bg-primary hover:bg-primary/90"
                  >
                    <SendHorizontal className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send message (Enter)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={startRecording}
                    disabled={disabled}
                    className="h-10 w-10"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Voice message (Hold to record)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* Input Hints & Features */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd>
            <span>to send</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
              Shift + Enter
            </kbd>
            <span>for new line</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl + B</kbd>
            <span>bold</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span>Max file size: 100MB</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Volume2 className="h-3 w-3" />
            Voice messages: {recordingTime > 0 ? "Ready" : "Hold mic"}
          </span>
        </div>
      </div>
    </div>
  );
}
