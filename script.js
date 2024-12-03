
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// API details
const apiKey = "AIzaSyBSwh16Hb2210Ut665p0-sCuLGMl6pY7zg"; // Your API key
const searchEngineId = "54e91dc78f23d4494"; // Your Search Engine ID

//  fetch Google results
async function fetchResults(query) {
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching results:", error);
    return [];
  }
}

// handle user input
async function handleUserInput() {
  const userText = userInput.value.trim();
  if (!userText) return;

  addMessage("You", userText);
  userInput.value = "";

  const results = await fetchResults(userText);

  if (results.length > 0) {
   
    const snippet = results[0].snippet;
    addMessage("Chatbot", snippet);
  } else {
    addMessage("Chatbot", "Sorry, I couldn't find an answer to your query.");
  }
}

// add messages to chat
function addMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", handleUserInput);
userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleUserInput();
  }
});


async function handleUserInput() {
  const userText = userInput.value.trim();
  if (!userText) return;

  addMessage("You", userText);
  userInput.value = ""; 

  const results = await fetchResults(userText);

  if (results.length > 0) {

    const bestResult = results[0];
    const title = bestResult.title;
    const snippet = bestResult.snippet;
    const answer = `${title}: ${snippet}`;
    addMessage("Chatbot", answer);
  } else {
    addMessage("Chatbot", "Sorry, I couldn't find an answer to your query.");
  }
}

