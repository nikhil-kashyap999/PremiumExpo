// export const conversations = sqliteTable('conversations', {
//   id: text('id').primaryKey(),                 // server _id
//   isGroup: integer('is_group', { mode: 'boolean' }).notNull().default(false),
//   title: text('title'),                        // group name (1-1 me null)
//   otherUserId: text('other_user_id'),          // 1-1 me samne wala user
//   otherUserName: text('other_user_name'),      // display ke liye
//   otherUserAvatar: text('other_user_avatar'),
//   lastMessageText: text('last_message_text'),  // chat list preview
//   lastMessageAt: integer('last_message_at'),
//   unreadCount: integer('unread_count').notNull().default(0),
// });

import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";

export const conversations = sqliteTable("conversations", {
  id: text("id").primaryKey(),
  title: text("title"),
});

export const messages = sqliteTable(
  "messages",
  {
    id: text("id").primaryKey(),
    conversationId: text("conversation_id")
      .notNull()
      .references(() => conversations.id),
    senderId: text("sender_id").notNull(),
    isReceived: integer("is_received", { mode: "boolean" })
      .notNull()
      .default(false),
    textMsg: text("text_msg").notNull(),
    createdAt: integer("created_at").notNull(),
    status: text("status", { enum: ["pending", "sent", "sending", "delivered", "read", "failed"] })
      .notNull()
      .default("sent"),
  },
  (t) => [index("conv_created_idx").on(t.conversationId, t.createdAt)],
);

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;