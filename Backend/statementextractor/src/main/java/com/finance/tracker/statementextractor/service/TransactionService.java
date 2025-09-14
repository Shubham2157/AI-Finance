package com.finance.tracker.statementextractor.service;

import java.math.BigDecimal;
import java.util.Date;

import com.finance.tracker.statementextractor.entities.TransactionRecord;
import jakarta.transaction.Transaction;
import org.springframework.data.domain.Page;

public interface TransactionService {

    Page<Transaction> getTransactions(
            int page, int size,
            Date startDate, Date endDate,
            BigDecimal minAmount, BigDecimal maxAmount);

    Page<TransactionRecord> getExpenseData(int page, int size,
            Date startDate, Date endDate);

    Page<TransactionRecord> getIncomeData(int page, int size,
            Date startDate, Date endDate);
}
