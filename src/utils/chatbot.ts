import { GoogleGenerativeAI } from '@google/generative-ai';

export class Chatbot {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI('AIzaSyAqeptPMdi-UjbaLi13QQCoi7gx5RKpa6w'); // Replace with actual API key in production
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async getResponse(message: string): Promise<string> {
    try {
      const prompt = `As a supportive counselor for domestic violence victims, provide a compassionate, detailed, and encouraging response to this message. Focus on empowerment, safety, and practical next steps. Message: ${message}`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      // Fallback responses if API fails
      const supportiveResponses = [
        "You are incredibly brave for seeking help. Remember that the abuse is never your fault, and you deserve to live free from fear. Consider reaching out to a domestic violence hotline at 1-800-799-SAFE for confidential support and guidance on creating a safety plan.",
        "Your safety and well-being matter more than anything. If you're in immediate danger, please call 911. There are people and organizations ready to support you through this journey. The National Domestic Violence Hotline is available 24/7 at 1-800-799-SAFE.",
        "You have shown tremendous strength by acknowledging what's happening. Remember that healing takes time, and there are professionals who specialize in helping survivors rebuild their lives. Consider connecting with a counselor who understands domestic violence trauma.",
        "Your feelings are valid, and you're not alone in this struggle. Many survivors have walked this path before and found their way to safety and healing. Would you like information about local support services or shelters that can help?"
      ];
      return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
    }
  }
}