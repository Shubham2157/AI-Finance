package com.finance.tracker.AiAgent.utils;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

@Component
public class ChatClientUtils {

    ChatClient chatClient;

    private ChatClientUtils(ChatClient.Builder builder) {
        chatClient = builder.build();
    }

    public ChatClient.CallResponseSpec getResponse(Object transactions,
                                                   Resource userResource,
                                                   Resource systemResource) {
        return chatClient
                .prompt()
                .user(u ->
                        u.text(userResource)
                                .param("json", transactions))
                .system(s -> s.text(systemResource)).call();

    }

}
