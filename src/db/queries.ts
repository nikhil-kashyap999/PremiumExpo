import { and, desc, eq, lt } from "drizzle-orm";
import { db } from "./client";
import { messages, NewMessage } from "./schema";

export async function saveMessages(
  msg: NewMessage,
  opt: { isIncoming: boolean },
) {
  db.transaction((tx) => {
    tx.insert(messages)
      .values(msg)
      .onConflictDoUpdate({
        target: messages.id,
        set: { textMsg: msg.textMsg, status: msg.status },
      })
      .run();
  });
}

export async function getMessages(
  conversationId: string,
  before?: number,
  limit = 30,
) {
  return db
    .select()
    .from(messages)
    .where(
      and(
        eq(messages.conversationId, conversationId),
        before ? lt(messages.createdAt, before) : undefined,
      ),
    )
    .orderBy(messages.createdAt)
    .limit(limit);
}

export async function deleteAllMessages(conversationId: string) {
  return db
    .delete(messages)
    .where(eq(messages.conversationId, conversationId))
    .run();
}
