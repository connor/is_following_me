var decoratePage = function(tab, data) {
    var currentUser = data.currentUser;
    var targetUser = data.targetUser;

    var url = 'https://api.github.com/users/' + targetUser + '/following/' + currentUser;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onreadystatechange = function(){
        if (this.readyState === 4) {
            if (xhr.status === 204) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id, {action: "add_markup"}, function(response) {});  
                });
            }
        }
    };
    xhr.send();
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        decoratePage(sender.tab, request.data)
    }
);
