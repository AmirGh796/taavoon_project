import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { environment } from "src/environments/environment";
import { MobilePattern2 } from "../../RegexPatterns";
import { LiveChatRoomModel, MessageLiveChatModel } from "./live-chat.model";
import { LiveChatService } from "./LiveChat.service";

@Component({
  selector: "live-chat",
  templateUrl: "./live-chat.component.html",
  styleUrls: ["./live-chat.component.scss"],
})
export class LiveChatComponent implements OnInit, AfterViewInit {
  showLiveChatPanel: boolean;
  liveChatPanel: HTMLElement;
  liveChatButton: HTMLElement;
  createRoomForm: HTMLElement;
  chatForm: HTMLElement;
  loader: boolean;
  loader2: boolean;
  errorLoginRoom: boolean;
  messageText: string;
  canSendMessage: boolean;
  chatRoom: LiveChatRoomModel;
  liveChatUrl: string;

  messages: MessageLiveChatModel[];

  fullname_livechat = new FormControl("", [
    Validators.required,
    Validators.maxLength(30),
  ]);
  phonenumber_livechat = new FormControl("", [
    Validators.required,
    Validators.pattern(MobilePattern2),
  ]);
  title_livechat = new FormControl("", [
    Validators.required,
    Validators.maxLength(50),
  ]);
  startLiveChatForm: FormGroup = this.builder.group({
    fullname_livechat: this.fullname_livechat,
    phonenumber_livechat: this.phonenumber_livechat,
    title_livechat: this.title_livechat,
  });

  constructor(
    private builder: FormBuilder,
    private liveChatService: LiveChatService
  ) {
    this.messages = new Array<MessageLiveChatModel>();
  }

  ngAfterViewInit(): void {
    this.liveChatPanel = document.getElementById("live-chat-panel");
    this.liveChatButton = document.getElementById("live-chat-button");
    this.createRoomForm = document.getElementById("create-room-form");
    this.chatForm = document.getElementById("chat-form");
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.canSendMessage = false;
    this.showLiveChatPanel = false;
    this.loader = false;
    this.loader2 = false;
    this.errorLoginRoom = false;
    this.messageText = "";
    this.liveChatUrl = environment.liveChatUrl;
  }

  openLiveChatPanel(): void {
    // this.liveChatButton.style.opacity = "0";
    // this.liveChatPanel.style.display = "block";
    // setTimeout(() => {
    //   this.liveChatPanel.style.transform = "scale(1)";
    //   this.loader = true;
    //   let loadRoom = this.liveChatService.getLiveChatRoom();
    //   if (loadRoom) {
    //     this.loader = false;
    //     this.goToChatRoom();
    //   }
    // }, 300);
    window.location.href = "https://api.whatsapp.com/send?phone=989177065699";
  }

  closeLiveChatPanel(): void {
    this.liveChatPanel.style.transform = "translate(0px, 510px)";
    setTimeout(() => {
      this.liveChatPanel.style.display = "none";
      this.liveChatButton.style.opacity = "1";
    }, 300);
  }

  onCreateLiveChatRoom(): void {
    this.loader2 = true;
    let createLiveChat = new LiveChatRoomModel();
    createLiveChat.ownerName = this.startLiveChatForm.value.fullname_livechat;
    createLiveChat.ownerPhoneNumber = this.startLiveChatForm.value.phonenumber_livechat;
    createLiveChat.ownerTitle = this.startLiveChatForm.value.title_livechat;

    this.liveChatService.postLiveChatRoom(createLiveChat).subscribe((res) => {
      this.loader2 = false;
      if (res > 0) {
        createLiveChat.id = res;
        this.chatRoom = createLiveChat;
        this.liveChatService.setLiveChatRoom(createLiveChat);
        this.goToChatRoom();
      } else {
        this.errorLoginRoom = true;
        setTimeout(() => {
          this.errorLoginRoom = false;
        }, 5000);
      }
    });
  }

  onWritingMessage(): void {
    if (this.messageText.length > 0 && this.messageText.length < 3000) {
      this.canSendMessage = true;
    }
  }

  goToChatRoom(): void {
    this.createRoomForm.style.transform = "translateX(340px)";
    setTimeout(() => {
      this.chatForm.style.opacity = "1";
      //this.liveChatService.createLiveChatRoom(this.chatRoom);
    }, 300);
  }
}
