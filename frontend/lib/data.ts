import { Conversation, Message, User } from "./types";

// Current user
export const currentUser: User = {
  id: "current-user",
  name: "You",
  avatar: "/avatars/you.jpg",
  status: "online",
  role: "Full Stack Developer",
  bio: "Building awesome things with Next.js",
};

// Mock users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/avatars/alex.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "UX Designer at TechCorp",
    bio: "Creating beautiful user experiences",
    isAdmin: false,
    isFriend: true,
    mutualFriends: 12,
    mutualGroups: 4,
  },
  {
    id: "user2",
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    avatar: "/avatars/sarah.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "Frontend Developer",
    bio: "React enthusiast | Coffee lover",
    isAdmin: false,
    isFriend: true,
    mutualFriends: 8,
    mutualGroups: 2,
  },
  {
    id: "user3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "/avatars/michael.jpg",
    status: "away",
    lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    role: "Product Manager",
    bio: "Building products that matter",
    isAdmin: false,
    isFriend: true,
    mutualFriends: 6,
    mutualGroups: 3,
  },
  {
    id: "user4",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    avatar: "/avatars/emma.jpg",
    status: "offline",
    lastSeen: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    role: "Backend Engineer",
    bio: "Scaling systems and solving problems",
    isAdmin: false,
    isFriend: true,
    mutualFriends: 10,
    mutualGroups: 2,
  },
  {
    id: "user5",
    name: "David Rodriguez",
    email: "david.rodriguez@example.com",
    avatar: "/avatars/david.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "DevOps Specialist",
    bio: "Automating everything | Kubernetes fan",
    isAdmin: false,
    isFriend: true,
    mutualFriends: 5,
    mutualGroups: 1,
  },
  {
    id: "user6",
    name: "Lisa Park",
    email: "lisa.park@example.com",
    avatar: "/avatars/lisa.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "Data Scientist",
    bio: "ML models and data visualization",
    isAdmin: false,
    isFriend: true,
    mutualFriends: 7,
    mutualGroups: 3,
  },
  {
    id: "user7",
    name: "James Taylor",
    email: "james.taylor@example.com",
    avatar: "/avatars/james.jpg",
    status: "away",
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    role: "QA Engineer",
    bio: "Breaking things professionally",
    isAdmin: false,
    isFriend: true,
    mutualFriends: 4,
    mutualGroups: 2,
  },
  {
    id: "user8",
    name: "Olivia Martin",
    email: "olivia.martin@example.com",
    avatar: "/avatars/olivia.jpg",
    status: "offline",
    lastSeen: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    role: "Marketing Director",
    bio: "Telling brand stories",
    isAdmin: false,
    isFriend: true,
    mutualFriends: 15,
    mutualGroups: 5,
  },
  {
    id: "user9",
    name: "Ryan Kim",
    email: "ryan.kim@example.com",
    avatar: "/avatars/ryan.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "Full Stack Developer",
    bio: "TypeScript | React | Node.js",
    isAdmin: false,
    isFriend: true,
    mutualFriends: 9,
    mutualGroups: 3,
  },
  {
    id: "user10",
    name: "Sophia Garcia",
    email: "sophia.garcia@example.com",
    avatar: "/avatars/sophia.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "Content Strategist",
    bio: "Words that convert | SEO expert",
    isAdmin: false,
    isFriend: true,
    mutualFriends: 11,
    mutualGroups: 4,
  },
  // New users - Non-friends (suggestions)
  {
    id: "user11",
    name: "Daniel Lee",
    email: "daniel.lee@example.com",
    avatar: "/avatars/daniel.jpg",
    status: "away",
    lastSeen: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    role: "Mobile Developer",
    bio: "iOS & Android | Flutter expert | UI/UX enthusiast",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 5,
    mutualGroups: 2,
  },
  {
    id: "user12",
    name: "Maya Patel",
    email: "maya.patel@example.com",
    avatar: "/avatars/maya.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "AI Researcher",
    bio: "Machine Learning | NLP | Computer Vision",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 1,
    mutualGroups: 0,
  },
  {
    id: "user13",
    name: "Chris Thompson",
    email: "chris.thompson@example.com",
    avatar: "/avatars/chris.jpg",
    status: "offline",
    lastSeen: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    role: "System Architect",
    bio: "Distributed systems | Microservices | Cloud native",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 8,
    mutualGroups: 3,
  },
  {
    id: "user14",
    name: "Nina Williams",
    email: "nina.williams@example.com",
    avatar: "/avatars/nina.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "Product Designer",
    bio: "Design systems | User research | Prototyping",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 6,
    mutualGroups: 2,
  },
  {
    id: "user15",
    name: "Kevin Zhang",
    email: "kevin.zhang@example.com",
    avatar: "/avatars/kevin.jpg",
    status: "away",
    lastSeen: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
    role: "Security Engineer",
    bio: "Cybersecurity | Penetration testing | Threat analysis",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 4,
    mutualGroups: 1,
  },
  {
    id: "user16",
    name: "Isabella Rossi",
    email: "isabella.rossi@example.com",
    avatar: "/avatars/isabella.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "Data Analyst",
    bio: "SQL | Tableau | Business intelligence",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 9,
    mutualGroups: 4,
  },
  {
    id: "user17",
    name: "Marcus Brown",
    email: "marcus.brown@example.com",
    avatar: "/avatars/marcus.jpg",
    status: "offline",
    lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    role: "Project Manager",
    bio: "Agile methodology | Team leadership | Risk management",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 11,
    mutualGroups: 3,
  },
  {
    id: "user18",
    name: "Aisha Khan",
    email: "aisha.khan@example.com",
    avatar: "/avatars/aisha.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "DevOps Engineer",
    bio: "CI/CD | Docker | AWS | Infrastructure as code",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 7,
    mutualGroups: 2,
  },
  {
    id: "user19",
    name: "Tom Anderson",
    email: "tom.anderson@example.com",
    avatar: "/avatars/tom.jpg",
    status: "away",
    lastSeen: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    role: "Frontend Lead",
    bio: "React | Vue | Performance optimization",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 12,
    mutualGroups: 5,
  },
  {
    id: "user20",
    name: "Grace Davis",
    email: "grace.davis@example.com",
    avatar: "/avatars/grace.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "UX Researcher",
    bio: "User testing | Persona development | Usability studies",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 3,
    mutualGroups: 1,
  },
  // Additional users to make 30 total
  {
    id: "user21",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    avatar: "/avatars/robert.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "Backend Developer",
    bio: "Node.js | Python | Database optimization",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 2,
    mutualGroups: 1,
  },
  {
    id: "user22",
    name: "Sophie Clark",
    email: "sophie.clark@example.com",
    avatar: "/avatars/sophie.jpg",
    status: "away",
    lastSeen: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    role: "Product Manager",
    bio: "Product strategy | User experience | Market research",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 4,
    mutualGroups: 2,
  },
  {
    id: "user23",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    avatar: "/avatars/ahmed.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "Full Stack Engineer",
    bio: "JavaScript | TypeScript | Cloud architecture",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 6,
    mutualGroups: 3,
  },
  {
    id: "user24",
    name: "Elena Rodriguez",
    email: "elena.rodriguez@example.com",
    avatar: "/avatars/elena.jpg",
    status: "offline",
    lastSeen: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    role: "Data Engineer",
    bio: "Big data | ETL pipelines | Data warehousing",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 8,
    mutualGroups: 2,
  },
  {
    id: "user25",
    name: "Benjamin Carter",
    email: "benjamin.carter@example.com",
    avatar: "/avatars/benjamin.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "CTO & Co-founder",
    bio: "Tech leadership | Startup growth | Team building",
    isAdmin: true,
    isFriend: false,
    mutualFriends: 15,
    mutualGroups: 6,
  },
  {
    id: "user26",
    name: "Zara Malik",
    email: "zara.malik@example.com",
    avatar: "/avatars/zara.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "UI/UX Designer",
    bio: "Visual design | Interaction design | Design thinking",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 5,
    mutualGroups: 2,
  },
  {
    id: "user27",
    name: "Samuel Green",
    email: "samuel.green@example.com",
    avatar: "/avatars/samuel.jpg",
    status: "away",
    lastSeen: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    role: "QA Lead",
    bio: "Test automation | Quality assurance | Process improvement",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 7,
    mutualGroups: 3,
  },
  {
    id: "user28",
    name: "Lily Chen",
    email: "lily.chen@example.com",
    avatar: "/avatars/lily.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "Growth Marketer",
    bio: "Digital marketing | SEO | Conversion optimization",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 10,
    mutualGroups: 4,
  },
  {
    id: "user29",
    name: "Oscar Martinez",
    email: "oscar.martinez@example.com",
    avatar: "/avatars/oscar.jpg",
    status: "offline",
    lastSeen: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    role: "System Administrator",
    bio: "Network security | Server management | IT infrastructure",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 3,
    mutualGroups: 1,
  },
  {
    id: "user30",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    avatar: "/avatars/priya.jpg",
    status: "online",
    lastSeen: new Date(),
    role: "Machine Learning Engineer",
    bio: "Deep learning | Model deployment | MLOps",
    isAdmin: false,
    isFriend: false,
    mutualFriends: 4,
    mutualGroups: 2,
  },
];

