package com.finance.tracker.AiAgent.dto;

public class ReportResponse {

    private String title;
    private String description;

    public ReportResponse(String title, String report) {
        this.title = title;
        this.description = report;
    }

    public ReportResponse() {
    }

    public ReportResponse(String message) {
        this.description = message;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
