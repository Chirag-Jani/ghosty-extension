import type { GreetingResponse } from '../types';
import { onMessageType } from '../utils/messaging';

// Basic background service worker
console.log('Background script loaded');

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Listen for greeting messages
onMessageType('greeting', (message, _sender, sendResponse) => {
  console.log('Message received in background:', message);
  const response: GreetingResponse = { response: 'Hello from background!' };
  sendResponse(response);
});
