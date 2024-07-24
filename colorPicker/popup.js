document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("changeColorBtn").addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      });
    });
  });
  
  
