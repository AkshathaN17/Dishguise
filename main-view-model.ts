import { Observable } from '@nativescript/core';
import { supportMessages, emergencyContacts } from './shared/support-messages';
import { Chatbot } from './shared/chatbot';
import { generateRandomLogo } from './shared/logo-generator';
import { AppConfig } from './shared/config';
import { alert } from '@nativescript/core/ui/dialogs';

export class MainViewModel extends Observable {
  private _supportMessage: string = "Welcome to our recipe collection!";
  private _chatInput: string = "";
  private _chatResponse: string = "";
  private _currentCategory: string = "";
  private chatbot: Chatbot;
  private config: AppConfig;

  constructor() {
    super();
    this.chatbot = new Chatbot();
    this.config = AppConfig.getInstance();
    this.config.appName = "Foodie's Paradise";
    this.logo = generateRandomLogo();
  }

  get appName(): string {
    return this.config.appName;
  }

  get supportMessage(): string {
    return this._supportMessage;
  }

  set supportMessage(value: string) {
    if (this._supportMessage !== value) {
      this._supportMessage = value;
      this.notifyPropertyChange('supportMessage', value);
    }
  }

  get chatInput(): string {
    return this._chatInput;
  }

  set chatInput(value: string) {
    if (this._chatInput !== value) {
      this._chatInput = value;
      this.notifyPropertyChange('chatInput', value);
    }
  }

  get chatResponse(): string {
    return this._chatResponse;
  }

  set chatResponse(value: string) {
    if (this._chatResponse !== value) {
      this._chatResponse = value;
      this.notifyPropertyChange('chatResponse', value);
    }
  }

  private showIntensityOptions(category: string) {
    this._currentCategory = category;
    const options = {
      title: "Choose a course",
      message: "Select your preference",
      cancelButtonText: "Cancel",
      actions: ["Starter", "Main Course", "Dessert"]
    };

    action(options).then((result) => {
      if (result !== "Cancel") {
        this.handleIntensitySelection(result.toLowerCase());
      }
    });
  }

  onIndianTap() {
    this.showIntensityOptions('physical');
  }

  onItalianTap() {
    this.showIntensityOptions('emotional');
  }

  onChineseTap() {
    this.showIntensityOptions('sexual');
  }

  private handleIntensitySelection(intensity: string) {
    const needsUrgentHelp = this.config.addReport(this._currentCategory);
    
    // Set support message based on category and intensity
    const messages = supportMessages[this._currentCategory];
    this.supportMessage = messages[intensity];

    if (needsUrgentHelp) {
      alert({
        title: "Important Safety Alert",
        message: `Please contact emergency services immediately:\n\nPolice: ${emergencyContacts.police}\nNational Hotline: ${emergencyContacts.nationalHotline}`,
        okButtonText: "OK"
      });
    }
  }

  onEmergency() {
    alert({
      title: "Emergency Services",
      message: "Contacting emergency services...",
      okButtonText: "OK"
    }).then(() => {
      // In a real app, this would trigger an actual emergency call
      console.log("Emergency services contacted");
    });
  }

  onChatSend() {
    if (this._chatInput.trim()) {
      this.chatResponse = this.chatbot.getResponse(this._chatInput);
      this.chatInput = "";
    }
  }
}