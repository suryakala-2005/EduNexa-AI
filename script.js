const messages = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const welcome = document.getElementById("welcome");
const quickSection = document.getElementById("quickSection");


/* ================= DEMO ANSWERS ================= */

const answers = {

    "dbms": `
        <strong>DBMS</strong> stands for Database Management System.
        <br><br>
        It is software used to create, store, manage and retrieve data from databases.
        <br><br>
        <strong>Examples:</strong>
        <ul>
            <li>MySQL</li>
            <li>Oracle</li>
            <li>PostgreSQL</li>
            <li>MongoDB</li>
        </ul>
    `,

    "oops": `
        <strong>OOPs</strong> stands for Object-Oriented Programming.
        <br><br>
        It is a programming approach based on objects and classes.
        <br><br>
        <strong>Main concepts:</strong>
        <ul>
            <li>Encapsulation</li>
            <li>Inheritance</li>
            <li>Polymorphism</li>
            <li>Abstraction</li>
        </ul>
    `,

    "os": `
        <strong>Operating System</strong> is system software that manages computer hardware and software resources.
        <br><br>
        <strong>Examples:</strong>
        <ul>
            <li>Windows</li>
            <li>Linux</li>
            <li>macOS</li>
            <li>Android</li>
        </ul>
    `,

    "exam": `
        <strong>Exam Preparation Tips 📝</strong>
        <br><br>
        <ul>
            <li>Understand the syllabus.</li>
            <li>Create a simple study timetable.</li>
            <li>Study important concepts regularly.</li>
            <li>Practice previous-year questions.</li>
            <li>Revise before the exam.</li>
        </ul>
    `,

    "study": `
        <strong>Study Tips 📚</strong>
        <br><br>
        <ul>
            <li>Set small daily goals.</li>
            <li>Study in a distraction-free place.</li>
            <li>Take short breaks.</li>
            <li>Practice instead of only reading.</li>
            <li>Revise regularly.</li>
        </ul>
    `,

    "attendance": `
        <strong>Attendance Tips 📊</strong>
        <br><br>
        <ul>
            <li>Attend classes regularly.</li>
            <li>Avoid unnecessary leave.</li>
            <li>Track your attendance percentage.</li>
            <li>Talk to your faculty when necessary.</li>
        </ul>
    `,

    "python": `
        <strong>Python 🐍</strong> is a high-level programming language.
        <br><br>
        It is commonly used for:
        <ul>
            <li>Web Development</li>
            <li>Data Science</li>
            <li>Machine Learning</li>
            <li>Artificial Intelligence</li>
            <li>Automation</li>
        </ul>
    `,

    "ai": `
        <strong>Artificial Intelligence (AI)</strong> is a technology that enables computers to perform tasks that normally require human intelligence.
        <br><br>
        <strong>Examples:</strong>
        <ul>
            <li>Chatbots</li>
            <li>Image Recognition</li>
            <li>Speech Recognition</li>
            <li>Recommendation Systems</li>
        </ul>
    `

};


/* ================= SEND MESSAGE ================= */

function sendMessage() {

    const question = userInput.value.trim();

    if (question === "") {
        return;
    }

    addMessage(question, "user-message");

    userInput.value = "";

    welcome.style.display = "none";
    quickSection.style.display = "none";

    setTimeout(() => {

        const answer = getAnswer(question);

        addMessage(answer, "ai-message");

    }, 500);
}


/* ================= FIND ANSWER ================= */

function getAnswer(question) {

    const q = question.toLowerCase();

    if (q.includes("dbms")) {
        return answers.dbms;
    }

    if (
        q.includes("oops") ||
        q.includes("oop") ||
        q.includes("object oriented")
    ) {
        return answers.oops;
    }

    if (
        q.includes("operating system") ||
        q === "os" ||
        q.includes("what is os")
    ) {
        return answers.os;
    }

    if (
        q.includes("exam") ||
        q.includes("prepare")
    ) {
        return answers.exam;
    }

    if (
        q.includes("study") ||
        q.includes("studying")
    ) {
        return answers.study;
    }

    if (q.includes("attendance")) {
        return answers.attendance;
    }

    if (q.includes("python")) {
        return answers.python;
    }

    if (
        q === "ai" ||
        q.includes("artificial intelligence")
    ) {
        return answers.ai;
    }

    if (
        q === "hi" ||
        q === "hello" ||
        q === "hey" ||
        q === "hai"
    ) {

        return `
            <strong>Hello! 👋</strong>
            <br><br>
            I'm <strong>EduNexa AI</strong>, your student assistant.
            <br><br>
            You can ask me about:
            <ul>
                <li>DBMS</li>
                <li>OOPs</li>
                <li>Operating System</li>
                <li>Python</li>
                <li>Exams</li>
                <li>Study Tips</li>
            </ul>
        `;
    }


    return `
        <strong>Demo Mode 🤖</strong>
        <br><br>
        I don't have an answer for that question yet.
        <br><br>
        Try asking:
        <ul>
            <li>What is DBMS?</li>
            <li>What is OOPs?</li>
            <li>What is Operating System?</li>
            <li>Give me study tips</li>
            <li>How can I prepare for exams?</li>
        </ul>
    `;
}


/* ================= ADD MESSAGE ================= */

function addMessage(text, className) {

    const message = document.createElement("div");

    message.className = "message " + className;

    message.innerHTML = text;

    messages.appendChild(message);

    message.scrollIntoView({
        behavior: "smooth",
        block: "end"
    });

    return message;
}


/* ================= QUICK QUESTION ================= */

function askQuestion(question) {

    userInput.value = question;

    sendMessage();
}


/* ================= ENTER ================= */

function handleEnter(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendMessage();

    }
}


/* ================= NEW CHAT ================= */

function newChat() {

    messages.innerHTML = "";

    userInput.value = "";

    welcome.style.display = "block";

    quickSection.style.display = "block";

    userInput.focus();
}


/* ================= WELCOME ================= */

function showWelcome() {

    newChat();

}


/* ================= DARK MODE ================= */

function toggleDarkMode() {

    document.body.classList.toggle("dark");

}
