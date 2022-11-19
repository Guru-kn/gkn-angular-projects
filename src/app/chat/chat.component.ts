import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { CustomChat } from "../model/chat";
import { User } from "../model/user";
import { WebSocketAPI } from "../util/WebSocketAPI";
import { ChatService } from "./service/ChatService";
import { TypingService } from "./service/TypingService";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
  })
  export class ChatComponent implements OnInit {

    userList: User[] = [
        {
            id: "8881112223",
            name: "Prakash B",
            isOnline: false,
            displayPic: "https://bootdey.com/img/Content/avatar/avatar1.png"
        },
        {
            id: "8881112222",
            name: "Guru KN",
            isOnline: false,
            displayPic: "https://bootdey.com/img/Content/avatar/avatar1.png"
        },
        {
            id: "8881112224",
            name: "Nagalakshmi",
            isOnline: false,
            displayPic: "https://bootdey.com/img/Content/avatar/avatar8.png"
        },
        {
            id: "8881112225",
            name: "Piyush",
            isOnline: false,
            displayPic: "https://bootdey.com/img/Content/avatar/avatar1.png"
        },
        {
            id: "8881112226",
            name: "Subhendu",
            isOnline: false,
            displayPic: "https://bootdey.com/img/Content/avatar/avatar1.png"
        },
        {
            id: "8881112227",
            name: "Rohit",
            isOnline: false,
            displayPic: "https://bootdey.com/img/Content/avatar/avatar1.png"
        },
        {
            id: "8881112228",
            name: "Subransu",
            isOnline: false,
            displayPic: "https://bootdey.com/img/Content/avatar/avatar1.png"
        },
        {
            id: "8881112229",
            name: "Harish",
            isOnline: false,
            displayPic: "https://bootdey.com/img/Content/avatar/avatar1.png"
        },
        {
            id: "8881112230",
            name: "Ajit",
            isOnline: false,
            displayPic: "https://bootdey.com/img/Content/avatar/avatar1.png"
        }
    ];

    user: User;
    chat: CustomChat;
    loginForm: FormGroup;
    chatForm: FormGroup;
    webSocketAPI: WebSocketAPI;
    message: string = "";
    typingService: TypingService;
    @ViewChild('scrollMe') private myScrollContainer: ElementRef = {} as any;

    constructor(webSocketAPI: WebSocketAPI, private fb: FormBuilder,
        private chatService: ChatService, private toastr: ToastrService,
        typingService: TypingService){
        this.webSocketAPI = webSocketAPI;
        this.typingService = typingService; 
        this.user = {
            id: "",
            name: "",
            isOnline: false
        }
        this.chat = {
            fromUser: this.user,
            toUser: this.user,
            message: "",
            dateTime: "",
        }
        this.loginForm = this.fb.group({
            mobileNumber: [''],
            otp: [''],
        });
        this.chatForm = this.fb.group({
            message: [''],
        })
    }

    ngOnInit(): void {
        this.webSocketAPI._connect("/topic/chat");
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            let messageBody = document.querySelector('.row.message');
            if(messageBody) {
                messageBody.scrollTop = messageBody?.scrollHeight - messageBody?.clientHeight;
            }
            
        } catch(err) { }                 
    }

    login(){
        this.user.id = this.loginForm.controls['mobileNumber'].value + "";

        if(this.user.id === "8881112222"){
            this.user.name = "Guru KN";
            this.chat.toUser = {
                id: "8881112223",
                name: "Prakash",
                isOnline: false
            };
        } else if(this.user.id === "8881112223"){
            this.user.name = "Prakash";
            this.chat.toUser = {
                id: "8881112222",
                name: "Guru K N",
                isOnline: false
            };
        }
        this.chat.fromUser = this.user;
        this.toastr.success("Successfully Logged in as " + this.user.name);
        this.typingService.chat = this.chat;
        this.typingService.user = this.user;
    }

    updateMessage(){
        this.message = this.chatForm.controls['message'].value;
        this.initiateUserTyping(this.message);
    }

    sendMessage(){

        this.chat.message = this.chatForm.controls['message'].value;
        this.chat.dateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        this.chatService.submitChat(this.chat).subscribe((res: any) => {
            this.chatForm.controls['message'].setValue(null);
            this.message = "";
        })
    }

    initiateUserTyping(message: string){
        const chat: CustomChat = JSON.parse(JSON.stringify(this.chat));
        chat.message = message;
        this.chatService.isTyping(chat).subscribe((res: any) => {

        });
    }
  }