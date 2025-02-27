import dotenv from 'dotenv';
import express from 'express';
import { OpenAI } from 'openai';
dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey:
    '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',
});

app.get('/test', (req, res) => {
  res.send('test');
});

app.post('/getResponse', async (req, res) => {
  try {
    const { inputText } = req.body;
    console.log(req.body);

    // Process the text using ChatGPT (or any other logic)
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: `Simplify this text: ${inputText}` }],
    });

    //debug
    console.log('test');
    console.log(response.choices[0].message.content);

    // Extract the response text and send it back to the client
    const simplifiedText = response.choices[0].message.content;
    res.send(simplifiedText);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing request.');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
