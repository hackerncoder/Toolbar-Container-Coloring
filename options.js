function saveOptions(e) {
	e.preventDefault();

	browser.storage.sync.set({"urlBox": document.querySelector("#urlBox").checked});

	//browser.runtime.reload();
}

function onOptionsPageLoaded() {

	var storageItem = browser.storage.sync.get();
	storageItem.then((res) =>
	{
		document.querySelector("#urlBox").checked = res.urlBox || false;
	});
}

document.addEventListener("DOMContentLoaded", onOptionsPageLoaded);
document.querySelector('form').addEventListener('submit', saveOptions);