// Helper functions
export const getAllUsers = async (limit: number = 20): Promise<User[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockUsers.slice(0, limit);
};

export const searchUsers = async (query: string): Promise<User[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!query.trim()) {
    return mockUsers.slice(0, 10);
  }

  const searchTerm = query.toLowerCase();
  return mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm) ||
      user.role?.toLowerCase().includes(searchTerm) ||
      user.bio?.toLowerCase().includes(searchTerm),
  );
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockUsers.find((user) => user.id === id);
};

export const sendFriendRequest = async (userId: string): Promise<boolean> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  console.log(`Friend request sent to user ${userId}`);

  // Update user status locally
  const user = mockUsers.find((u) => u.id === userId);
  if (user) {
    user.isFriend = true;
  }

  return true;
};

export const startConversation = async (
  userId: string,
): Promise<{ success: boolean; conversationId?: string }> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 600));
  console.log(`Starting conversation with user ${userId}`);
  return { success: true, conversationId: `conv_${Date.now()}` };
};

export const getFriends = async (): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockUsers.filter((user) => user.isFriend);
};

export const getSuggestions = async (): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockUsers.filter((user) => !user.isFriend);
};

// Get user counts for UI
export const getUserCounts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    total: mockUsers.length,
    friends: mockUsers.filter((u) => u.isFriend).length,
    online: mockUsers.filter((u) => u.status === "online").length,
    suggestions: mockUsers.filter((u) => !u.isFriend).length,
  };
};

