import dotenv from "dotenv";
import express from "express";
import { OpenAI } from "openai";
dotenv.config();



const app = express()



const openai = new OpenAI(  
  {
    apiKey: "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", 
  }
  
) 
  

app.post("/getResponse", async (req, res) => {
    try {
      const { inputText } = req.body; // Extract the input text
  
      // Process the text using ChatGPT (or any other logic)
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "user", content: `Simplify this text: ${inputText}` }],
      });
  
      // Extract the response text and send it back to the client
      const simplifiedText = response.data.choices[0].message.content;
      res.send(simplifiedText);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error processing request.");
    }
  });
  const PORT = 5173
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })






