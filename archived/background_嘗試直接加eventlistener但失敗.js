chrome.runtime.onInstalled.addListener(() => {
  console.log("on installed!");
});

function action(evt) {
  alert(`key down ${evt.key}`);
  if (evt.key == "q") {
    document.removeEventListener("keydown", action);
  }
}
function attachAction() {
  console.log("attach");
  alert("attach");
  alert(document.title); // 可以work
  document.addEventListener("keydown", action); // 不work
}

function detachAction() {
  document.removeEventListener("keydown", action);
}
// enable function
function closureAction() {
  var actionEnabled = false;

  function switchAction() {
    if (actionEnabled === true) {
      console.log(`disable`);

      // save data value
      // chrome.storage.sync.set({ grabatonce_state: false });
      //   chrome.storage.local.set({ gao: false });

      chrome.action.setIcon({
        path: {
          16: "/images/grab_wb_16.png",
          32: "/images/grab_wb_32.png",
          64: "/images/grab_wb_64.png",
          128: "/images/grab_wb_128.png",
          256: "/images/grab_wb_256.png",
          512: "/images/grab_wb_512.png",
        },
      });
      actionEnabled = false;
    } else {
      console.log(`enable`);

      // chrome.storage.sync.set({ grabatonce_state: true });
      chrome.storage.local.set({ gao: true });
      chrome.storage.local.get("gao", function (result) {
        console.log(result["gao"]);
      });
      chrome.action.setIcon({
        path: {
          16: "/images/grab_16.png",
          32: "/images/grab_32.png",
          64: "/images/grab_64.png",
          128: "/images/grab_128.png",
          256: "/images/grab_256.png",
          512: "/images/grab_512.png",
        },
      });
      actionEnabled = true;
    }
  }

  function activateGrabAtOnce(tab) {
    switchAction();
    if (actionEnabled) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        //   files: ["content.js"],
        func: attachAction,
        // func: getTitle,
      });
    } else {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        //   files: ["content.js"],
        func: detachActionf,
        // func: getTitle,
      });
    }
  }
  return activateGrabAtOnce;
}

chrome.action.onClicked.addListener(closureAction());

// set badge
// chrome.action.setBadgeText({ text: "on" });
// chrome.action.setBadgeBackgroundColor({
//   color: "#00ff00",
// });
