package com.finance.tracker.AiAgent.controller;

import com.finance.tracker.AiAgent.utils.ChatClientUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScriptController {

    @Autowired
    private ChatClientUtils chatClientUtils;

    public ScriptController(ChatClientUtils chatClientUtils){
        this.chatClientUtils = chatClientUtils;
    }

    @GetMapping("/")
    public String home(){
        return chatClientUtils.getRes();
    }

}
