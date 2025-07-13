import axios from 'axios';
import { useEffect, useState } from 'react';

export function useBlockedWords() {
  const [blockedWords, setBlockedWords] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3200/ai/blockedTopics')
      .then((res) => setBlockedWords(res.data.blockedTopics || []))
      .catch(() => {
        setBlockedWords([]);
      });
  }, []);

  return blockedWords;
}
