(function () {
  "use strict";

  function action(evt) {
    alert(`key down ${evt.key}`);
    if (evt.key == "q") {
      document.removeEventListener("keydown", action);
    }
  }
  alert("1");
  chrome.storage.local.get("gao", function (result) {
    alert("2");
    if (result["gao"]) {
      alert("on");
      document.addEventListener("keydown", action);
    } else {
      alert("off");
      document.removeEventListener("keydown", action);
    }
  });
  alert("3");
})();
