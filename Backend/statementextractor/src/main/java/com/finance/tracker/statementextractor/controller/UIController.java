package com.finance.tracker.statementextractor.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finance.tracker.statementextractor.entities.PageEntity;
import com.finance.tracker.statementextractor.entities.TransactionRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Controller
public class UIController {

    private final RestTemplate restTemplate;

    @Autowired
    public UIController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/")
    public String index() {
        return "about"; // maps to index.html
    }

    @GetMapping("/dashboard")
    public String dashboard(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Model model
    ) {
        String apiUrl = "http://localhost:8080/api/transactions?page=" + page + "&size=" + size;

        model.addAttribute("startDate", startDate);
        model.addAttribute("endDate", endDate);
        model.addAttribute("category", category);

        if (startDate != null) apiUrl += "&startDate=" + startDate;
        if (endDate != null) apiUrl += "&endDate=" + endDate;
        if (category != null) apiUrl += "&category=" + category;

        ParameterizedTypeReference<Map<String, Object>> responseType = new ParameterizedTypeReference<>() {};
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(apiUrl, HttpMethod.GET, null, responseType);

        Map<String, Object> pageData = response.getBody();
        List<TransactionRecord> transactions = new ObjectMapper().convertValue(
                pageData.get("content"),
                new TypeReference<List<TransactionRecord>>() {}
        );

        PageEntity pageEntity= new ObjectMapper().convertValue(
                pageData.get("page"),
                PageEntity.class
        );

        // Summary calculations
        double totalIncome = transactions.stream().filter(t -> t.getType().equalsIgnoreCase("cr")).mapToDouble(TransactionRecord::getAmount).sum();
        double totalExpense = transactions.stream().filter(t -> t.getType().equalsIgnoreCase("dr")).mapToDouble(TransactionRecord::getAmount).sum();
        double balance = totalIncome + totalExpense;

        model.addAttribute("transactions", transactions);
        model.addAttribute("totalIncome", totalIncome);
        model.addAttribute("totalExpense", totalExpense);
        model.addAttribute("balance", balance);
        model.addAttribute("currentPage", pageEntity.getNumber());
        model.addAttribute("size", pageEntity.getSize());
        model.addAttribute("totalPages", pageEntity.getTotalPages());
        model.addAttribute("startDate", startDate);
        model.addAttribute("endDate", endDate);
        model.addAttribute("category", category);

        return "dashboard";
    }


    @GetMapping("/income")
    public String incomePage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            Model model
    ) {
        // Load income data
        String apiUrl = "http://localhost:8080/api/transactions/income?page=" + page + "&size=" + size;

        model.addAttribute("startDate", startDate);
        model.addAttribute("endDate", endDate);
        // model.addAttribute("category", category);

        if (startDate != null) apiUrl += "&startDate=" + startDate;
        if (endDate != null) apiUrl += "&endDate=" + endDate;

        ParameterizedTypeReference<Map<String, Object>> responseType = new ParameterizedTypeReference<>() {};
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(apiUrl, HttpMethod.GET, null, responseType);

        Map<String, Object> pageData = response.getBody();
        List<TransactionRecord> income = new ObjectMapper().convertValue(
                pageData.get("content"),
                new TypeReference<List<TransactionRecord>>() {}
        );

        PageEntity pageEntity= new ObjectMapper().convertValue(
                pageData.get("page"),
                PageEntity.class
        );

        model.addAttribute("income", income);
        model.addAttribute("currentPage", pageEntity.getNumber());
        model.addAttribute("size", pageEntity.getSize());
        model.addAttribute("totalPages", pageEntity.getTotalPages());

        return "income";
    }

    @GetMapping("/expense")
    public String expensePage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            Model model
    ) {
        // Load expense data
        model.addAttribute("startDate", startDate);
        model.addAttribute("endDate", endDate);
       // model.addAttribute("category", category);

        String apiUrl = "http://localhost:8080/api/transactions/expense?page=" + page + "&size=" + size;

        if (startDate != null) apiUrl += "&startDate=" + startDate;
        if (endDate != null) apiUrl += "&endDate=" + endDate;

        ParameterizedTypeReference<Map<String, Object>> responseType = new ParameterizedTypeReference<>() {};
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(apiUrl, HttpMethod.GET, null, responseType);

        Map<String, Object> pageData = response.getBody();
        List<TransactionRecord> expense = new ObjectMapper().convertValue(
                pageData.get("content"),
                new TypeReference<List<TransactionRecord>>() {}
        );

        PageEntity pageEntity= new ObjectMapper().convertValue(
                pageData.get("page"),
                PageEntity.class
        );

        model.addAttribute("expense", expense);
        model.addAttribute("currentPage", pageEntity.getNumber());
        model.addAttribute("size", pageEntity.getSize());
        model.addAttribute("totalPages", pageEntity.getTotalPages());

        return "expense";
    }

}
