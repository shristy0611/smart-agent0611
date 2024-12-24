import React from 'react';
import { Advisor, AdvisorType } from '../types/advisors';
import { detectLanguage } from '../utils/languageUtils';

interface AdvisorSelectorProps {
  advisors: Advisor[];
  selectedAdvisor: AdvisorType;
  onSelect: (advisor: AdvisorType) => void;
  userLanguage: 'en' | 'ja';
}

export function AdvisorSelector({ advisors, selectedAdvisor, onSelect, userLanguage }: AdvisorSelectorProps) {
  return (
    <div className="bg-blue-600 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <select
          value={selectedAdvisor}
          onChange={(e) => onSelect(e.target.value as AdvisorType)}
          className="w-full px-4 py-2 rounded bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {advisors.map((advisor) => (
            <option key={advisor.id} value={advisor.id}>
              {userLanguage === 'ja' ? advisor.nameJa : advisor.nameEn} - {userLanguage === 'ja' ? advisor.descriptionJa : advisor.descriptionEn}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
