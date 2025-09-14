SELECT * FROM `transactions`;
SELECT COUNT(*), bank FROM `transactions` GROUP BY bank; -- 1336 - icici 305, sbi 1031
SELECT DISTINCT(DESCRIPTION) FROM `transactions`;

-- retrive data for ml model |Transation categories|
SELECT DISTINCT(DESCRIPTION) AS `TRANSACTION_DESCRIPTION`, TYPE AS `TRANSACTION_TYPE`, BANK FROM `transactions`
ORDER BY RAND() LIMIT 500;