const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
APIKEY = "AIzaSyBs5tjfTL9RUNymqNpig2YOQGFoAMIaQ4s"
const genAI = new GoogleGenerativeAI(APIKEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function run() {
  country = "canada"
  const prompt = "i am going on a trip from tunisia to "+country+" can you provide me with 5 plans in this format : 1 - plan1 newline 2-plan2 etc"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();