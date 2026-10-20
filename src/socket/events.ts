export const SERVER_EVENTS = {
  MESSAGE_NEW: "message:new",
  PRESENCE_UPDATE: "presence:update",
  INVITE_NOTIFICATION: "invite:notification",
  MESSAGE_ACK: "message:ack",
  MESSAGE_STATUS: "message:status",
} as const;

export const CLIENT_EVENTS = {
  MESSAGE_SEND: "message:send",
  MESSAGE_STATUS: "message:status",

} as const;