import { db } from "./client";
import { and, eq, lt } from "drizzle-orm";
import { messages, NewMessage } from "./schema";
import { Status } from "@/types/BareMessageType";

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

export async function updateMessageStatusInDb(msgid: string, status: Status) {
  await db.update(messages).set({ status: status }).where(eq(messages.id, msgid));
}