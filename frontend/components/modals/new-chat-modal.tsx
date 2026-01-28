// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Search,
//   Users,
//   UserPlus,
//   MessageSquare,
//   Phone,
//   X,
//   Clock,
//   MoreVertical,
//   Filter,
//   Sparkles,
//   Loader2,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { User } from "@/lib/types";
// import {
//   getAllUsers,
//   searchUsers,
//   sendFriendRequest,
//   startConversation,
// } from "@/lib/data";

// interface NewChatModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSelectUser?: (user: User) => void;
//   onStartConversation?: (userId: string) => void;
// }

// export default function NewChatModal({
//   open,
//   onOpenChange,
//   onSelectUser,
//   onStartConversation,
// }: NewChatModalProps) {
//   const [activeTab, setActiveTab] = useState<"all" | "friends" | "suggestions">(
//     "all",
//   );
//   const [searchQuery, setSearchQuery] = useState("");
//   const [users, setUsers] = useState<User[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [recentSearches, setRecentSearches] = useState<string[]>([
//     "Alex",
//     "Sarah",
//     "Design",
//   ]);

//   // Load initial users
//   useEffect(() => {
//     if (open) {
//       loadInitialUsers();
//     }
//   }, [open]);

//   const loadInitialUsers = async () => {
//     setLoading(true);
//     try {
//       const data = await getAllUsers(20);
//       setUsers(data);
//       setFilteredUsers(data);
//     } catch (error) {
//       console.error("Failed to load users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Debounced search
//   const debouncedSearch = useCallback(
//     async (query: string) => {
//       if (query.trim() === "") {
//         setFilteredUsers(users);
//         return;
//       }

//       setSearching(true);
//       try {
//         const results = await searchUsers(query);
//         setFilteredUsers(results);
//       } catch (error) {
//         console.error("Search failed:", error);
//       } finally {
//         setSearching(false);
//       }
//     },
//     [users],
//   );

//   // Handle search input change
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     debouncedSearch(value);
//   };

//   // Handle search on blur
//   const handleSearchBlur = () => {
//     if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
//       setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)]);
//     }
//   };

//   // Filter users by tab
//   const getTabFilteredUsers = () => {
//     if (activeTab === "friends") {
//       return filteredUsers.filter((user) => user.isFriend);
//     } else if (activeTab === "suggestions") {
//       return filteredUsers.filter((user) => !user.isFriend);
//     }
//     return filteredUsers;
//   };

//   const handleUserSelect = (user: User) => {
//     setSelectedUser(user);
//   };

//   const handleStartConversation = async () => {
//     if (!selectedUser) return;

//     try {
//       const result = await startConversation(selectedUser.id);
//       if (result.success) {
//         onStartConversation?.(selectedUser.id);
//         onOpenChange(false);
//       }
//     } catch (error) {
//       console.error("Failed to start conversation:", error);
//     }
//   };

//   const handleSendFriendRequest = async (userId: string) => {
//     try {
//       await sendFriendRequest(userId);
//       // Update user status
//       setUsers((prev) =>
//         prev.map((user) =>
//           user.id === userId ? { ...user, isFriend: true } : user,
//         ),
//       );
//     } catch (error) {
//       console.error("Failed to send friend request:", error);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setFilteredUsers(users);
//   };

//   const handleViewProfile = (user: User) => {
//     console.log("View profile:", user.name);
//     // In a real app, you would navigate to profile page
//   };

//   const renderUserItem = (user: User) => {
//     const isSelected = selectedUser?.id === user.id;
//     const statusColors = {
//       online: "bg-green-500",
//       away: "bg-yellow-500",
//       offline: "bg-gray-400",
//     };

//     return (
//       <div
//         key={user.id}
//         className={cn(
//           "flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer hover:bg-accent",
//           isSelected && "bg-accent border border-primary",
//         )}
//         onClick={() => handleUserSelect(user)}
//       >
//         <div className="flex items-center gap-3 flex-1 min-w-0">
//           <div className="relative">
//             <Avatar>
//               <AvatarImage src={user.avatar} />
//               <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <div
//               className={cn(
//                 "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
//                 statusColors[user.status],
//               )}
//             />
//           </div>

