import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomChat } from "src/app/model/chat";
import { User } from "src/app/model/user";
import { WebServices } from "src/app/service/web-services";

@Injectable()
export class TypingService {

    typingData: any = {} as any;
    chat: CustomChat = {} as any;
    user: User = {} as any;

    constructor(private webService: WebServices) {

    }
}