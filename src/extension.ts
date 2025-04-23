import axios from "axios";

export const analyzeCodeWithGemini = async (
  code: string,
  characters: { prompt: string; gif: string }
) => {
  const apikey = "AIzaSyCK77OqP6dHRFpbkcyjGRquqhdbHn3IOug";
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
