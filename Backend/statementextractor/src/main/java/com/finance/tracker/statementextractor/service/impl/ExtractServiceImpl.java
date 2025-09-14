package com.finance.tracker.statementextractor.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finance.tracker.statementextractor.entities.TransactionRecord;
import com.finance.tracker.statementextractor.repositories.TransactionRepository;
import com.finance.tracker.statementextractor.service.ExtractService;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import technology.tabula.*;
import technology.tabula.extractors.SpreadsheetExtractionAlgorithm;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.sql.Date;

@Service
public class ExtractServiceImpl implements ExtractService {


    // ✅ Change this to your actual folder path on D: drive
    private static final String PDF_FOLDER = "D:\\Project\\Finance Tracker AI\\Invoice\\";
    private static final String PASSWORD_PROPERTIES = "passwords.properties";

    private final ObjectMapper mapper = new ObjectMapper();

    private static final List<DateTimeFormatter> FORMATTERS = Arrays.asList(
            DateTimeFormatter.ofPattern("dd-MMM-yyyy"),
            DateTimeFormatter.ofPattern("d MMM yyyy"),
            DateTimeFormatter.ofPattern("dd-MM-yyyy"),
            DateTimeFormatter.ofPattern("d-MMM-yyyy")
    );

    @Autowired
    private final TransactionRepository repository;

    public ExtractServiceImpl(TransactionRepository repository) {
        this.repository = repository;
    }

    /**
     * @return
     */
    @Override
    public String processExtractStatement() {

        try {
            Properties passwordMap = loadPasswordMap();
            File folder = new File(PDF_FOLDER);
            File[] files = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".pdf"));

            if (files == null || files.length == 0) {
                System.out.println("❌ No PDF files found in: " + PDF_FOLDER);
                return "No PDF files found in: " + PDF_FOLDER;
            }

