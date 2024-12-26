import { Observable } from '@nativescript/core';

export class Chatbot extends Observable {
  private supportiveResponses = [
    "I'm here to listen and support you.",
    "You are strong and brave for seeking help.",
    "Your safety and well-being matter.",
    "You deserve to feel safe and respected.",
    "Take deep breaths. You're not alone in this."
  ];

  getResponse(message: string): string {
    // Simple response for now - can be enhanced with more sophisticated logic
    return this.supportiveResponses[Math.floor(Math.random() * this.supportiveResponses.length)];
  }
}