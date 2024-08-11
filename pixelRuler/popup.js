document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("captureBtn").addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      });
    });
  });
  
  
