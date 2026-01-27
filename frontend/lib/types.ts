export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  status: "online" | "away" | "offline";
  lastSeen?: Date;
  role?: string;
  bio?: string;
  isAdmin?: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  read: boolean;
  sent: boolean;
  type: "text" | "image" | "file" | "system" | "voice";
  reactions?: Reaction[];
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
}

export interface Reaction {
  emoji: string;
  users: User[];
}

export interface Conversation {
  id: string;
  name: string;
  type: "direct" | "group";
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isMuted: boolean;
  isPinned?: boolean;
  lastActivity: Date;
  avatar?: string;
  description?: string;
  messages?: Message[];
}

export interface ChatLayoutProps {
  conversations?: Conversation[];
  selectedConversation?: Conversation;
  onSelectConversation?: (conversation: Conversation) => void;
  onSendMessage?: (conversationId: string, content: string) => void;
  children?: React.ReactNode;
}

export type TabType = "all" | "unread" | "groups" | "friends";
