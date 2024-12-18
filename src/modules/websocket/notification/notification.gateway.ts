import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from 'src/guard/ws-jwt.guard';
import { NotificationService } from './notification.service';
import { NotificationEvents } from './constants/notification-events.constant';

export interface WsReponse<T> {
  data: T;
  status: 'success' | 'error';
}

type StartCallPayload = {
  roomId: string;
};
@UseGuards(WsJwtGuard)
@WebSocketGateway(2727, { namespace: 'notifications', cors: { origin: '*' } })
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private notiService: NotificationService) {}
  @WebSocketServer() server: Server;
  protected roomIds: string[];
  protected calls = new Map();
  protected projectHaveCall = new Map();

  afterInit(server: Server) {
    console.log('Socket initted');
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('openConnect')
  async handleOpenConnect(@ConnectedSocket() client: Socket, payload: any) {
    this.roomIds = await this.notiService.addUserToProjectRoom(client);

    // this.roomIds.forEach((roomId) => {
    //   if (this.projectHaveCall.has(roomId)) {
    //     client.broadcast.to(payload.projectId).emit('incommingCall', this.projectHaveCall.get(roomId));
    //   }
    // });
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
    // this.server.to(this.roomIds).emit('message', payload); // send to rooms, include sender
    client.broadcast.to(this.roomIds).emit('message', payload); //send to rooms, exclude sender
  }

  notifyToUser(userId: string, data: WsReponse<any>) {
    this.server.to(userId).emit(NotificationEvents.noti, data);
  }

  notifyToRoom(room: string | string[], data: WsReponse<any>, options?: { excludeUserId?: string }) {
    if (!options) {
      this.server.to(room).emit(NotificationEvents.noti, data);
      return;
    }
  }

  // TODO: video call
  @SubscribeMessage('startCall')
  async handleStartCall(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    const clientId = client.id;
    client.join(payload.callId);
    this.calls.set(clientId, payload.offer);
    this.projectHaveCall.set(payload.projectId, {
      from: clientId,
      offer: payload.offer,
      callId: payload.callId,
    });

    client.broadcast.to(payload.projectId).emit('incommingCall', {
      from: clientId,
      offer: payload.offer,
      callId: payload.callId,
    });

    console.log('start call:', payload);
  }

  @SubscribeMessage('joinCall')
  async handleJoinCall(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    // console.log(payload);
    console.log('new join call: ', payload);

    const clientId = client.id;
    client.join(payload.callId);
    client.broadcast.to(payload.projectId).emit('newParticipantJoinCall', { clientId, offer: this.calls.get(payload.from) });
  }

  @SubscribeMessage('answer')
  handleAnswer(@ConnectedSocket() client: Socket, @MessageBody() answer: any) {
    client.broadcast.emit('answer', answer);
  }

  @SubscribeMessage('iceCandidate')
  handleIceCandidate(@ConnectedSocket() client: Socket, @MessageBody() candidate: any) {
    client.broadcast.emit('iceCandidate', candidate);
  }
  @SubscribeMessage('leaveCall')
  handleEndCall(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    client.leave(payload.callId);

    if (this.calls.has(client.id)) {
      this.calls.delete(client.id);
    }
  }
}
