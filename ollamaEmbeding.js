import { Embeddings } from "@langchain/core/embeddings";

export class OllamaEmbeddings extends Embeddings {
  model;

  constructor({ model }) {
    super();
    this.model = model;
  }

  async embedDocuments(texts) {
    return Promise.all(texts.map((text) => this.embedQuery(text)));
  }

  async embedQuery(text) {
    const response = await fetch("http://localhost:11434/api/embeddings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.model,
        prompt: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.embedding;
  }
}
