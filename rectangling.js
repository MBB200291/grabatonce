// window.onload = function () {
(function () {
  // var stateBar = document.getElementById("bottom");
  alert("Grab At Once!");

  document.onmousedown = function (evtD) {
    // stateBar = document.createElement("div");
    // stateBar.id = "bottom";
    // stateBar.style.cssText =
    //   " position: absolute;  bottom: 0px;  width: 100%;  height: 40px;  border: 1px solid #000;  background: #000;  color: #fff;";
    var startx = evtD.clientX;
    var starty = evtD.clientY;
    var div = document.createElement("div");
    div.className = "tempDiv";
    div.style.left = evtD.clientX + "px";
    div.style.top = evtD.clientY + "px";
    div.style.cssText =
      "  border: 1px dashed blue;  background: #80ff00;  position: absolute;  width: 0; height: 0;  opacity: 0.1;";
    document.body.appendChild(div);
    document.onmousemove = function (evtM) {
      div.style.left = Math.min(evtM.clientX, startx) + "px";
      div.style.top = Math.min(evtM.clientY, starty) + "px";
      div.style.width = Math.abs(startx - evtM.clientX) + "px";
      div.style.height = Math.abs(starty - evtM.clientY) + "px";
      // stateBar.innerHTML =
      //   "MouseX: " + ev.clientX + "<br/>MouseY: " + ev.clientY;
      // console.log("MouseX: " + evtM.clientX);
      // console.log("MouseY: " + evtM.clientY);
      document.onmouseup = function (evtU) {
        endx = evtU.clientX;
        endy = evtU.clientY;
        div.parentNode.removeChild(div);
        document.onmousemove = null;
        document.onmouseup = null;
        var mouserectangle = {
          left: Math.min(startx, endx),
          top: Math.max(starty, endy),
          right: Math.max(startx, endx),
          bottom: Math.min(starty, endy),
        };
        console.log(mouserectangle);
        downloadBatch(filter(getDownloadableElements(), mouserectangle));
      };
    };
  };

  // function to get element locaiton (client coodinate)
  // source: https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
      right: rect.right + +window.scrollX,
      bottom: rect.bottom + window.scrollY,
    };
  }

  // get all downloadable elements in page and get relative position
  function getDownloadableElements() {
    var downloadableElements = document.querySelectorAll(
      'a[href$=".gif"], a[href$=".pdf"], a[href$=".ppt"], a[href$=".jpg"]'
    );
    console.log("douwnloadable elements >>>");
    console.log(downloadableElements);
    return downloadableElements;
  }

  // checkt postion in rectangle
  function checkInside(offset1, offset2) {
    if (offset1.left > offset2.left && offset1.left < offset2.right) {
      if (
        (offset1.top > offset2.bottom && offset1.top < offset2.top) ||
        (offset1.bottom > offset2.bottom && offset1.bottom < offset2.top)
      ) {
        return true;
      }
    } else if (offset1.right > offset2.left && offset1.right < offset2.right) {
      if (
        (offset1.top > offset2.bottom && offset1.top < offset2.top) ||
        (offset1.bottom > offset2.bottom && offset1.bottom < offset2.top)
      ) {
        return true;
      }
    } else {
      return false;
    }
  }
  function filter(downloadableElements, mouserectangle) {
    var selectedElements = [];
    for (e of downloadableElements) {
      var position = getOffset(e);
      var inside = checkInside(position, mouserectangle);
      if (inside) {
        selectedElements.push(e);
        console.log(position);
      }
    }
    return selectedElements;
  }

  // triger batch doownload
  function downloadBatch(selectedElements) {
    for (e of selectedElements) {
      console.log("download..." + e);
      // window.open(e.href);
      downloadURI(e.href);
    }
  }

  function downloadURI(uri) {
    let link = document.createElement("a");
    link.download = uri.split("/").pop();
    link.href = uri;
    link.click();
  }
})();