//           <div className="flex-1 min-w-0">
//             <div className="flex items-center gap-2 mb-1">
//               <p className="font-medium text-sm truncate">{user.name}</p>
//               {user.isFriend && (
//                 <Badge variant="secondary" className="text-xs">
//                   Friend
//                 </Badge>
//               )}
//             </div>
//             <p className="text-xs text-muted-foreground truncate">
//               {user.role}
//             </p>
//             {user.mutualFriends && user.mutualFriends > 0 && (
//               <div className="flex items-center gap-1 mt-1">
//                 <Users className="h-3 w-3 text-muted-foreground" />
//                 <span className="text-xs text-muted-foreground">
//                   {user.mutualFriends} mutual friends
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center gap-1 ml-2">
//           {!user.isFriend ? (
//             <Button
//               size="sm"
//               variant="outline"
//               className="h-8"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleSendFriendRequest(user.id);
//               }}
//             >
//               <UserPlus className="h-3 w-3 mr-1" />
//               Add
//             </Button>
//           ) : (
//             <div className="flex items-center gap-1">
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className="h-8 w-8"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleStartConversation();
//                 }}
//               >
//                 <MessageSquare className="h-4 w-4" />
//               </Button>
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className="h-8 w-8"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   console.log("Call", user.name);
//                 }}
//               >
//                 <Phone className="h-4 w-4" />
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const renderUserActions = (user: User) => (
//     <div className="flex items-center gap-2 p-4 border-t">
//       <Button
//         variant="outline"
//         className="flex-1"
//         onClick={() => handleViewProfile(user)}
//       >
//         <Users className="h-4 w-4 mr-2" />
//         View Profile
//       </Button>
//       <Button className="flex-1" onClick={handleStartConversation}>
//         <MessageSquare className="h-4 w-4 mr-2" />
//         Message
//       </Button>
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => console.log("More options")}
//       >
//         <MoreVertical className="h-4 w-4" />
//       </Button>
//     </div>
//   );

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-hidden">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <MessageSquare className="h-5 w-5" />
//             New Chat
//           </DialogTitle>
//           <DialogDescription>
//             Start a conversation with friends or connect with new people
//           </DialogDescription>
//         </DialogHeader>

//         {/* Search Section */}
//         <div className="space-y-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by name, email, or role..."
//               className="pl-9 pr-9"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               onBlur={handleSearchBlur}
//             />
//             {searchQuery && (
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
//                 onClick={handleClearSearch}
//               >
//                 <X className="h-3 w-3" />
//               </Button>
//             )}
//           </div>

//           {/* Recent Searches */}
//           {recentSearches.length > 0 && !searchQuery && (
//             <div className="flex flex-wrap gap-2">
//               {recentSearches.map((term, index) => (
//                 <Button
//                   key={index}
//                   size="sm"
//                   variant="outline"
//                   className="h-7 text-xs"
//                   onClick={() => {
//                     setSearchQuery(term);
//                     debouncedSearch(term);
//                   }}
//                 >
//                   <Clock className="h-3 w-3 mr-1" />
//                   {term}
//                 </Button>
//               ))}
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 className="h-7 text-xs"
//                 onClick={() => setRecentSearches([])}
//               >
//                 Clear All
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Tabs */}
//         <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
//           <TabsList className="grid grid-cols-3">
//             <TabsTrigger value="all">All Users</TabsTrigger>
//             <TabsTrigger value="friends">Friends</TabsTrigger>
//             <TabsTrigger
//               value="suggestions"
//               className="flex items-center gap-1"
//             >
//               <Sparkles className="h-3 w-3" />
//               Suggestions
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value={activeTab} className="mt-4">
//             <ScrollArea className="h-[400px] pr-4">
//               {loading ? (
//                 <div className="space-y-3">
//                   {[...Array(5)].map((_, i) => (
//                     <div key={i} className="flex items-center gap-3 p-3">
//                       <Skeleton className="h-10 w-10 rounded-full" />
//                       <div className="space-y-2 flex-1">
//                         <Skeleton className="h-4 w-32" />
//                         <Skeleton className="h-3 w-24" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : searching ? (
//                 <div className="flex flex-col items-center justify-center py-12">
//                   <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
//                   <p className="text-sm text-muted-foreground">
//                     Searching users...
//                   </p>
//                 </div>
//               ) : getTabFilteredUsers().length === 0 ? (
//                 <div className="flex flex-col items-center justify-center py-12 text-center">
//                   <Search className="h-12 w-12 text-muted-foreground mb-4" />
//                   <p className="font-medium">No users found</p>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     {searchQuery
//                       ? "Try a different search term"
//                       : "No users available"}
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between mb-2">
//                     <p className="text-sm text-muted-foreground">
//                       {getTabFilteredUsers().length} users found
//                     </p>
//                     <Button size="sm" variant="ghost" className="h-7 text-xs">
//                       <Filter className="h-3 w-3 mr-1" />
//                       Filter
//                     </Button>
//                   </div>
//                   {getTabFilteredUsers().map((user) => renderUserItem(user))}
//                 </div>
//               )}
//             </ScrollArea>
//           </TabsContent>
//         </Tabs>

