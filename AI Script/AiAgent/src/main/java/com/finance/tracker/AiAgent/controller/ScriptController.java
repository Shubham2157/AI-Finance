package com.finance.tracker.AiAgent.controller;

import com.finance.tracker.AiAgent.dto.ReportResponse;
import com.finance.tracker.AiAgent.dto.Transaction;
import com.finance.tracker.AiAgent.service.HandleUserPromptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ScriptController {

    @Autowired
    private HandleUserPromptService handleUserPromptService;


    @GetMapping("/")
    public String home(){
        return "API Running Successfully";
    }

    @PostMapping("/generate/report")
    public List<ReportResponse> generateReport(@RequestBody List<Transaction> transactions){
        return handleUserPromptService.generateReport(transactions);

    }

}
