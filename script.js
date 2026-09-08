const messages = document.getElementById("messages");
const userInput = document.getElementById("userInput");


// ======================================
// SEND MESSAGE
// ======================================

async function sendMessage() {

    const question = userInput.value.trim();

    if (question === "") return;

    // Add user message
    addMessage(question, "user-message");

    userInput.value = "";

    // Thinking message
    const thinking = addMessage("🤖 Thinking...", "ai-message");

    try {

        const response = await fetch("http://127.0.0.1:5000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });

        const data = await response.json();

        thinking.remove();

        if (response.ok) {

            addAIMessage(data.answer);

        } else {

            addMessage(
                "❌ " + (data.answer || "Something went wrong."),
                "ai-message"
            );

        }

    } catch (error) {

        thinking.remove();

        addMessage(
            "❌ Cannot connect to EduNexa AI backend.",
            "ai-message"
        );

        console.error(error);
    }
}


// ======================================
// ADD NORMAL MESSAGE
// ======================================

function addMessage(text, className) {

    const message = document.createElement("div");

    message.className = "message " + className;

    message.textContent = text;

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;

    return message;
}


// ======================================
// ADD AI MESSAGE
// ======================================

function addAIMessage(text) {

    const message = document.createElement("div");

    message.className = "message ai-message";

    message.innerHTML = formatAIResponse(text);

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;

    return message;
}


// ======================================
// FORMAT AI RESPONSE
// ======================================

function formatAIResponse(text) {

    // ----------------------------------
    // Escape HTML
    // ----------------------------------

    text = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");


    // ----------------------------------
    // CODE BLOCKS
    // ----------------------------------

    text = text.replace(
        /```(?:\w+)?\s*([\s\S]*?)```/g,
        function(match, code) {

            return `
                <pre class="code-block"><code>${code.trim()}</code></pre>
            `;

        }
    );


    // ----------------------------------
    // INLINE CODE
    // ----------------------------------

    text = text.replace(
        /`([^`]+)`/g,
        "<code class=\"inline-code\">$1</code>"
    );


    // ----------------------------------
    // BOLD TEXT
    // ----------------------------------

    text = text.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );


    // ----------------------------------
    // HEADINGS
    // ----------------------------------

    text = text.replace(
        /^### (.*)$/gm,
        "<h4>$1</h4>"
    );

    text = text.replace(
        /^## (.*)$/gm,
        "<h3>$1</h3>"
    );

    text = text.replace(
        /^# (.*)$/gm,
        "<h2>$1</h2>"
    );


    // ----------------------------------
    // BULLET POINTS
    // ----------------------------------

    text = text.replace(
        /^\s*[-*]\s+(.*)$/gm,
        "<li>$1</li>"
    );


    // ----------------------------------
    // NUMBERED LIST
    // ----------------------------------

    text = text.replace(
        /^\s*\d+\.\s+(.*)$/gm,
        "<li>$1</li>"
    );


    // ----------------------------------
    // WRAP LIST ITEMS
    // ----------------------------------

    text = text.replace(
        /(<li>.*<\/li>\s*)+/gs,
        function(match) {

            return "<ul>" + match + "</ul>";

        }
    );


    // ----------------------------------
    // LINE BREAKS
    // ----------------------------------

    text = text.replace(/\n/g, "<br>");


    // ----------------------------------
    // CLEAN EXTRA BR TAGS
    // ----------------------------------

    text = text.replace(
        /<br>\s*<ul>/g,
        "<ul>"
    );

    text = text.replace(
        /<\/ul>\s*<br>/g,
        "</ul>"
    );

    text = text.replace(
        /<br>\s*<pre/g,
        "<pre"
    );

    text = text.replace(
        /<\/pre>\s*<br>/g,
        "</pre>"
    );

    text = text.replace(
        /<br>\s*<h([234])/g,
        "<h$1"
    );


    return text;
}


// ======================================
// QUICK QUESTIONS
// ======================================

function askQuestion(question) {

    userInput.value = question;

    sendMessage();
}


// ======================================
// ENTER KEY
// ======================================

function handleEnter(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendMessage();
    }
}


// ======================================
// NEW CHAT
// ======================================

function newChat() {

    messages.innerHTML = "";

    userInput.value = "";

    userInput.focus();
}


// ======================================
// SIDEBAR SECTIONS
// ======================================

function showSection(section) {

    let question = "";

    if (section === "ask") {

        question =
            "How can you help me as a college student?";

    }

    if (section === "study") {

        question =
            "Give me some effective study tips.";

    }

    if (section === "exam") {

        question =
            "How should I prepare for my exams?";

    }

    if (section === "rules") {

        question =
            "What are general college regulations?";

    }

    userInput.value = question;

    sendMessage();
}


// ======================================
// DARK MODE
// ======================================

function toggleTheme() {

    document.body.classList.toggle("dark");
}