//         {/* Selected User Actions */}
//         {selectedUser && (
//           <div className="mt-4 border-t pt-4">
//             <div className="flex items-center gap-3 mb-4">
//               <Avatar>
//                 <AvatarImage src={selectedUser.avatar} />
//                 <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="font-medium">{selectedUser.name}</p>
//                 <p className="text-sm text-muted-foreground">
//                   {selectedUser.role}
//                 </p>
//               </div>
//               <Badge
//                 variant={
//                   selectedUser.status === "online" ? "default" : "secondary"
//                 }
//               >
//                 {selectedUser.status}
//               </Badge>
//             </div>
//             {renderUserActions(selectedUser)}
//           </div>
//         )}

//         {/* Footer Actions */}
//         <div className="flex items-center justify-between border-t pt-4">
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               onClick={() => console.log("Create group")}
//             >
//               <Users className="h-4 w-4 mr-2" />
//               New Group
//             </Button>
//             {selectedUser && (
//               <Button onClick={handleStartConversation}>
//                 <MessageSquare className="h-4 w-4 mr-2" />
//                 Start Chat
//               </Button>
//             )}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Search,
//   Users,
//   UserPlus,
//   MessageSquare,
//   Phone,
//   Video,
//   X,
//   Clock,
//   Filter,
//   Sparkles,
//   Loader2,
//   ChevronLeft,
//   User,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import {
//   getAllUsers,
//   searchUsers,
//   sendFriendRequest,
//   startConversation,
// } from "@/lib/data";

// import { User as UserType } from "@/lib/types";
// import UserInfo from "../chat/user-info";

// interface NewChatModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSelectUser?: (user: UserType) => void;
//   onStartConversation?: (userId: string) => void;
//   onStartCall?: (userId: string, type: "audio" | "video") => void;
// }

// type ModalView = "list" | "profile";

// export default function NewChatModal({
//   open,
//   onOpenChange,
//   onSelectUser,
//   onStartConversation,
//   onStartCall,
// }: NewChatModalProps) {
//   const [activeTab, setActiveTab] = useState<"all" | "friends" | "suggestions">(
//     "all",
//   );
//   const [searchQuery, setSearchQuery] = useState("");
//   const [users, setUsers] = useState<UserType[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
//   const [modalView, setModalView] = useState<ModalView>("list");
//   const [recentSearches, setRecentSearches] = useState<string[]>([
//     "Alex",
//     "Sarah",
//     "Design",
//   ]);

//   // Load initial users
//   useEffect(() => {
//     if (open) {
//       loadInitialUsers();
//       setModalView("list");
//       setSelectedUser(null);
//       setSearchQuery("");
//     }
//   }, [open]);

