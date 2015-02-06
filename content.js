var usernameNode = document.querySelector('.vcard-username');
if (usernameNode) {
    var targetUser = usernameNode.innerText;
    var currentUserNode = document.querySelector('.header-nav-link.name');
    if (currentUserNode) {
        var currentUser = currentUserNode.innerText;
        chrome.runtime.sendMessage({data: {currentUser: currentUser, targetUser: targetUser}}, function(response) {});
    }
}

var addMarkup = function() {
    var element = document.createElement('span');
    element.innerText = 'Follows you';
    element.classList.add('isFollowing');
    usernameNode.parentNode.insertBefore(element, usernameNode.nextSibling);
};

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'add_markup') {
        addMarkup();
    }
});