            for (File pdfFile : files) {
                String fileName = pdfFile.getName();
                String prefix = getPrefix(fileName);
                String password = passwordMap.getProperty(prefix, ""); // empty if not found
                System.out.println("📄 Processing: " + fileName);

                try (FileInputStream fis = new FileInputStream(pdfFile);
                     PDDocument document = tryLoadPDF(fis, password)) {

                    if (document == null) {
                        System.out.println("🔒 Skipped encrypted or unreadable file: " + fileName);
                        continue;
                    }

                    ObjectExtractor extractor = new ObjectExtractor(document);
                    PageIterator pages = extractor.extract();
                    List<Map<String, String>> tableData = new ArrayList<>();
                    int pageCount = 0;
                    List<String> headers = new ArrayList<>();

                    boolean isHeaderRowPresnt = false;

                    if (StringUtils.startsWithIgnoreCase(fileName, "sbi")){
                        isHeaderRowPresnt = true;
                    }
                    while (pages.hasNext()) {
                        Page page = pages.next();
                        SpreadsheetExtractionAlgorithm sea = new SpreadsheetExtractionAlgorithm();
                        List<Table> tables = sea.extract(page);

                        for (Table table : tables) {
                            List<List<RectangularTextContainer>> rows = table.getRows();

                            if (rows.size() < 2) continue;

                            if(pageCount == 0 || isHeaderRowPresnt){
                                for (RectangularTextContainer headerCell : rows.get(0)) {
                                    headers.add(headerCell.getText().trim());
                                }
                            } else{
                                Map<String, String> rowMap = new LinkedHashMap<>();
                                List<RectangularTextContainer> cells = rows.get(0);

                                for (int j = 0; j < headers.size() && j < cells.size(); j++) {
                                    rowMap.put(headers.get(j), cells.get(j).getText().trim());
                                }

                                tableData.add(rowMap);
                            }



                            for (int i = 1; i < rows.size(); i++) {
                                Map<String, String> rowMap = new LinkedHashMap<>();
                                List<RectangularTextContainer> cells = rows.get(i);

                                for (int j = 0; j < headers.size() && j < cells.size(); j++) {
                                    rowMap.put(headers.get(j), cells.get(j).getText().trim());
                                }

                                tableData.add(rowMap);
                            }
                        }

                        pageCount++;
                    }
                    // ✅ Write JSON to same folder (next to PDF)
                    String jsonFileName = pdfFile.getAbsolutePath().replace(".pdf", ".json");
                    mapper.writerWithDefaultPrettyPrinter().writeValue(new File(jsonFileName), tableData);
                    System.out.println("✅ Saved JSON: " + jsonFileName);
                }
            }
            return "Success";
        } catch (Exception e) {
            System.out.println("❌ Error processing file pdf files");
            e.printStackTrace();
            return "";
        }
    }

    /**
     * @return
     */
    @Override
    public String insertStatementOpration() {

        File folder = new File(PDF_FOLDER);
        File[] files = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".json"));

        if (files == null)
            return "No file to process";

        for (File file : files) {
            try {
                String bank = file.getName().toLowerCase().startsWith("sbi") ? "SBI" : "ICICI";
                JsonNode root = mapper.readTree(file);

                if (root.isArray()) {
                    for (JsonNode node : root) {
                        TransactionRecord record = new TransactionRecord();

                        if (bank.equals("SBI")) {
                            record.setTransactionDate(parseDate(cleanText(node.path("Txn Date").asText())));
                            record.setDescription(cleanText(node.path("Description").asText()));

                            String debit = node.path("Debit").asText();
                            String credit = node.path("Credit").asText();

                            if (!debit.isEmpty()) {
                                record.setAmount(parseAmount(debit));
                                record.setType("DR");
                            } else if (!credit.isEmpty()) {
                                record.setAmount(parseAmount(credit));
                                record.setType("CR");
                            }

                        } else { // ICICI
                            record.setTransactionDate(parseDate(node.path("Date").asText()));
                            record.setDescription(cleanText(node.path("Description").asText()));
                            record.setAmount(parseAmount(node.path("Amount").asText()));
                            record.setType(node.path("Type").asText());
                        }

                        record.setBank(bank);
                        repository.save(record);
                    }
                }
            } catch (Exception e) {
                System.out.println("❌ Failed to process " + file.getName());
                e.printStackTrace();
                return "Exception : " + e;
            }
        }

        System.out.println("✅ All JSON files processed and inserted.");

        return "processed successfully";
    }

    public static Date parseDate(String rawDate) {
        //String rawDate = node.path("Date").asText().replace("\r", "").trim();  // remove \r and trim

        for (DateTimeFormatter formatter : FORMATTERS) {
            try {
                LocalDate localDate = LocalDate.parse(rawDate, formatter);
                return Date.valueOf(localDate);
            } catch (DateTimeParseException ignored) {
                // Try next format
            }
        }

        throw new IllegalArgumentException("Unsupported date format: " + rawDate);
    }


    private Double parseAmount(String amt) {
        return Double.parseDouble(amt.replace(",", "").replace("CR", "").replace("DR", "").trim());
    }

    private String cleanText(String s) {
        return s == null ? "" : s.replaceAll("\\r", " ").replaceAll("\\s+", " ").trim();
    }

    private Properties loadPasswordMap() throws IOException {
        Properties properties = new Properties();
        try (InputStream is = getClass().getClassLoader().getResourceAsStream(PASSWORD_PROPERTIES)) {
            if (is == null) {
                System.out.println("⚠️ No passwords.properties found in resources!");
            } else {
                properties.load(is);
            }
        }
        return properties;
    }

    private String getPrefix(String filename) {
        return filename.split("-")[0].toLowerCase(); // e.g., abc_invoice.pdf → abc
    }

    private PDDocument tryLoadPDF(FileInputStream fis, String password) {
        try {
            return (password != null && !password.isEmpty())
                    ? PDDocument.load(fis, password)
                    : PDDocument.load(fis);
        } catch (Exception e) {
            return null;
        }
    }

}
