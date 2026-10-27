// PharmaFlow shared sample data (synthetic). Used by crud.html and dashboard.html.
// Same 15 medications as the Botpress table on bot.html. Inventory count date: 2026-10-23.
// Load on a page BEFORE that page's own script:  <script src="js/data.js"></script>

const medications = [
  {"drug_name": "Amoxicillin 500 mg Capsules (30 ct)", "batch": "AMX-2411", "expiry": "2026-12-15", "qty": 24, "supplier": "Gulf Coast Pharma Supply", "cost": 4.2, "price": 5.54, "category": "Antibiotics"},
  {"drug_name": "Lisinopril 10 mg Tablets (90 ct)", "batch": "LIS-2503", "expiry": "2027-08-31", "qty": 40, "supplier": "Sunshine Medical Distributors", "cost": 6.5, "price": 8.45, "category": "Cardiovascular"},
  {"drug_name": "Atorvastatin 20 mg Tablets (90 ct)", "batch": "ATV-2507", "expiry": "2027-11-30", "qty": 35, "supplier": "Bay Area Rx Wholesale", "cost": 9.8, "price": 12.84, "category": "Cardiovascular"},
  {"drug_name": "Metformin 500 mg Tablets (100 ct)", "batch": "MET-2502", "expiry": "2027-05-31", "qty": 1, "supplier": "Gulf Coast Pharma Supply", "cost": 5.4, "price": 7.18, "category": "Diabetes"},
  {"drug_name": "Ibuprofen 200 mg Tablets OTC (100 ct)", "batch": "IBU-2310", "expiry": "2026-10-10", "qty": 6, "supplier": "Sunshine Medical Distributors", "cost": 3.1, "price": 4.03, "category": "Pain Relief"},
  {"drug_name": "Acetaminophen 500 mg Tablets OTC (100 ct)", "batch": "ACE-2602", "expiry": "2028-02-28", "qty": 60, "supplier": "Bay Area Rx Wholesale", "cost": 2.9, "price": 3.83, "category": "Pain Relief"},
  {"drug_name": "Albuterol HFA Inhaler 90 mcg", "batch": "ALB-2504", "expiry": "2027-03-31", "qty": 12, "supplier": "Gulf Coast Pharma Supply", "cost": 24.5, "price": 31.85, "category": "Respiratory"},
  {"drug_name": "Cetirizine 10 mg Tablets (30 ct)", "batch": "CET-2401", "expiry": "2027-01-15", "qty": 18, "supplier": "Sunshine Medical Distributors", "cost": 3.6, "price": 4.79, "category": "Allergy"},
  {"drug_name": "Omeprazole 20 mg Capsules (30 ct)", "batch": "OME-2506", "expiry": "2027-06-30", "qty": 0, "supplier": "Bay Area Rx Wholesale", "cost": 5.2, "price": 6.81, "category": "Gastrointestinal"},
  {"drug_name": "Insulin Glargine 100 units/mL Pens (5 pk)", "batch": "INS-2408", "expiry": "2026-11-30", "qty": 4, "supplier": "Gulf Coast Pharma Supply", "cost": 285.0, "price": 370.5, "category": "Diabetes"},
  {"drug_name": "Azithromycin 250 mg Tablets (6 ct)", "batch": "AZI-2509", "expiry": "2027-09-30", "qty": 15, "supplier": "Sunshine Medical Distributors", "cost": 8.75, "price": 11.55, "category": "Antibiotics"},
  {"drug_name": "Sertraline 50 mg Tablets (30 ct)", "batch": "SER-2510", "expiry": "2027-10-31", "qty": 22, "supplier": "Bay Area Rx Wholesale", "cost": 4.8, "price": 6.24, "category": "Mental Health"},
  {"drug_name": "Levothyroxine 50 mcg Tablets (90 ct)", "batch": "LEV-2309", "expiry": "2026-09-30", "qty": 3, "supplier": "Gulf Coast Pharma Supply", "cost": 7.3, "price": 9.56, "category": "Thyroid"},
  {"drug_name": "Loratadine 10 mg Tablets OTC (30 ct)", "batch": "LOR-2603", "expiry": "2028-04-30", "qty": 1, "supplier": "Sunshine Medical Distributors", "cost": 3.2, "price": 4.26, "category": "Allergy"},
  {"drug_name": "Amlodipine 5 mg Tablets (90 ct)", "batch": "AML-2502", "expiry": "2027-02-28", "qty": 28, "supplier": "Bay Area Rx Wholesale", "cost": 4.6, "price": 6.07, "category": "Cardiovascular"}
];
