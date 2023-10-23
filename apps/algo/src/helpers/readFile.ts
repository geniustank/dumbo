import fs from "fs";
import path from "path";
import { load } from "cheerio";
import { Document } from "langchain/document";

export async function loopDirectory(
  directoryPath: string,
): Promise<Document[]> {
  const docs: Document[] = [];
  let finalPath = directoryPath;
  if (!directoryPath.includes(process.cwd()))
    finalPath = process.cwd() + directoryPath;
  try {
    const files = fs.readdirSync(finalPath);
    for (const file of files) {
      const filePath = path.join(finalPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        console.log(stat.isDirectory);
        const nestedDocs = await loopDirectory(filePath);
        docs.push(...nestedDocs);
      } else {
        const doc = await getContentFromFile(filePath);
        docs.push(doc);
      }
    }
  } catch (err) {
    console.error(err);
    throw new Error(
      `Could not read directory: ${finalPath}. Did you run \`sh download.sh\`?`,
    );
  }

  return docs;
}

export async function getContentFromFile(filePath: string): Promise<Document> {
  return new Promise<Document>((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, fileContents) => {
      if (err) {
        reject(err);
      } else {
        const text = load(fileContents).text();
        const metadata = { source: filePath };
        const doc = new Document({ pageContent: text, metadata });
        resolve(doc);
      }
    });
  });
}