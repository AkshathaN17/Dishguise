import React, { useState, useEffect } from 'react';
import { generateRandomLogo } from './utils/logo-generator';
import { supportMessages } from './utils/support-messages';
import { emergencyContacts } from './utils/emergency-contacts';
import { Chatbot } from './utils/chatbot';
import { AppConfig } from './utils/config';
import { CodeKey } from './components/CodeKey';
import { PasswordModal } from './components/PasswordModal';

const chatbot = new Chatbot();
const config = AppConfig.getInstance();

function App() {
  const [logo, setLogo] = useState(generateRandomLogo());
  const [supportMessage, setSupportMessage] = useState('Welcome to our recipe collection!');
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isCodeKeyOpen, setIsCodeKeyOpen] = useState(false);

  const handleIntensitySelection = (category: string, intensity: string) => {
    const needsUrgentHelp = config.addReport(category);
    const messages = supportMessages[category as keyof typeof supportMessages];
    setSupportMessage(messages[intensity as keyof typeof messages]);

    if (needsUrgentHelp) {
      alert(`Important Safety Alert\n\nPlease contact emergency services immediately:\n\nPolice: ${emergencyContacts.police}\nNational Hotline: ${emergencyContacts.nationalHotline}`);
    }
  };

  const IntensityButtons = ({ category }: { category: string }) => (
    <div className="flex gap-2 mt-2">
      <button onClick={() => handleIntensitySelection(category, 'starter')} 
              className="bg-green-500 text-white px-4 py-2 rounded">
        Starter
      </button>
      <button onClick={() => handleIntensitySelection(category, 'main')} 
              className="bg-yellow-500 text-white px-4 py-2 rounded">
        Main Course
      </button>
      <button onClick={() => handleIntensitySelection(category, 'dessert')} 
              className="bg-red-500 text-white px-4 py-2 rounded">
        Dessert
      </button>
    </div>
  );

  const handleEmergency = () => {
    const contactsList = emergencyContacts.ngos.map(ngo => 
      `${ngo.name}: ${ngo.phone} - ${ngo.description}`
    ).join('\n\n');
    
    const centersList = emergencyContacts.empowermentCenters.map(center =>
      `${center.name}: ${center.phone} (${center.location})`
    ).join('\n\n');

    alert(
      `Emergency Contacts:\n\n` +
      `Police: ${emergencyContacts.police}\n` +
      `National Hotline: ${emergencyContacts.nationalHotline}\n` +
      `Women's Helpline: ${emergencyContacts.womensHelpline}\n\n` +
      `NGOs and Support Organizations:\n\n${contactsList}\n\n` +
      `Women's Empowerment Centers:\n\n${centersList}`
    );
  };

  const handleChatSend = async () => {
    if (chatInput.trim()) {
      const response = await chatbot.getResponse(chatInput);
      setChatResponse(response);
      setChatInput('');
    }
  };

  const handleCollectionsClick = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSuccess = () => {
    setIsPasswordModalOpen(false);
    setIsCodeKeyOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl mr-2">{logo}</span>
          <h1 className="text-xl font-bold">Foodie's Paradise</h1>
        </div>
        <button 
          onClick={handleCollectionsClick}
          className="bg-purple-700 px-4 py-2 rounded hover:bg-purple-800"
        >
          My Collections
        </button>
      </header>

      <PasswordModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
      />

      <CodeKey 
        isOpen={isCodeKeyOpen} 
        onClose={() => setIsCodeKeyOpen(false)} 
      />

      <main className="container mx-auto p-4 space-y-6">
        <div className="grid gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Popular Cuisines</h2>
            <div className="space-y-4">
              <div>
                <button onClick={() => setCurrentCategory('physical')} 
                        className="w-full bg-blue-500 text-white p-3 rounded">
                  Indian Recipes
                </button>
                {currentCategory === 'physical' && <IntensityButtons category="physical" />}
              </div>
              <div>
                <button onClick={() => setCurrentCategory('emotional')} 
                        className="w-full bg-blue-500 text-white p-3 rounded">
                  Italian Recipes
                </button>
                {currentCategory === 'emotional' && <IntensityButtons category="emotional" />}
              </div>
              <div>
                <button onClick={() => setCurrentCategory('sexual')} 
                        className="w-full bg-blue-500 text-white p-3 rounded">
                  Chinese Recipes
                </button>
                {currentCategory === 'sexual' && <IntensityButtons category="sexual" />}
              </div>
            </div>
          </div>

          <button onClick={handleEmergency} 
                  className="bg-red-600 text-white p-4 rounded-lg text-lg font-bold">
            I am starving
          </button>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-700">{supportMessage}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Recipe Assistant</h2>
            <div className="space-y-4">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask for cooking tips..."
                className="w-full p-2 border rounded"
                rows={3}
              />
              <button onClick={handleChatSend} 
                      className="bg-purple-600 text-white px-4 py-2 rounded">
                Send
              </button>
              {chatResponse && (
                <p className="text-gray-700 mt-2">{chatResponse}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;