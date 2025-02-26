import 'dotenv/config';
import { readFile } from 'fs/promises';
import OpenAI from "openai";

const openai = new OpenAI();

async function run() {
  try {
    const recipe = await readFile('utils/Recipe.txt', 'utf8');
    console.log(recipe);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a nutritionist and meal planner." },
        { role: "system", content: recipe },
        {
          role: "system",
          content: "Using the provided recipe, tell me which ingredients can be prepped in advance. Give me directions and safe storage information for each recipe.",
        },
      ],
      store: true,
    })

    console.log(completion.choices[0].message.content);
  } catch (err) {
    console.log(err);
  }
};

run();

