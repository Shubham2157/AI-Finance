package com.finance.tracker.AiAgent.service;

import com.finance.tracker.AiAgent.dto.ReportResponse;
import com.finance.tracker.AiAgent.dto.Transaction;

import java.util.List;

public interface HandleUserPromptService {

    List<ReportResponse> generateReport(List<Transaction> transactions);


}
