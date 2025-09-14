package com.finance.tracker.statementextractor.controller;

import com.finance.tracker.statementextractor.service.ExtractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExtractController {

    @Autowired
    ExtractService extractService;

    @GetMapping("/process/statement")
    public String processStatement(){
        String res = "";
        try {
            res = extractService.processExtractStatement();
        } catch (Exception e) {
            System.out.println(e);
        }
        return res;
    }


    @GetMapping("/insert/statements")
    public String insertStatement(){
        String res = "";
        try {
            res = extractService.insertStatementOpration();
        } catch (Exception e) {
            System.out.println(e);
        }
        return res;
    }

}
