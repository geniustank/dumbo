import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SpaceName } from "hnswlib-node";
import { loopDirectory } from "./readFile";

export async function setupHNSWLib(
  path: string,
  pathname: string,
  options?: {
    timeout: number;
    modelName: string;
    maxConcurrency: 5;
  },
): Promise<void> {
  const args = {
    space: "ip" as SpaceName,
  };
  const client = new HNSWLib(new OpenAIEmbeddings(options), args);

  const rawDocs = await loopDirectory(path);
  console.log("got docs", rawDocs);
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 8000,
    chunkOverlap: 100,
  });

  const docs = await textSplitter.splitDocuments(rawDocs);
  console.log(await client.addDocuments(docs));
  await client.save(pathname);
}