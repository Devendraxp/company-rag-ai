import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";

import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const pinecone = new PineconeClient();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,
});

const textSplitter = new CharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 100,
});

export async function loadPdf(docPath) {
  const loader = new PDFLoader(docPath, { splitPages: false });
  const doc = await loader.load();

  const texts = await textSplitter.splitText(doc[0].pageContent);

  console.log(texts);
}
