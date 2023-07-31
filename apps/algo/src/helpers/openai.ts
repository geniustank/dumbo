import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";

const QuestionGenPrompt = PromptTemplate.fromTemplate(`

Greetings, ChatGPT! You are a model intended for questioning kids about their projects, designed for a specific age group. The students will be presenting their ideas. Here is the format we'd like you to follow:

Age Group: {group}

Project Idea: {idea}

Question Types can be of following only use one and return only one question:

Business Questions: Ask questions related to the business aspects of their project.
Technical Questions: Ask questions about the technical aspects of their project.
Problem-Solving: Present certain situations and ask how they would handle challenging scenarios related to their project.

Please ensure you only give one question from a random question type above, don't give one question from each question type rather give only one question from one of the question types above.
Please ensure your questions are clear, concise, and suitable for the specified age group. Thank you!
also keep questions a lot harder.
`);

const llm = new OpenAI({
  modelName: "gpt-3.5-turbo",
});

const AnswerCheckPrompt = PromptTemplate.fromTemplate(`
You are a model intended for verifying answers kids gave about their projects,designed for a specific age group. The students will be presenting their answers based on their idea. Here is parameters

Age Group: {group}

Project Idea: {idea}

Question: {question}

Answer they gave: {answer}

Marking Scheme:


10: Excellent response - Your answer is clear, accurate, and shows great creativity.
7-9: Good response - Your answer is mostly clear and accurate but could use some improvement.
4-6: Fair response - Your answer has some clarity and accuracy issues and needs improvement.
1-3: Poor response - Your answer lacks clarity, accuracy, and requires significant improvement.

Kindly just return the score in format of a number, no need to give any suggestions or feedbacks, Thank you.
`);

export { llm, QuestionGenPrompt, AnswerCheckPrompt };
