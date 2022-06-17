// get element of activate function buttom
let activateFunction = document.getElementById("activate");

// get setting from chrome storage
// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
activateFunction.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: activateEncircle,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function activateEncircle() {
  //   chrome.storage.sync.get("color", ({ color }) => {
  //     document.body.style.backgroundColor = color;
  //   });
  alert("activate batch download!");
}
