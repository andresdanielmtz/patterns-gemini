import axios from "axios";

export const analyzeCodeWithGemini = async (
  code: string,
  characters: { prompt: string; gif: string }
) => {
  const apikey = process.env.GEMINI_KEY;
  if (!apikey) {
    console.error("API key is missing");
    return;
  }
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        apikey,
      {
        contents: [
          {
            parts: [{ text: `${characters?.prompt}${code}` }],
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } }
    );
    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return result;
  } catch (error) {}
};

// Example usage
analyzeCodeWithGemini(
  `const a = 1;
const b = 2;
const c = a + b;
console.log(c);`,
  {
    prompt: "Analyze the following code:\n",
    gif: "https://media1.tenor.com/m/CNI1fSM1XSoAAAAd/shocked-surprised.gif",
  }
).then((result) => {
  console.log(result);
});
