import { useState, useEffect, useCallback } from 'react';
import { isSpeechRecognitionSupported } from '../utils/helpers';

/**
 * Custom hook for speech recognition
 * @param {Object} options - Configuration options
 * @param {string} options.language - The language to recognize (default: 'en-US')
 * @param {boolean} options.continuous - Whether to continuously recognize (default: true)
 * @param {boolean} options.interimResults - Whether to return interim results (default: true)
 * @returns {Object} - Speech recognition state and functions
 */
const useSpeechRecognition = (options = {}) => {
  const {
    language = 'en-US',
    continuous = true,
    interimResults = true
  } = options;
  
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  
  // Initialize speech recognition
  useEffect(() => {
    const supported = isSpeechRecognitionSupported();
    setIsSupported(supported);
    
    let recognition = null;
    
    if (supported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      
      // Configure recognition
      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      recognition.lang = language;
      
      // Set up event handlers
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setTranscript(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setError(event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        if (isListening) {
          // Restart if it was supposed to be listening
          recognition.start();
        } else {
          setIsListening(false);
        }
      };
    }
    
    // Cleanup function
    return () => {
      if (recognition) {
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
        
        if (isListening) {
          recognition.stop();
        }
      }
    };
  }, [continuous, interimResults, language, isListening]);
  
  // Start listening
  const startListening = useCallback(() => {
    if (!isSupported) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = language;
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      setTranscript(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setError(event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      if (isListening) {
        // Restart if it was supposed to be listening
        recognition.start();
      } else {
        setIsListening(false);
      }
    };
    
    try {
      recognition.start();
      setIsListening(true);
      setError(null);
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setError(err.message);
    }
  }, [continuous, interimResults, isListening, isSupported, language]);
  
  // Stop listening
  const stopListening = useCallback(() => {
    if (!isSupported) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    try {
      recognition.stop();
      setIsListening(false);
    } catch (err) {
      console.error('Error stopping speech recognition:', err);
      setError(err.message);
    }
  }, [isSupported]);
  
  // Reset transcript
  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);
  
  return {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript
  };
};

export default useSpeechRecognition;