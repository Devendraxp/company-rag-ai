import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";

const textSplitter = new CharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 100,
});


export async function loadPdf(docPath) {
    const loader = new PDFLoader(docPath,{splitPages: false});
    const doc = await loader.load();

    const texts = await textSplitter.splitText(doc[0].pageContent);

    console.log(texts)

}
