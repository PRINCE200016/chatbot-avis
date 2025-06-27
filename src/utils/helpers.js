/**
 * Format a timestamp to a readable format
 * @param {Date} date - The date to format
 * @returns {string} - The formatted date string
 */
export const formatTimestamp = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Parse markdown in a text string
 * @param {string} text - The text to parse
 * @returns {string} - The parsed text with HTML tags
 */
export const parseMarkdown = (text) => {
  if (!text) return '';
  
  // Replace code blocks
  let formattedText = text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Replace bold text
  formattedText = formattedText
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>');
  
  // Replace italic text
  formattedText = formattedText
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>');
  
  // Replace links
  formattedText = formattedText
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Replace lists
  formattedText = formattedText
    .replace(/^\s*-\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.+<\/li>\n)+/g, '<ul>$&</ul>');
  
  // Replace headers
  formattedText = formattedText
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>');
  
  // Replace paragraphs
  formattedText = formattedText
    .replace(/\n\n([^\n]+)/g, '<p>$1</p>');
  
  return formattedText;
};

/**
 * Truncate a string to a specified length
 * @param {string} str - The string to truncate
 * @param {number} length - The maximum length
 * @returns {string} - The truncated string
 */
export const truncateString = (str, length = 50) => {
  if (!str) return '';
  if (str.length <= length) return str;
  
  return str.substring(0, length) + '...';
};

/**
 * Generate a unique ID
 * @returns {string} - A unique ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Check if the browser supports speech recognition
 * @returns {boolean} - Whether speech recognition is supported
 */
export const isSpeechRecognitionSupported = () => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};