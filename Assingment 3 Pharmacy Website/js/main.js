
/* ==========================================
   PHARMAFLOW - MAIN JAVASCRIPT
   Inventory CRUD + Dashboard Charts
   ========================================== */

(() => {
    "use strict";

    const STORAGE_KEY = "pharmaflow_inventory";

    let items = [];
    let nextId = 1;

    const $ = (selector) => document.querySelector(selector);

    /* ===== DATA STORAGE ===== */

    function loadItems() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved !== null) {
                const parsed = JSON.parse(saved);

                if (!Array.isArray(parsed)) {
                    throw new Error("Invalid saved inventory");
                }

                items = parsed;
            } else {
                // Sample inventory for first-time visitors
                items = [
                    {
                        id: 1,
                        name: "Ibuprofen 200mg",
                        quantity: 120,
                        expiry: "2027-03-01",
                        supplier: "Supplier A"
                    },
                    {
                        id: 2,
                        name: "Amoxicillin 500mg",
                        quantity: 60,
                        expiry: "2027-06-15",
                        supplier: "Supplier B"
                    },
                    {
                        id: 3,
                        name: "Vitamin D3",
                        quantity: 200,
                        expiry: "2028-01-20",
                        supplier: "Supplier C"
                    }
                ];

                saveItems();
            }

            nextId = Math.max(
                0,
                ...items.map(item => Number(item.id) || 0)
            ) + 1;

        } catch (error) {
            console.error("Unable to load inventory:", error);
            items = [];
            nextId = 1;
        }
    }

    function saveItems() {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(items)
            );
            return true;
        } catch (error) {
            console.error("Unable to save inventory:", error);
            alert("Inventory could not be saved in this browser.");
            return false;
        }
    }

    /* ===== DATE FORMATTING ===== */

    function formatDate(dateStr) {
        if (!dateStr) return "";

        const parts = dateStr.split("-");

        if (parts.length !== 3) return dateStr;

        const [year, month, day] = parts.map(Number);
        const date = new Date(year, month - 1, day);

        if (Number.isNaN(date.getTime())) {
            return dateStr;
        }

        return date.toLocaleDateString();
    }

    /* ===== INVENTORY TABLE ===== */

    function renderItems() {
        const tbody = $("#itemsTable tbody");

        if (!tbody) return;

        tbody.replaceChildren();

        if (items.length === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");

            cell.colSpan = 6;
            cell.textContent =
                "No medications found. Add your first inventory item.";

            cell.style.textAlign = "center";
            cell.style.padding = "35px";
            cell.style.color = "#64748b";

            row.appendChild(cell);
            tbody.appendChild(row);
            return;
        }

        for (const item of items) {
            const row = document.createElement("tr");

            const values = [
                item.id,
                item.name,
                item.quantity,
                formatDate(item.expiry),
                item.supplier
            ];

            values.forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            const actionsCell = document.createElement("td");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.dataset.action = "edit";
            editButton.dataset.id = item.id;
            editButton.className = "table-edit-btn";

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.dataset.action = "delete";
            deleteButton.dataset.id = item.id;
            deleteButton.className = "table-delete-btn";

            actionsCell.append(editButton, deleteButton);
            row.appendChild(actionsCell);

            tbody.appendChild(row);
        }
    }

    /* ===== RESET FORM ===== */

    function resetForm() {
        const form = $("#itemForm");

        if (!form) return;

        form.reset();
        $("#itemId").value = "";
    }

    /* ===== CREATE / UPDATE ===== */

    function saveFromForm(event) {
        event.preventDefault();

        const idValue = $("#itemId").value;

        const name = $("#name").value.trim();
        const quantityValue = $("#quantity").value;
        const quantity = Number(quantityValue);
        const expiry = $("#expiry").value;
        const supplier = $("#supplier").value.trim();

        if (!name || !supplier || !expiry) {
            alert("Please complete all medication fields.");
            return;
        }

        if (
            quantityValue.trim() === "" ||
            !Number.isSafeInteger(quantity) ||
            quantity < 0
        ) {
            alert("Please enter a valid non-negative whole number.");
            return;
        }

        if (idValue) {
            const id = Number(idValue);

            const index = items.findIndex(
                item => item.id === id
            );

            if (index === -1) {
                alert("Medication record not found.");
                return;
            }

            items[index] = {
                id,
                name,
                quantity,
                expiry,
                supplier
            };

        } else {
            items.push({
                id: nextId++,
                name,
                quantity,
                expiry,
                supplier
            });
        }

        saveItems();
        renderItems();
        resetForm();
    }

    /* ===== EDIT / DELETE ===== */

    function handleTableClick(event) {
        const button = event.target.closest("button");

        if (!button) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        const item = items.find(
            record => record.id === id
        );

        if (!item) return;

        if (action === "delete") {
            const confirmed = confirm(
                `Delete ${item.name} from inventory?`
            );

            if (!confirmed) return;

            items = items.filter(
                record => record.id !== id
            );

            saveItems();
            renderItems();

            if ($("#itemId").value === String(id)) {
                resetForm();
            }
        }

        if (action === "edit") {
            $("#itemId").value = item.id;
            $("#name").value = item.name;
            $("#quantity").value = item.quantity;
            $("#expiry").value = item.expiry;
            $("#supplier").value = item.supplier;

            $("#inventory-form")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            $("#name").focus({
                preventScroll: true
            });
        }
    }

    /* ===== DASHBOARD CHARTS ===== */

    function initCharts() {
        if (typeof Chart === "undefined") return;

        Chart.defaults.font.family =
            "'Segoe UI', Roboto, Arial, sans-serif";

        Chart.defaults.color = "#64748b";

        const stockCanvas = $("#chartStockByCategory");

        if (stockCanvas) {
            new Chart(stockCanvas, {
                type: "bar",
                data: {
                    labels: [
                        "Analgesics",
                        "Antibiotics",
                        "Vitamins",
                        "Allergy",
                        "Others"
                    ],
                    datasets: [{
                        label: "Stock",
                        data: [120, 60, 200, 40, 80],
                        backgroundColor: "#087f8c",
                        borderRadius: 8,
                        maxBarThickness: 55
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: "#edf2f7"
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        const expiryCanvas = $("#chartExpiryTrend");

        if (expiryCanvas) {
            new Chart(expiryCanvas, {
                type: "line",
                data: {
                    labels: [
                        "Jan", "Feb", "Mar",
                        "Apr", "May", "Jun"
                    ],
                    datasets: [{
                        label: "Items Expiring",
                        data: [5, 8, 4, 12, 9, 6],
                        borderColor: "#e7a044",
                        backgroundColor: "rgba(231,160,68,.12)",
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 5,
                        pointBackgroundColor: "#ffffff",
                        pointBorderColor: "#e7a044",
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: "#edf2f7"
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        const supplierCanvas = $("#chartSupplierShare");

        if (supplierCanvas) {
            new Chart(supplierCanvas, {
                type: "doughnut",
                data: {
                    labels: [
                        "Supplier A",
                        "Supplier B",
                        "Supplier C"
                    ],
                    datasets: [{
                        data: [45, 30, 25],
                        backgroundColor: [
                            "#087f8c",
                            "#22b9b2",
                            "#142b49"
                        ],
                        borderWidth: 4,
                        borderColor: "#ffffff",
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "65%",
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        }
    }
    /* ===== NAVIGATION: HIGHLIGHT CURRENT PAGE ===== */

    function highlightActiveNav() {
        let current = decodeURIComponent(
            window.location.pathname.split("/").pop()
        ).toLowerCase();

        if (current === "") current = "index.html";

        document.querySelectorAll(".nav-links a[href]").forEach(link => {
            const target = (
                link.getAttribute("href")
                    .split(/[?#]/)[0]
                    .split("/")
                    .pop()
                    .toLowerCase()
            ) || "index.html";

            const isCurrent = target === current;

            link.classList.toggle("active", isCurrent);

            if (isCurrent) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }
    /* ===== INITIALIZATION ===== */

    document.addEventListener("DOMContentLoaded", () => {
        loadItems();

        const form = $("#itemForm");

        if (form) {
            form.addEventListener("submit", saveFromForm);

            $("#resetBtn")?.addEventListener(
                "click",
                resetForm
            );

            $("#itemsTable")?.addEventListener(
                "click",
                handleTableClick
            );

            renderItems();
        }

        initCharts();
    });

})();
