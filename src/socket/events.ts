export const SERVER_EVENTS = {
  MESSAGE_ACK: "message:ack",
  MESSAGE_NEW: "message:new",
  MESSAGE_ERROR:"message:error",
  MESSAGE_STATUS: "message:status",
  PRESENCE_UPDATE: "presence:update",
  INVITE_NOTIFICATION: "invite:notification",
} as const;

export const CLIENT_EVENTS = {
  MESSAGE_SEND: "message:send",
  MESSAGE_STATUS: "message:status",

} as const;