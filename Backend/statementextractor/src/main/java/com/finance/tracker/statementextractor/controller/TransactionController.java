package com.finance.tracker.statementextractor.controller;

import com.finance.tracker.statementextractor.entities.TransactionRecord;
import com.finance.tracker.statementextractor.service.TransactionService;
import jakarta.transaction.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public ResponseEntity<Page<Transaction>> getAllTransactions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) BigDecimal minAmount,
            @RequestParam(required = false) BigDecimal maxAmount) {

        Page<Transaction> transactions = transactionService.getTransactions(
                page, size,
                startDate != null ? java.sql.Date.valueOf(startDate) : null,
                endDate != null ? java.sql.Date.valueOf(endDate) : null,
                minAmount, maxAmount);

        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/expense")
    public ResponseEntity<Page<TransactionRecord>> getExpense(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ){
        return ResponseEntity.ok(transactionService.getExpenseData(
                page, size,
                startDate != null ? java.sql.Date.valueOf(startDate) : null,
                endDate != null ? java.sql.Date.valueOf(endDate) : null
        ));
    }

    @GetMapping("/income")
    public ResponseEntity<Page<TransactionRecord>> getIncome(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ){
        return ResponseEntity.ok(transactionService.getIncomeData(
                page, size,
                startDate != null ? java.sql.Date.valueOf(startDate) : null,
                endDate != null ? java.sql.Date.valueOf(endDate) : null
        ));
    }
}
