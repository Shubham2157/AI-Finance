package com.finance.tracker.AiAgent.utils;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.stereotype.Component;

@Component
public class ChatClientUtils {

    OllamaChatModel ollamaChatModel;

    public ChatClientUtils(OllamaChatModel ollamaChatModel) {
        this.ollamaChatModel = ollamaChatModel;
    }

    public String getRes(){
        Prompt prompt = new Prompt("how can I solve 8x + 7 = -23",
            OllamaOptions.builder().build());
        ChatResponse response = this.ollamaChatModel.call(prompt);

        return response.getResult().getOutput().getText();

    }




}
