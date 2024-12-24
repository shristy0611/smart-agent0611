import React, { useState, KeyboardEvent } from 'react';

interface HeaderProps {
  topic: string;
  setTopic: (topic: string) => void;
  onTopicChange: (newTopic: string | null) => void;
}

export function Header({ topic, setTopic, onTopicChange }: HeaderProps) {
  const [localTopic, setLocalTopic] = useState(topic);

  const handleTopicChange = (newTopic: string) => {
    setLocalTopic(newTopic);
    // If topic is completely empty, trigger removal notification
    if (newTopic === '') {
      onTopicChange(null);
    }
  };

  const handleBlur = () => {
    // Only trigger change if the topic actually changed
    if (localTopic !== topic && localTopic !== '') {
      onTopicChange(localTopic);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur(); // This will trigger the blur event
    }
  };

  return (
    <div className="bg-blue-600 text-white p-4">
      <div className="max-w-4xl mx-auto flex items-center">
        <input
          type="text"
          value={localTopic}
          onChange={(e) => handleTopicChange(e.target.value)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          placeholder="Enter topic... / トピックを入力..."
          className="flex-1 px-4 py-2 rounded bg-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}