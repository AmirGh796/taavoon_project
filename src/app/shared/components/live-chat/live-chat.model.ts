export class LiveChatRoomModel {
  id: number;
  ownerConnectionId: string;
  ownerName: string;
  ownerPhoneNumber: string;
  ownerTitle: string;
}

export class MessageLiveChatModel {
  senderName: string;
  message: string;
  sendAtTime: string;
  forRoom: number;
}