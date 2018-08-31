'use strict';

const api = (function(){
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/timothy/bookmarks';
    

    //requests entire array of bookmark objects from the server
    const getBookmarks = (callback) => $.getJSON(BASE_URL, callback);

    const createBookmark = (newBookmark, callback, errorHandler) => {
        $.ajax({
            url: BASE_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newBookmark),
            success: callback,
            error: errorHandler
        });
    };

    //deletes the bookmark with the specified id from the server
    const deleteBookmark = (id, callback) => {
        $.ajax({
            url: BASE_URL + `/${id}`,
            method: 'DELETE',
            success: callback
        });
    };

    return {
        getBookmarks,
        createBookmark,
        deleteBookmark
    };
    
})();