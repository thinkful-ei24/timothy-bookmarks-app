const store = (() => {
    const store = {
        bookmarks: [],
        formOpen: false,
        idOfExpanded: null,
        minimumRating: 0
    };

    const addBookmark = (id, title, url, description, rating) => {
        const newBookmark = {
            id: id,
            title: title,
            url: url,
            description: description,
            rating: rating
        };
        store.bookmarks.push(newBookmark);
    };

    const deleteBookmark = (id) => {
        const indexOfBookmarkToBeDeleted = store.bookmarks.findIndex(bookmark =>
            bookmark.id === id    
        );
        store.bookmarks.splice(indexOfBookmarkToBeDeleted, 1);
    };

    const setRating = rating => {
        store.minimumRating = rating;
    };

    const setExpandedId = id => {
        store.idOfExpanded = id;
    };

    return {
        addBookmark: addBookmark,
        deleteBookmark: deleteBookmark,
        setRating: setRating,
        setExpandedId: setExpandedId
    };
})();