//   const loadInitialUsers = async () => {
//     setLoading(true);
//     try {
//       const data = await getAllUsers(20);
//       setUsers(data);
//       setFilteredUsers(data);
//     } catch (error) {
//       console.error("Failed to load users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Debounced search
//   const debouncedSearch = useCallback(
//     async (query: string) => {
//       if (query.trim() === "") {
//         setFilteredUsers(users);
//         return;
//       }

//       setSearching(true);
//       try {
//         const results = await searchUsers(query);
//         setFilteredUsers(results);
//       } catch (error) {
//         console.error("Search failed:", error);
//       } finally {
//         setSearching(false);
//       }
//     },
//     [users],
//   );

//   // Handle search input change
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     debouncedSearch(value);
//   };

//   // Handle search on blur
//   const handleSearchBlur = () => {
//     if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
//       setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)]);
//     }
//   };

//   // Filter users by tab
//   const getTabFilteredUsers = () => {
//     if (activeTab === "friends") {
//       return filteredUsers.filter((user) => user.isFriend);
//     } else if (activeTab === "suggestions") {
//       return filteredUsers.filter((user) => !user.isFriend);
//     }
//     return filteredUsers;
//   };

//   const handleUserSelect = (user: UserType) => {
//     setSelectedUser(user);
//     setModalView("profile");
//     onSelectUser?.(user);
//   };

//   const handleBackToList = () => {
//     setModalView("list");
//   };

//   const handleStartConversation = async () => {
//     if (!selectedUser) return;

//     try {
//       const result = await startConversation(selectedUser.id);
//       if (result.success) {
//         onStartConversation?.(selectedUser.id);
//         onOpenChange(false);
//       }
//     } catch (error) {
//       console.error("Failed to start conversation:", error);
//     }
//   };

//   const handleStartAudioCall = () => {
//     if (!selectedUser) return;
//     onStartCall?.(selectedUser.id, "audio");
//     onOpenChange(false);
//   };

//   const handleStartVideoCall = () => {
//     if (!selectedUser) return;
//     onStartCall?.(selectedUser.id, "video");
//     onOpenChange(false);
//   };

//   const handleSendFriendRequest = async (
//     userId: string,
//     e?: React.MouseEvent,
//   ) => {
//     if (e) e.stopPropagation();

//     try {
//       await sendFriendRequest(userId);
//       // Update user status
//       setUsers((prev) =>
//         prev.map((user) =>
//           user.id === userId ? { ...user, isFriend: true } : user,
//         ),
//       );
//       setFilteredUsers((prev) =>
//         prev.map((user) =>
//           user.id === userId ? { ...user, isFriend: true } : user,
//         ),
//       );
//     } catch (error) {
//       console.error("Failed to send friend request:", error);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setFilteredUsers(users);
//   };

//   const renderUserItem = (user: UserType) => {
//     const statusColors = {
//       online: "bg-green-500",
//       away: "bg-yellow-500",
//       offline: "bg-gray-400",
//     };

//     return (
//       <div
//         key={user.id}
//         className="flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer hover:bg-accent group"
//         onClick={() => handleUserSelect(user)}
//       >
//         <div className="flex items-center gap-3 flex-1 min-w-0">
//           <div className="relative">
//             <Avatar className="group-hover:scale-105 transition-transform">
//               <AvatarImage src={user.avatar} />
//               <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <div
//               className={cn(
//                 "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
//                 statusColors[user.status],
//               )}
//             />
//           </div>