// Mock messages for conversations
const generateMessages = (
  participant1: User,
  participant2: User,
  count: number = 8,
): Message[] => {
  const messages: Message[] = [];
  const baseTime = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days ago

  const messagePairs = [
    ["Hey! How's it going?", "Good! Just finished the project. You?"],
    [
      "Awesome! I'm working on the new dashboard design.",
      "Nice! Can I see some previews?",
    ],
    [
      "Sure, I'll send you the Figma link. What do you think about dark mode?",
      "Love it! Dark mode is definitely the way to go.",
    ],
    [
      "Great! I'll implement it this week.",
      "Let me know if you need any help with the implementation.",
    ],
    [
      "Will do! Btw, are we still meeting tomorrow?",
      "Yes, 3 PM works perfectly for me.",
    ],
    [
      "Perfect! I'll prepare the presentation.",
      "Looking forward to it! See you then.",
    ],
    ["Just sent you the meeting invite.", "Got it! Thanks for organizing."],
    ["No problem! Talk to you tomorrow.", "See you! Have a great day."],
  ];

  for (let i = 0; i < count; i++) {
    const isUser1 = i % 2 === 0;
    const timeOffset = i * 2 * 60 * 60 * 1000; // 2 hours apart
    const [msg1, msg2] = messagePairs[i % messagePairs.length];

    messages.push({
      id: `msg_${participant1.id}_${participant2.id}_${i}`,
      content: isUser1 ? msg1 : msg2,
      sender: isUser1 ? participant1 : participant2,
      timestamp: new Date(baseTime + timeOffset),
      read: i < count - 2, // Last 2 messages might be unread
      sent: true,
      type: "text",
      reactions:
        i % 3 === 0
          ? [
              { emoji: "👍", users: [participant1] },
              { emoji: "❤️", users: [participant2] },
            ]
          : undefined,
    });
  }

  return messages;
};

// generate more dynamic unread counts
const getRandomUnreadCount = () => {
  const rand = Math.random();
  if (rand < 0.4) return 0; // 40% chance no unread
  if (rand < 0.7) return 1; // 30% chance 1 unread
  if (rand < 0.85) return 2; // 15% chance 2 unread
  if (rand < 0.95) return 3; // 10% chance 3 unread
  return 4 + Math.floor(Math.random() * 10); // 5% chance 4+ unread
};

