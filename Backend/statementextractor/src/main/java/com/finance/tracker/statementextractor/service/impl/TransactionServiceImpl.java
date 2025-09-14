package com.finance.tracker.statementextractor.service.impl;

import com.finance.tracker.statementextractor.entities.TransactionRecord;
import com.finance.tracker.statementextractor.repositories.TransactionRepository;
import com.finance.tracker.statementextractor.service.TransactionService;
import com.finance.tracker.statementextractor.utils.TransactionSpecification;
import jakarta.transaction.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private final TransactionRepository repository;

    public TransactionServiceImpl(TransactionRepository repository) {
        this.repository = repository;
    }


    /**
     * @param page
     * @param size
     * @param startDate
     * @param endDate
     * @param minAmount
     * @param maxAmount
     * @return
     */
    @Override
    public Page<Transaction> getTransactions(int page, int size, Date startDate, Date endDate, BigDecimal minAmount, BigDecimal maxAmount) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("transactionDate").descending());

        Specification<Transaction> spec = TransactionSpecification.withFilters(
                startDate, endDate, minAmount, maxAmount);

        return repository.findAll(spec, pageable);
    }

    /**
     * @param page
     * @param size
     * @return
     */
    @Override
    public Page<TransactionRecord> getExpenseData(int page, int size, Date startDate, Date endDate) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("transactionDate").descending());
        if(startDate != null && endDate != null){
            return repository.findByTypeAndTransactionDateBetween("DR", startDate, endDate, pageable);
        }
        return repository.findByType("DR", pageable);
    }

    /**
     * @param page
     * @param size
     * @return
     */
    @Override
    public Page<TransactionRecord> getIncomeData(int page, int size, Date startDate, Date endDate) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("transactionDate").descending());

        if(startDate != null && endDate != null){
            return repository.findByTypeAndTransactionDateBetween("CR", startDate, endDate, pageable);
        }

        return repository.findByType("CR", pageable);
    }

}
