'use strict';


$(() => {
    
    bookmarks.bindEventListeners();
    api.getBookmarks(items => {
        items.forEach(item => store.addBookmark(item));
        bookmarks.render();
    });
    
});