// Updated mock conversations with better unread counts
export const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Alex Johnson",
    type: "direct",
    participants: [mockUsers[0]],
    lastMessage: {
      id: "msg1_last",
      content:
        "Hey! Are we still meeting tomorrow at 3 PM for the design review? I have some new mockups to show you!",
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      sent: true,
      type: "text",
    },
    unreadCount: 2,
    isMuted: false,
    isPinned: true,
    lastActivity: new Date(Date.now() - 5 * 60 * 1000),
    avatar: "/avatars/alex.jpg",
    messages: generateMessages(mockUsers[0], currentUser, 8),
  },
  {
    id: "2",
    name: "Sarah Miller",
    type: "direct",
    participants: [mockUsers[1]],
    lastMessage: {
      id: "msg2_last",
      content:
        "Just pushed the latest changes to the repo. Can you review when you get a chance? There's a critical bug fix in there.",
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: false,
      sent: true,
      type: "text",
    },
    unreadCount: 1,
    isMuted: false,
    isPinned: false,
    lastActivity: new Date(Date.now() - 15 * 60 * 1000),
    avatar: "/avatars/sarah.jpg",
    messages: generateMessages(mockUsers[1], currentUser, 10),
  },
  {
    id: "3",
    name: "Michael Chen",
    type: "direct",
    participants: [mockUsers[2]],
    lastMessage: {
      id: "msg3_last",
      content:
        "The new feature specs are ready! Can we sync tomorrow morning? I've scheduled a meeting at 10 AM.",
      sender: mockUsers[2],
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      read: false,
      sent: true,
      type: "text",
    },
    unreadCount: 3,
    isMuted: false,
    isPinned: false,
    lastActivity: new Date(Date.now() - 45 * 60 * 1000),
    avatar: "/avatars/michael.jpg",
    messages: generateMessages(mockUsers[2], currentUser, 6),
  },
  {
    id: "4",
    name: "Emma Wilson",
    type: "direct",
    participants: [mockUsers[3]],
    lastMessage: {
      id: "msg4_last",
      content:
        "Thanks for helping with the database optimization! Performance improved by 40%! 🎉 The team is super impressed!",
      sender: currentUser,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
      sent: true,
      type: "text",
    },
    unreadCount: 0,
    isMuted: false,
    isPinned: true,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    avatar: "/avatars/emma.jpg",
    messages: generateMessages(mockUsers[3], currentUser, 9),
  },
  {
    id: "5",
    name: "David Rodriguez",
    type: "direct",
    participants: [mockUsers[4]],
    lastMessage: {
      id: "msg5_last",
      content:
        "The deployment pipeline is now fully automated! 🚀 Just deployed to production in under 2 minutes!",
      sender: mockUsers[4],
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
      sent: true,
      type: "text",
    },
    unreadCount: 1,
    isMuted: true,
    isPinned: false,
    lastActivity: new Date(Date.now() - 30 * 60 * 1000),
    avatar: "/avatars/david.jpg",
    messages: generateMessages(mockUsers[4], currentUser, 7),
  },
  {
    id: "6",
    name: "Lisa Park",
    type: "direct",
    participants: [mockUsers[5]],
    lastMessage: {
      id: "msg6_last",
      content:
        "Check out this cool visualization I made with the new dataset 📊 It shows some really interesting patterns!",
      sender: mockUsers[5],
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      read: true,
      sent: true,
      type: "text",
      attachments: [
        { id: "att1", name: "data_viz.png", type: "image/png", size: 2450000 },
      ],
    },
    unreadCount: 0,
    isMuted: false,
    isPinned: false,
    lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
    avatar: "/avatars/lisa.jpg",
    messages: generateMessages(mockUsers[5], currentUser, 8),
  },
  {
    id: "7",
    name: "James Taylor",
    type: "direct",
    participants: [mockUsers[6]],
    lastMessage: {
      id: "msg7_last",
      content:
        "Found a critical bug in the checkout flow. Should we schedule an emergency fix? This is blocking users from completing purchases.",
      sender: mockUsers[6],
      timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      read: false,
      sent: true,
      type: "text",
    },
    unreadCount: 2,
    isMuted: false,
    isPinned: false,
    lastActivity: new Date(Date.now() - 25 * 60 * 1000),
    avatar: "/avatars/james.jpg",
    messages: generateMessages(mockUsers[6], currentUser, 5),
  },
  {
    id: "8",
    name: "Olivia Martin",
    type: "direct",
    participants: [mockUsers[7]],
    lastMessage: {
      id: "msg8_last",
      content:
        "The campaign launch was a huge success! We got 150% more signups than expected! 🎊 Let's celebrate next week!",
      sender: currentUser,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
      sent: true,
      type: "text",
    },
    unreadCount: 0,
    isMuted: false,
    isPinned: false,
    lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    avatar: "/avatars/olivia.jpg",
    messages: generateMessages(mockUsers[7], currentUser, 6),
  },
  {
    id: "9",
    name: "Ryan Kim",
    type: "direct",
    participants: [mockUsers[8]],
    lastMessage: {
      id: "msg9_last",
      content:
        "Just finished implementing the real-time notifications feature! Works like a charm 🔔 Users are loving it already!",
      sender: mockUsers[8],
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      read: false,
      sent: true,
      type: "text",
    },
    unreadCount: 5,
    isMuted: false,
    isPinned: true,
    lastActivity: new Date(Date.now() - 10 * 60 * 1000),
    avatar: "/avatars/ryan.jpg",
    messages: generateMessages(mockUsers[8], currentUser, 10),
  },
  {
    id: "10",
    name: "Sophia Garcia",
    type: "direct",
    participants: [mockUsers[9]],
    lastMessage: {
      id: "msg10_last",
      content:
        "Can you review the new blog post draft about AI trends? I think it needs your technical perspective! It's about 2000 words.",
      sender: mockUsers[9],
      timestamp: new Date(Date.now() - 50 * 60 * 1000), // 50 minutes ago
      read: true,
      sent: true,
      type: "text",
    },
    unreadCount: 0,
    isMuted: false,
    isPinned: false,
    lastActivity: new Date(Date.now() - 50 * 60 * 1000),
    avatar: "/avatars/sophia.jpg",
    messages: generateMessages(mockUsers[9], currentUser, 7),
  },
  // Group conversations with more realistic last messages
  {
    id: "11",
    name: "Design Team",
    type: "group",
    participants: [
      mockUsers[0],
      mockUsers[1],
      mockUsers[5],
      mockUsers[8],
      currentUser,
    ],
    lastMessage: {
      id: "msg11_last",
      content:
        "Latest mockups are ready for review! Feedback welcome 🙏 I've added comments on the Figma file.",
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      read: false,
      sent: true,
      type: "text",
    },
    unreadCount: 12,
    isMuted: false,
    isPinned: true,
    lastActivity: new Date(Date.now() - 20 * 60 * 1000),
    avatar: "/avatars/design-team.jpg",
    description: "Weekly design reviews and collaboration",
    messages: [
      {
        id: "msg11_1",
        content: "Welcome to the Design Team chat!",
        sender: currentUser,
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        read: true,
        sent: true,
        type: "system",
      },
      {
        id: "msg11_2",
        content: "Hey team! I've started working on the new dashboard design.",
        sender: mockUsers[0],
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        read: true,
        sent: true,
        type: "text",
      },
      {
        id: "msg11_3",
        content: "Awesome! I can help with the React implementation.",
        sender: mockUsers[1],
        timestamp: new Date(
          Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000,
        ),
        read: true,
        sent: true,
        type: "text",
      },
      {
        id: "msg11_4",
        content: "I'll handle the data visualization components.",
        sender: mockUsers[5],
        timestamp: new Date(
          Date.now() - 3 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000,
        ),
        read: true,
        sent: true,
        type: "text",
      },
      {
        id: "msg11_5",
        content: "Perfect! Let's have a sync meeting tomorrow at 11 AM.",
        sender: currentUser,
        timestamp: new Date(
          Date.now() - 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000,
        ),
        read: true,
        sent: true,
        type: "text",
      },
      {
        id: "msg11_6",
        content:
          "Latest mockups are ready for review! Feedback welcome 🙏 I've added comments on the Figma file.",
        sender: mockUsers[0],
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        read: false,
        sent: true,
        type: "text",
      },
    ],
  },
  {
    id: "12",
    name: "Monday Planning",
    type: "group",
    participants: [
      {
        id: "dionne",
        name: "Dionne Rasmussen",
        status: "online",
        avatar: "/avatars/dionne.jpg",
      },
      {
        id: "ralph",
        name: "Ralph Nilsen",
        status: "online",
        avatar: "/avatars/ralph.jpg",
      },
      {
        id: "savannah",
        name: "Savannah Björk",
        status: "online",
        avatar: "/avatars/savannah.jpg",
      },
      {
        id: "jenny",
        name: "Jenny Lund",
        status: "online",
        avatar: "/avatars/jenny.jpg",
      },
      currentUser,
    ],
    lastMessage: {
      id: "msg12_last",
      content:
        "I think the color doesn't contrast well with the background. Should we try a darker shade? Maybe #2C3E50 instead?",
      sender: { id: "dionne", name: "Dionne Rasmussen", status: "online" },
      timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
      read: false,
      sent: true,
      type: "text",
    },
    unreadCount: 7,
    isMuted: false,
    isPinned: false,
    lastActivity: new Date(Date.now() - 8 * 60 * 1000),
    avatar: "/avatars/monday-planning.jpg",
    description: "Weekly planning and coordination",
    messages: [
      {
        id: "msg12_1",
        content: "Hey everyone! Let's plan this week's tasks.",
        sender: currentUser,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        read: true,
        sent: true,
        type: "text",
      },
      {
        id: "msg12_2",
        content: "I'll be working on the user authentication flow.",
        sender: { id: "ralph", name: "Ralph Nilsen", status: "online" },
        timestamp: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000,
        ),
        read: true,
        sent: true,
        type: "text",
      },
      {
        id: "msg12_3",
        content: "I can handle the database optimization.",
        sender: { id: "savannah", name: "Savannah Björk", status: "online" },
        timestamp: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000,
        ),
        read: true,
        sent: true,
        type: "text",
      },
      {
        id: "msg12_4",
        content: "I'll work on the frontend components.",
        sender: { id: "jenny", name: "Jenny Lund", status: "online" },
        timestamp: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000,
        ),
        read: true,
        sent: true,
        type: "text",
      },
      {
        id: "msg12_5",
        content: "Hey, did you check the new button design?",
        sender: currentUser,
        timestamp: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000,
        ),
        read: true,
        sent: true,
        type: "text",
      },
      {
        id: "msg12_6",
        content:
          "I think the color doesn't contrast well with the background. Should we try a darker shade? Maybe #2C3E50 instead?",
        sender: { id: "dionne", name: "Dionne Rasmussen", status: "online" },
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        read: false,
        sent: true,
        type: "text",
      },
    ],
  },
  {
    id: "13",
    name: "Project Alpha",
    type: "group",
    participants: Array.from({ length: 12 }, (_, i) => ({
      id: `member${i}`,
      name: `Member ${i + 1}`,
      status: i < 5 ? "online" : ("offline" as const),
    })),
    lastMessage: {
      id: "msg13_last",
      content:
        "@team The deadline has been moved to Friday. Please update your schedules accordingly and let me know if there are any conflicts.",
      sender: currentUser,
      timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
      read: false,
      sent: true,
      type: "text",
    },
    unreadCount: 3,
    isMuted: true,
    isPinned: false,
    lastActivity: new Date(Date.now() - 35 * 60 * 1000),
    avatar: "/avatars/project-alpha.jpg",
    description: "Cross-functional team for Project Alpha",
  },
  {
    id: "14",
    name: "Gaming Squad",
    type: "group",
    participants: Array.from({ length: 15 }, (_, i) => ({
      id: `gamer${i}`,
      name: `Gamer ${i + 1}`,
      status: i < 8 ? "online" : ("away" as const),
    })),
    lastMessage: {
      id: "msg14_last",
      content:
        "Who's up for some Valorant tonight? I've got a new strategy we should try! Meet at 9 PM EST?",
      sender: { id: "gamer1", name: "Gamer 1", status: "online" as const },
      timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
      read: false,
      sent: true,
      type: "text",
    },
    unreadCount: 15,
    isMuted: false,
    isPinned: false,
    lastActivity: new Date(Date.now() - 12 * 60 * 1000),
    avatar: "/avatars/gaming-squad.jpg",
    description: "Weekly gaming sessions and strategy",
  },
];

// Update some conversations with random unread counts for variety
mockConversations.forEach((conv, index) => {
  if (index > 3) {
    // Keep first few consistent, randomize others
    conv.unreadCount = getRandomUnreadCount();
  }
});
