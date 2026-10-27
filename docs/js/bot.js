// bot.js: connects the bot.html question list and "Ask" box to the Botpress webchat.
// Clicking a question (or typing one and pressing Ask) opens the chat window
// and sends the question to the PharmaFlow Assistant.
// Botpress API used: window.botpress.open(), .sendMessage(), .on('webchat:ready')

(function () {
    var chatReady = false;
    var pendingQuestion = null;

    function hookBotpress() {
        var bp = window.botpress;
        if (!bp || typeof bp.on !== "function") return false;
        bp.on("webchat:ready", function () {
            chatReady = true;
            if (pendingQuestion) {
                var q = pendingQuestion;
                pendingQuestion = null;
                send(q);
            }
        });
        return true;
    }

    function send(question) {
        try {
            window.botpress.sendMessage(question);
        } catch (e) {
            copyToClipboard(question);
            setNote("Your question was copied. Paste it into the chat window to ask.");
        }
    }

    function askBot(question) {
        if (!question) return;
        var bp = window.botpress;
        if (!bp || typeof bp.open !== "function") {
            copyToClipboard(question);
            setNote("The chat is still loading. Your question was copied, so wait a moment and paste it into the chat bubble.");
            return;
        }
        bp.open();
        if (chatReady) {
            setTimeout(function () { send(question); }, 300);
        } else {
            pendingQuestion = question; // sent automatically once the chat is ready
        }
    }

    function copyToClipboard(text) {
        if (navigator.clipboard) navigator.clipboard.writeText(text).catch(function () {});
    }

    function setNote(text) {
        var note = document.querySelector(".bot-chat-input-area p");
        if (note) note.textContent = text;
    }

    document.addEventListener("DOMContentLoaded", function () {
        // The Botpress script loads after this file, so try hooking it up now and again shortly.
        if (!hookBotpress()) {
            var tries = 0;
            var timer = setInterval(function () {
                tries++;
                if (hookBotpress() || tries > 40) clearInterval(timer);
            }, 250);
        }

        // Quick-question cards
        document.querySelectorAll(".bot-suggestion").forEach(function (card) {
            card.style.cursor = "pointer";
            var p = card.querySelector("p");
            var text = p ? p.textContent.trim() : "";
            card.addEventListener("click", function () { askBot(text); });
            card.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    askBot(text);
                }
            });
        });

        // "Ask" box
        var form = document.getElementById("bot-ask-form");
        var input = document.getElementById("bot-ask-input");
        if (form && input) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                askBot(input.value.trim());
                input.value = "";
            });
        }
    });
})();
