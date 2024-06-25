import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketService } from './websocket/websocket.service';
import { WebSocketConfig } from './websocket/websocket.interfaces';
import { config } from './websocket/websocket.config';



@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        WebsocketService
    ]
})
export class WebsocketModule {
    public static config(wsConfig: WebSocketConfig): ModuleWithProviders<WebsocketModule> {
        return {
            ngModule: WebsocketModule,
            providers: [{ provide: config, useValue: wsConfig }]
        };
    }
}
