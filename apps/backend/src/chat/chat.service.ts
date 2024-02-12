import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
    private openai: OpenAI
    constructor(){
        this.openai = new OpenAI({
            // organization: process.env.OPENAI_ORGANIZATION,
            apiKey: process.env.OPENAI_API_KEY
        })
    }

    async chatCompletion (chats){
        const result = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: "system",
                    content: "You are a chat assistant. You give responses to users"
                },
                ...chats
            ]
        })
        return result.choices[0].message
    }
}
