import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomChat } from "src/app/model/chat";
import { WebServices } from "src/app/service/web-services";

@Injectable()
export class ChatService {

    constructor(private webService: WebServices) {

    }

    submitChat(chatData: CustomChat):  Observable<any> {
        let headers: HttpHeaders = new HttpHeaders();
        return this.webService.httpPostWithHeadersAndResponse(this.webService.hostApiEndpoint + "/chat", chatData, headers);
    }

    isTyping(chatData: CustomChat):  Observable<any> {
        let headers: HttpHeaders = new HttpHeaders();
        return this.webService.httpPostWithHeadersAndResponse(this.webService.hostApiEndpoint + "/action", chatData, headers);
    }
}