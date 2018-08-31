'use strict';

const api = (function(){
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/timothy/bookmarks';
    
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

    const deleteBookmark = (id, callback, errorHandler) => {
        $.ajax({
            url: BASE_URL + `/${id}`,
            method: 'DELETE',
            success: callback,
            error: errorHandler
        });
    };

    return {
        getBookmarks,
        createBookmark,
        deleteBookmark
    };
    
})();