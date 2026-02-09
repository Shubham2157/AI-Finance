package com.finance.tracker.AiAgent.utils;

import com.finance.tracker.AiAgent.dto.ReportResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.List;

@Component
public class ChatClientUtils {

    ChatClient chatClient;

    @Value("classpath:/prompt/user-prompt.st")
    Resource userResource;

    @Value("classpath:/prompt/system-prompt.st")
    Resource systemResource;

    public ChatClientUtils(ChatClient.Builder builder) {
        chatClient = builder.build();
    }

    public ReportResponse getRes(Object json){

        return chatClient
                .prompt()
                .user(u ->
                        u.text(userResource)
                                .param("json", json))
                .system(systemResource).call()
                .entity(ReportResponse.class);

    }

}
