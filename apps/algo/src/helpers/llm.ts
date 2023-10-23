import { HNSWLib } from "langchain/vectorstores";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import path from "path";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { questionPrompt } from "./prompt";
import { BufferMemory } from "langchain/memory";


export async function execute(options: {
    question: string;
    history?: string;
    isStreaming: boolean;

  }) {
    const questionChain = new ChatOpenAI({});
    const dir = path.resolve(process.cwd(), "data");

  const vectorStore = await HNSWLib.load(dir, new OpenAIEmbeddings());
    const doc = new ChatOpenAI({
      temperature: 0.2,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelName: "gpt-3.5-turbo",
      streaming: options.isStreaming,
      callbackManager: {
        handleLLMStart: () => {},
        handleLLMEnd: () => {},
        handleLLMNewToken: () => {},
      } as any,
    });
    const client = ConversationalRetrievalQAChain.fromLLM(
      doc,
      vectorStore.asRetriever(),
      {
        questionGeneratorChainOptions: {
          llm: questionChain,
          template: String(questionPrompt),
        },
        memory: new BufferMemory({
          memoryKey: "chat_history", 
        }),
      },
    );

    const rep = await client.call({
        question: options.question,
        
    })

    console.log(rep.text)
    return rep.text
  }