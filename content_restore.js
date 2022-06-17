(function () {
  "use strict";
  document.removeEventListener("keydown", function (evt) {
    alert(`key down ${evt.key}`);
  });
})();