//           <div className="flex-1 min-w-0">
//             <div className="flex items-center gap-2 mb-1">
//               <p className="font-medium text-sm truncate">{user.name}</p>
//               {user.isFriend && (
//                 <Badge variant="secondary" className="text-xs">
//                   Friend
//                 </Badge>
//               )}
//             </div>
//             <p className="text-xs text-muted-foreground truncate">
//               {user.role}
//             </p>
//             {user.mutualFriends && user.mutualFriends > 0 && (
//               <div className="flex items-center gap-1 mt-1">
//                 <Users className="h-3 w-3 text-muted-foreground" />
//                 <span className="text-xs text-muted-foreground">
//                   {user.mutualFriends} mutual{" "}
//                   {user.mutualFriends === 1 ? "friend" : "friends"}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
//           {!user.isFriend ? (
//             <Button
//               size="sm"
//               variant="outline"
//               className="h-7 px-2"
//               onClick={(e) => handleSendFriendRequest(user.id, e)}
//             >
//               <UserPlus className="h-3 w-3 mr-1" />
//               Add
//             </Button>
//           ) : (
//             <Button
//               size="icon"
//               variant="ghost"
//               className="h-7 w-7"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleUserSelect(user);
//                 setTimeout(() => handleStartConversation(), 100);
//               }}
//             >
//               <MessageSquare className="h-4 w-4" />
//             </Button>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const renderUserList = () => (
//     <>
//       {/* Search Section */}
//       <div className="space-y-3">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search by name, email, or role..."
//             className="pl-9 pr-9"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             onBlur={handleSearchBlur}
//           />
//           {searchQuery && (
//             <Button
//               size="icon"
//               variant="ghost"
//               className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
//               onClick={handleClearSearch}
//             >
//               <X className="h-3 w-3" />
//             </Button>
//           )}
//         </div>

//         {/* Recent Searches */}
//         {recentSearches.length > 0 && !searchQuery && (
//           <div className="flex flex-wrap gap-2">
//             {recentSearches.map((term, index) => (
//               <Button
//                 key={index}
//                 size="sm"
//                 variant="outline"
//                 className="h-7 text-xs"
//                 onClick={() => {
//                   setSearchQuery(term);
//                   debouncedSearch(term);
//                 }}
//               >
//                 <Clock className="h-3 w-3 mr-1" />
//                 {term}
//               </Button>
//             ))}
//             <Button
//               size="sm"
//               variant="ghost"
//               className="h-7 text-xs"
//               onClick={() => setRecentSearches([])}
//             >
//               Clear All
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Tabs */}
//       <Tabs
//         value={activeTab}
//         onValueChange={(v: any) => setActiveTab(v)}
//         className="mt-4"
//       >
//         <TabsList className="grid grid-cols-3">
//           <TabsTrigger value="all">All Users</TabsTrigger>
//           <TabsTrigger value="friends">Friends</TabsTrigger>
//           <TabsTrigger value="suggestions" className="flex items-center gap-1">
//             <Sparkles className="h-3 w-3" />
//             Suggestions
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value={activeTab} className="mt-4">
//           <ScrollArea className="h-[400px] pr-4">
//             {loading ? (
//               <div className="space-y-3">
//                 {[...Array(5)].map((_, i) => (
//                   <div key={i} className="flex items-center gap-3 p-3">
//                     <Skeleton className="h-10 w-10 rounded-full" />
//                     <div className="space-y-2 flex-1">
//                       <Skeleton className="h-4 w-32" />
//                       <Skeleton className="h-3 w-24" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : searching ? (
//               <div className="flex flex-col items-center justify-center py-12">
//                 <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
//                 <p className="text-sm text-muted-foreground">
//                   Searching users...
//                 </p>
//               </div>
//             ) : getTabFilteredUsers().length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-12 text-center">
//                 <Search className="h-12 w-12 text-muted-foreground mb-4" />
//                 <p className="font-medium">No users found</p>
//                 <p className="text-sm text-muted-foreground mt-1">
//                   {searchQuery
//                     ? "Try a different search term"
//                     : "No users available"}
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="text-sm text-muted-foreground">
//                     {getTabFilteredUsers().length} users found
//                   </p>
//                   <Button size="sm" variant="ghost" className="h-7 text-xs">
//                     <Filter className="h-3 w-3 mr-1" />
//                     Filter
//                   </Button>
//                 </div>
//                 {getTabFilteredUsers().map((user) => renderUserItem(user))}
//               </div>
//             )}
//           </ScrollArea>
//         </TabsContent>
//       </Tabs>
//     </>
//   );

//   const renderUserProfile = () => {
//     if (!selectedUser) return null;

