'use strict';

//this binds the listeners on the DOM and requests the list of bookmarks from the server API when the page initially loads
$(() => {
    bookmarks.bindEventListeners();
    api.getBookmarks(items => {
        items.forEach(item => store.addBookmark(item));
        bookmarks.render();
    });
});