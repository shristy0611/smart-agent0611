import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import { Loader2 } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
}

export function ChatWindow({ messages }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-4 ${
              message.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {message.isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{message.text}</span>
              </div>
            ) : (
              <ReactMarkdown
                className="prose prose-sm max-w-none dark:prose-invert"
                components={{
                  // Style code blocks
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline ? (
                      <pre className="bg-gray-800 text-gray-100 rounded p-2 overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code className="bg-gray-200 text-gray-800 rounded px-1" {...props}>
                        {children}
                      </code>
                    );
                  },
                  // Style tables
                  table: ({ children }) => (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-300">
                        {children}
                      </table>
                    </div>
                  ),
                  // Style lists
                  ul: ({ children }) => (
                    <ul className="list-disc pl-4 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-4 space-y-1">
                      {children}
                    </ol>
                  ),
                }}
              >
                {message.text}
              </ReactMarkdown>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}