//     return (
//       <div className="space-y-4">
//         {/* Profile Header */}
//         <div className="flex items-center gap-3 mb-4">
//           <Button
//             size="icon"
//             variant="ghost"
//             onClick={handleBackToList}
//             className="mr-2"
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <div>
//             <h3 className="font-semibold text-lg">User Profile</h3>
//             <p className="text-sm text-muted-foreground">
//               View and connect with {selectedUser.name}
//             </p>
//           </div>
//         </div>

//         {/* User Info Component */}
//         <div className="max-h-125 overflow-y-auto pr-2">
//           <UserInfo user={selectedUser} />
//         </div>

//         {/* Quick Actions */}
//         <div className="border-t pt-4 space-y-3">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="font-medium">Quick Actions</p>
//               <p className="text-sm text-muted-foreground">
//                 Connect with {selectedUser.name}
//               </p>
//             </div>
//             {!selectedUser.isFriend && (
//               <Button
//                 variant="outline"
//                 onClick={() => handleSendFriendRequest(selectedUser.id)}
//               >
//                 <UserPlus className="h-4 w-4 mr-2" />
//                 Add Friend
//               </Button>
//             )}
//           </div>

//           <div className="grid grid-cols-3 gap-2">
//             <Button
//               className="flex-col h-auto py-3"
//               onClick={handleStartConversation}
//             >
//               <MessageSquare className="h-5 w-5 mb-1" />
//               <span className="text-xs">Message</span>
//             </Button>
//             <Button
//               variant="outline"
//               className="flex-col h-auto py-3"
//               onClick={handleStartAudioCall}
//             >
//               <Phone className="h-5 w-5 mb-1" />
//               <span className="text-xs">Audio Call</span>
//             </Button>
//             <Button
//               variant="outline"
//               className="flex-col h-auto py-3"
//               onClick={handleStartVideoCall}
//             >
//               <Video className="h-5 w-5 mb-1" />
//               <span className="text-xs">Video Call</span>
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent
//         className={cn(
//           "sm:max-w-125 max-h-[80vh] overflow-hidden",
//           modalView === "profile" && "sm:max-w-150",
//         )}
//       >
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             {modalView === "list" ? (
//               <>
//                 <MessageSquare className="h-5 w-5" />
//                 New Chat
//               </>
//             ) : (
//               <>
//                 <User className="h-5 w-5" />
//                 User Profile
//               </>
//             )}
//           </DialogTitle>
//           <DialogDescription>
//             {modalView === "list"
//               ? "Start a conversation with friends or connect with new people"
//               : "View profile and connect with this user"}
//           </DialogDescription>
//         </DialogHeader>

//         {modalView === "list" ? renderUserList() : renderUserProfile()}

//         {/* Footer Actions */}
//         <div className="flex items-center justify-between border-t pt-4">
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             {modalView === "profile" ? "Close" : "Cancel"}
//           </Button>

//           {modalView === "list" && (
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 onClick={() => console.log("Create group")}
//               >
//                 <Users className="h-4 w-4 mr-2" />
//                 New Group
//               </Button>
//               {selectedUser && (
//                 <Button onClick={() => handleUserSelect(selectedUser)}>
//                   <MessageSquare className="h-4 w-4 mr-2" />
//                   Start Chat
//                 </Button>
//               )}
//             </div>
//           )}

//           {modalView === "profile" && selectedUser && (
//             <div className="flex items-center gap-2">
//               <Button variant="outline" onClick={handleBackToList}>
//                 Back to List
//               </Button>
//               <Button onClick={handleStartConversation}>
//                 <MessageSquare className="h-4 w-4 mr-2" />
//                 Start Chat
//               </Button>
//             </div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Users,
  UserPlus,
  MessageSquare,
  Phone,
  Video,
  X,
  Clock,
  Filter,
  Sparkles,
  Loader2,
  ChevronLeft,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getAllUsers,
  searchUsers,
  sendFriendRequest,
  startConversation,
} from "@/lib/data";
import { User as UserType } from "@/lib/types";
import UserInfo from "../chat/user-info";
import NewGroupModal from "./new-group-modal";

interface NewChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectUser?: (user: UserType) => void;
  onStartConversation?: (userId: string) => void;
  onStartCall?: (userId: string, type: "audio" | "video") => void;
}

