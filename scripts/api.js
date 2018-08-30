const api = (function(){
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/timothy/bookmarks';
    const getBookmarks = (callback) => {
        $.getJSON(BASE_URL, callback);
    };
    const createBookmark = ({title, url, desc, rating}, callback) => {
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
            error: error => console.log(error)
        });
    };

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