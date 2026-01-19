import type { PageInfoResponse } from '../types';
import { onMessageType } from '../utils/messaging';

// Basic content script
console.log('Content script loaded');

// Example: Change page background color (just for testing)
document.body.style.border = '2px solid red';

// Listen for getPageInfo messages
onMessageType('getPageInfo', (message, _sender, sendResponse) => {
  console.log('Message received in content script:', message);
  const response: PageInfoResponse = {
    title: document.title,
    url: window.location.href
  };
  sendResponse(response);
});
