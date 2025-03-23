export const summarizeTextWithAzure = async (text) => {
    const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;
    const deploymentName = process.env.REACT_APP_AZURE_OPENAI_DEPLOYMENT_NAME;
  
    try {
      const response = await fetch(`${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=2023-03-15-preview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful assistant that summarizes conversation based on a text transcription in french." },
            { role: "user", content: `Please summarize the following text in french: ${text}` },
          ],
          max_tokens: 150,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        return data.choices[0].message.content;
      } else {
        console.error("Error from Azure OpenAI API:", data);
        throw new Error("Failed to summarize the text.");
      }
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while summarizing the text.");
    }
  };