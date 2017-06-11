# Angular Websocket Client Test.

  This project was created to test Angular as a WebSocket Client.

## Dependencies

  The below command should create src/app/socket.service.ts and src/app/socket.service.spec.ts within your project. The spec file is for unit testing and not used in this project.

  ```
  ng g service socket

  ```

## Disclaimer

  I obtained *ALL* this code and documentation from other sources.

## Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Architecture

`src/app/socket.service.ts` file and include the following TypeScript code:

```
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SocketService {

    private socket: WebSocket;
    private listener: EventEmitter<any> = new EventEmitter();

    public constructor() {
        this.socket = new WebSocket("ws://localhost:12345/ws");
        this.socket.onopen = event => {
            this.listener.emit({"type": "open", "data": event});
        }
        this.socket.onclose = event => {
            this.listener.emit({"type": "close", "data": event});
        }
        this.socket.onmessage = event => {
            this.listener.emit({"type": "message", "data": JSON.parse(event.data)});
        }
    }

    public send(data: string) {
        this.socket.send(data);
    }

    public close() {
        this.socket.close();
    }

    public getEventListener() {
        return this.listener;
    }

}

```


`src/app/app.module.ts` Open and include the following:

```

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SocketService } from "./socket.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [SocketService],
    bootstrap: [AppComponent]
})
export class AppModule { }

```

`src/app/app.component.ts` include the following TypeScript code:

```
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from "./socket.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    public messages: Array<any>;
    public chatBox: string;

    public constructor(private socket: SocketService) {
        this.messages = [];
        this.chatBox = "";
    }

    public ngOnInit() {
        this.socket.getEventListener().subscribe(event => {
            if(event.type == "message") {
                let data = event.data.content;
                if(event.data.sender) {
                    data = event.data.sender + ": " + data;
                }
                this.messages.push(data);
            }
            if(event.type == "close") {
                this.messages.push("/The socket connection has been closed");
            }
            if(event.type == "open") {
                this.messages.push("/The socket connection has been established");
            }
        });
    }

    public ngOnDestroy() {
        this.socket.close();
    }

    public send() {
        if(this.chatBox) {
            this.socket.send(this.chatBox);
            this.chatBox = "";
        }
    }

    public isSystemMessage(message: string) {
        return message.startsWith("/") ? "<strong>" + message.substring(1) + "</strong>" : message;
    }

}

```

`src/styles.css` file and include the following:

```

/* You can add global styles to this file, and also import other style files */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font: 13px Helvetica, Arial; }
form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
#messages { list-style-type: none; margin: 0; padding: 0; }
#messages li { padding: 5px 10px; }
#messages li:nth-child(odd) { background: #eee; }

```

`src/app/app.component.html` file and include the following:

```

<ul id="messages">
    <li *ngFor="let message of messages">
        <span [innerHTML]="isSystemMessage(message)"></span>
    </li>
</ul>
<form action="">
    <input [(ngModel)]="chatBox" [ngModelOptions]="{standalone: true}" autocomplete="off" />
    <button (click)="send()">Send</button>
</form>

```
