import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async chatCompletion(@Body('chats') chats) {
    const result = await this.chatService.chatCompletion(chats);
    return { output: result };
  }
}
