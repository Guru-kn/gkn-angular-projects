import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from '../app.component';
import { CustomMessage } from '../model/custom-message';
import { Injectable } from '@angular/core';
import { CustomChat } from '../model/chat';
import { TypingService } from '../chat/service/TypingService';

@Injectable()
export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/greetings";
    typingTopic: string = "/topic/is-typing";
    stompClient: any;
    message: CustomMessage[] = [] as any;
    chatList: CustomChat[] = [] as any;
    typingData: any = {} as any;
    
    constructor(private typingService: TypingService){
    }
    
    _connect(topic?: string) {
        console.log("Initialize WebSocket Connection");
        if(topic) {
            this.topic = topic;
        }
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({}, (frame: any) => {
            this.stompClient.subscribe(this.topic, (sdkEvent: any) => {
                this.onMessageReceived(sdkEvent);
            });
            this.stompClient.subscribe(this.typingTopic, (sdkEvent: any) => {
                this.onTypingMessageReceived(sdkEvent);
            });
            //this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message: any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }

    onMessageReceived(message: any) {
        console.log("Message Recieved from Server :: " + message);
        // this.message.push(JSON.parse(message.body));

        if(this.topic === "/topic/greetings") {
            this.message.unshift(JSON.parse(message.body));
        } else if(this.topic === "/topic/chat") {

            if(JSON.stringify(this.chatList).indexOf((JSON.parse(message.body) as CustomChat).chatId || "") === -1){
                this.chatList.push(JSON.parse(message.body));
            }

            this.typingService.chat.isTyping = false;
            this.typingService.typingData[(JSON.parse(message.body) as CustomChat).toUser.id || ""] = {};
            this.typingData[(JSON.parse(message.body) as CustomChat).chatId || ""] = undefined;
        }
    }

    onTypingMessageReceived(message: any) {
        const chat: CustomChat = JSON.parse(message.body);
        this.typingData[chat.toUser.id] = chat;
        this.typingService.typingData = this.typingData;


        const typedData: any = this.typingService.typingData[this.typingService.user.id];

        if(message && chat.message.length > 0 && 
            this.typingService.typingData && typedData && typedData?.toUser && (this.typingService.user.id === typedData?.toUser.id)){
            this.typingService.chat.isTyping = true;
        } else {
            this.typingService.chat.isTyping = false;
            this.typingData[chat.toUser.id] = undefined;
        }
    }
    
}