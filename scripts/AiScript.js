const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
APIKEY = "AIzaSyBs5tjfTL9RUNymqNpig2YOQGFoAMIaQ4s"
const genAI = new GoogleGenerativeAI(APIKEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function run(country) {
  const prompt = "I am going on a trip from Tunisia to " + country + ". Can you provide me with 5 security-focused travel plans? Please format the plans as follows: 1 - Safety Tip 1\n2 - Safety Tip 2\n3 - Safety Tip 3\n4 - Safety Tip 4\n5 - Safety Tip 5. The advice should include personalized safety recommendations, precautions based on the destination, and any relevant security measures to ensure a safe trip."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

module.exports = { run };