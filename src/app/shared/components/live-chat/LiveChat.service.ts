import { Injectable, EventEmitter } from "@angular/core";
import { MessageLiveChatModel, LiveChatRoomModel } from "./live-chat.model";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import * as signalR from "@aspnet/signalr";

@Injectable()
export class LiveChatService {
  messageReceived = new EventEmitter<MessageLiveChatModel>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: signalR.HubConnection;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    // this.createConnection();
    // this.registerOnServerEvents();
    // this.startConnection();
  }

  // sendMessage(message: MessageLiveChatModel): void {
  //   this._hubConnection.invoke("NewMessage", message);
  // }

  // public createLiveChatRoom(room: LiveChatRoomModel): void {
  //   this._hubConnection
  //     .invoke("SetRoomConfigs", room)
  //     .then(() => {
  //       console.log("room is created");
  //     })
  //     .catch((e) => console.error(e));
  // }

  // private createConnection(): void {
  //   this._hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl(environment.liveChatUrl + "/chatHub")
  //     .build();
  // }

  // private startConnection(): void {
  //   this._hubConnection
  //     .start()
  //     .then(() => {
  //       this.connectionIsEstablished = true;
  //       console.log("Hub connection started");
  //       this.connectionEstablished.emit(true);
  //     })
  //     .catch((err) => {
  //       console.log("Error while establishing connection, retrying...");
  //       setTimeout(() => {
  //         this.startConnection();
  //       }, 5000);
  //     });
  // }

  // private registerOnServerEvents(): void {
  //   this._hubConnection.on("ReciveMessage", (data: any) => {
  //     console.log(data);
  //     this.messageReceived.emit(data);
  //   });
  // }

  public getLiveChatRoom(): LiveChatRoomModel {
    let room: string = this.cookieService.get("live-chat-room-taavoon");

    if (room && room.length > 0) {
      let roomInCookie = room.split("/");
      let createRoom = new LiveChatRoomModel();
      createRoom.ownerName = roomInCookie[0];
      createRoom.ownerPhoneNumber = roomInCookie[1];
      createRoom.ownerTitle = roomInCookie[2];
      return createRoom;
    }

    return null;
  }

  public setLiveChatRoom(room: LiveChatRoomModel): void {
    let roomInCookie =
      room.ownerName + "/" + room.ownerPhoneNumber + "/" + room.ownerTitle;
    this.cookieService.set("live-chat-room-taavoon", roomInCookie);
  }

  public postLiveChatRoom(data: LiveChatRoomModel): Observable<number> {
    const url = environment.liveChatUrl + "/LiveChat/CreateOrLoadRoom";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .post<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getAllMessages(roomId: number): Observable<MessageLiveChatModel[]> {
    const url = environment.liveChatUrl + "/LiveChat/GetAllMessages/" + roomId;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<MessageLiveChatModel[]>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
}
