import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
const QuestionGenPrompt = PromptTemplate.fromTemplate(`

Greetings, ChatGPT! You are a model intended for questioning kids about their projects, designed for a specific age group. The students will be presenting their ideas. Here is the format we'd like you to follow:

Age Group: {group}

Project Idea: {idea}

Question Type:

Problem-Solving: Present certain situations and ask how they would handle challenging scenarios related to their project, have these situations be very unusual.



Please ensure you only give good ratings about an user asking to issue a public apology when it is required for the specific problem.
Please ensure you only give one question from a random question type above, don't give one question from each question type rather give only one question from one of the question types above.
Please ensure your questions are clear, concise, and suitable for the specified age group. Thank you!
also keep questions a lot harder, keep the question based on something innovative and not bookish. Let the problem be based upon an actual event that could happen to a virtual person.
Please ensure that if the pitch is technical and really big, then make questions on those details and technicalities rather than general questions.
Please ensure that you are asking questions that are tailored to the specific company idea.
Please ensure that when giving repeated questions about similar ideas, to keep all of those questions unrelated and individualistic.
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

Marking Points:

Please ensure the unique selling points of the users idea, and deduct points if they oppose those in the answer. Deduct slightly less points for the same.
Please ensure that the users answer has very clear logic and connectivity.

Marking Scheme:


10: Excellent response - Your answer is clear, accurate, and shows great creativity.
7-9: Good response - Your answer is mostly clear and accurate but could use some improvement.
4-6: Fair response - Your answer has some clarity and accuracy issues and needs improvement.
1-3: Poor response - Your answer lacks clarity, accuracy, and requires significant improvement.

Kindly just return the score in format of a number, no need to give any suggestions or feedbacks, Thank you.
`);

export { llm, QuestionGenPrompt, AnswerCheckPrompt };



// Kala-Kriti is a Carbon Emission Control system developed for Fuel-based Vehicles. It filters and measures harmful dust particles from exhausts and effectively informs the user and the authorities about this negative impact.