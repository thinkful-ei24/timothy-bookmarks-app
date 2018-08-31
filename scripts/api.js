const api = (function(){
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/timothy/bookmarks';
    const getBookmarks = (callback) => {
        $.getJSON(BASE_URL, callback);
    };

    const createBookmark = ({title, url, desc, rating}, callback, errorHandler) => {
        const newBookmark = {
            title: title,
            url: url,
            desc: desc,
            rating: rating
        };

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