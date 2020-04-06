function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    urlBox: document.querySelector("#urlBox").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#urlBox").value = result.urlBox || "1";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("urlBox");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById('optionsArea').addEventListener('change',saveOptions);
