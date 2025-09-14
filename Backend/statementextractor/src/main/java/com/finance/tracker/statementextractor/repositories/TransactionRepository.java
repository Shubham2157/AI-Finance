package com.finance.tracker.statementextractor.repositories;

import com.finance.tracker.statementextractor.entities.TransactionRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transaction;

import java.time.LocalDate;
import java.util.Date;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionRecord, Long> , JpaSpecificationExecutor<Transaction> {
    Page<TransactionRecord> findByType(String type, Pageable pageable);

    Page<TransactionRecord> findByTypeAndTransactionDateBetween(
            String type,
            Date startDate,
            Date endDate,
            Pageable pageable
    );
}