type ModalView = "list" | "profile";

export default function NewChatModal({
  open,
  onOpenChange,
  onSelectUser,
  onStartConversation,
  onStartCall,
}: NewChatModalProps) {
  const [activeTab, setActiveTab] = useState<"all" | "friends" | "suggestions">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [modalView, setModalView] = useState<ModalView>("list");
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Alex",
    "Sarah",
    "Design",
  ]);

  // Load initial users
  useEffect(() => {
    if (open) {
      loadInitialUsers();
      setModalView("list");
      setSelectedUser(null);
      setSearchQuery("");
    }
  }, [open]);

  const loadInitialUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers(20);
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  const debouncedSearch = useCallback(
    async (query: string) => {
      if (query.trim() === "") {
        setFilteredUsers(users);
        return;
      }

      setSearching(true);
      try {
        const results = await searchUsers(query);
        setFilteredUsers(results);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setSearching(false);
      }
    },
    [users],
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Handle search on blur
  const handleSearchBlur = () => {
    if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
      setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)]);
    }
  };

  // Filter users by tab
  const getTabFilteredUsers = () => {
    if (activeTab === "friends") {
      return filteredUsers.filter((user) => user.isFriend);
    } else if (activeTab === "suggestions") {
      return filteredUsers.filter((user) => !user.isFriend);
    }
    return filteredUsers;
  };

  const handleUserSelect = (user: UserType) => {
    setSelectedUser(user);
    setModalView("profile");
    onSelectUser?.(user);
  };

  const handleBackToList = () => {
    setModalView("list");
  };

  const handleStartConversation = async () => {
    if (!selectedUser) return;

    try {
      const result = await startConversation(selectedUser.id);
      if (result.success) {
        onStartConversation?.(selectedUser.id);
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  };

  const handleStartAudioCall = () => {
    if (!selectedUser) return;
    onStartCall?.(selectedUser.id, "audio");
    onOpenChange(false);
  };

  const handleStartVideoCall = () => {
    if (!selectedUser) return;
    onStartCall?.(selectedUser.id, "video");
    onOpenChange(false);
  };

  const handleSendFriendRequest = async (
    userId: string,
    e?: React.MouseEvent,
  ) => {
    if (e) e.stopPropagation();

    try {
      await sendFriendRequest(userId);
      // Update user status
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isFriend: true } : user,
        ),
      );
      setFilteredUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isFriend: true } : user,
        ),
      );
    } catch (error) {
      console.error("Failed to send friend request:", error);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredUsers(users);
  };

  const renderUserItem = (user: UserType) => {
    const statusColors = {
      online: "bg-green-500",
      away: "bg-yellow-500",
      offline: "bg-gray-400",
    };

    return (
      <div
        key={user.id}
        className="flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer hover:bg-accent group"
        onClick={() => handleUserSelect(user)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative">
            <Avatar className="group-hover:scale-105 transition-transform">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                statusColors[user.status],
              )}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium text-sm truncate">{user.name}</p>
              {user.isFriend && (
                <Badge variant="secondary" className="text-xs">
                  Friend
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {user.role}
            </p>
            {user.mutualFriends && user.mutualFriends > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {user.mutualFriends} mutual{" "}
                  {user.mutualFriends === 1 ? "friend" : "friends"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {!user.isFriend ? (
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2"
              onClick={(e) => handleSendFriendRequest(user.id, e)}
            >
              <UserPlus className="h-3 w-3 mr-1" />
              Add
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                handleUserSelect(user);
                setTimeout(() => handleStartConversation(), 100);
              }}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderUserList = () => (
    <>
      {/* Search Section */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or role..."
            className="pl-9 pr-9"
            value={searchQuery}
            onChange={handleSearchChange}
            onBlur={handleSearchBlur}
          />
          {searchQuery && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
              onClick={handleClearSearch}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !searchQuery && (
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                onClick={() => {
                  setSearchQuery(term);
                  debouncedSearch(term);
                }}
              >
                <Clock className="h-3 w-3 mr-1" />
                {term}
              </Button>
            ))}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs"
              onClick={() => setRecentSearches([])}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v: any) => setActiveTab(v)}
        className="mt-4"
      >
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Suggestions
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4 mb-4">
          <ScrollArea className="h-[300px] pr-4">
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : searching ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Searching users...
                </p>
              </div>
            ) : getTabFilteredUsers().length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="font-medium">No users found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery
                    ? "Try a different search term"
                    : "No users available"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">
                    {getTabFilteredUsers().length} users found
                  </p>
                  <Button size="sm" variant="ghost" className="h-7 text-xs">
                    <Filter className="h-3 w-3 mr-1" />
                    Filter
                  </Button>
                </div>
                {getTabFilteredUsers().map((user) => renderUserItem(user))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </>
  );

  const renderUserProfile = () => {
    if (!selectedUser) return null;

    return (
      <>
        {/* Profile Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleBackToList}
            className="mr-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h3 className="font-semibold text-lg">User Profile</h3>
            <p className="text-sm text-muted-foreground">
              View and connect with {selectedUser.name}
            </p>
          </div>
        </div>

        {/* User Info Component */}
        <ScrollArea className="h-[300px] pr-4 mb-4">
          <UserInfo user={selectedUser} />
        </ScrollArea>

        {/* Quick Actions */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Quick Actions</p>
              <p className="text-sm text-muted-foreground">
                Connect with {selectedUser.name}
              </p>
            </div>
            {!selectedUser.isFriend && (
              <Button
                variant="outline"
                onClick={() => handleSendFriendRequest(selectedUser.id)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Friend
              </Button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              className="flex-col h-auto py-3"
              onClick={handleStartConversation}
            >
              <MessageSquare className="h-5 w-5 mb-1" />
              <span className="text-xs">Message</span>
            </Button>
            <Button
              variant="outline"
              className="flex-col h-auto py-3"
              onClick={handleStartAudioCall}
            >
              <Phone className="h-5 w-5 mb-1" />
              <span className="text-xs">Audio Call</span>
            </Button>
            <Button
              variant="outline"
              className="flex-col h-auto py-3"
              onClick={handleStartVideoCall}
            >
              <Video className="h-5 w-5 mb-1" />
              <span className="text-xs">Video Call</span>
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            "sm:max-w-[500px] max-h-[85vh] flex flex-col",
            modalView === "profile" && "sm:max-w-[600px]",
          )}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {modalView === "list" ? (
                <>
                  <MessageSquare className="h-5 w-5" />
                  New Chat
                </>
              ) : (
                <>
                  <User className="h-5 w-5" />
                  User Profile
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {modalView === "list"
                ? "Start a conversation with friends or connect with new people"
                : "View profile and connect with this user"}
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable main content */}
          <ScrollArea className="flex-1 pr-4">
            <div className={modalView === "list" ? "pb-4" : "pb-4"}>
              {modalView === "list" ? renderUserList() : renderUserProfile()}
            </div>
          </ScrollArea>

          {/* Fixed footer at the bottom */}
          <DialogFooter className="flex-shrink-0 pt-4 border-t">
            <div className="flex items-center justify-between w-full">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {modalView === "profile" ? "Close" : "Cancel"}
              </Button>

              {modalView === "list" && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsNewGroupOpen(true)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    New Group
                  </Button>
                  {selectedUser && (
                    <Button onClick={() => handleUserSelect(selectedUser)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Start Chat
                    </Button>
                  )}
                </div>
              )}

              {modalView === "profile" && selectedUser && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleBackToList}>
                    Back to List
                  </Button>
                  <Button onClick={handleStartConversation}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Chat
                  </Button>
                </div>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Group Modal */}
      <NewGroupModal
        open={isNewGroupOpen}
        onOpenChange={setIsNewGroupOpen}
        users={users}
      />
    </>
  );
}
