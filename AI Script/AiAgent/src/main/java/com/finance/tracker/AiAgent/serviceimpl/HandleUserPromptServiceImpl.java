package com.finance.tracker.AiAgent.serviceimpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finance.tracker.AiAgent.dto.ReportResponse;
import com.finance.tracker.AiAgent.dto.Transaction;
import com.finance.tracker.AiAgent.service.HandleUserPromptService;
import com.finance.tracker.AiAgent.utils.ChatClientUtils;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HandleUserPromptServiceImpl implements HandleUserPromptService {

    @Autowired
    private ChatClientUtils chatClientUtils;

    @Autowired
    private ObjectMapper objectMapper;

    @Value("classpath:/prompt/user-prompt.st")
    Resource userResource;

    @Value("classpath:/prompt/system-prompt.st")
    Resource systemResource;

    @Override
    public List<ReportResponse> generateReport(List<Transaction> transactions) {
        String jsonString = "";
        try {
            jsonString = objectMapper.writerWithDefaultPrettyPrinter()
                    .writeValueAsString(transactions);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        System.out.println(jsonString);
        ChatClient.CallResponseSpec response = chatClientUtils
                .getResponse(jsonString, userResource, systemResource);

        return response.entity(new ParameterizedTypeReference<List<ReportResponse>>() {});
    }
}
