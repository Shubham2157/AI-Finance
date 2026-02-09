package com.finance.tracker.AiAgent.controller;

import com.finance.tracker.AiAgent.dto.ReportRequestBody;
import com.finance.tracker.AiAgent.dto.ReportResponse;
import com.finance.tracker.AiAgent.utils.ChatClientUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ScriptController {

    @Autowired
    private ChatClientUtils chatClientUtils;


    @GetMapping("/")
    public ReportResponse home(){
        return chatClientUtils.getRes("daily invest");
    }

    @PostMapping("/generate/report")
    public String generateReport(@RequestBody ReportRequestBody reportRequestBody){
        return reportRequestBody.getMonth();
    }

}
