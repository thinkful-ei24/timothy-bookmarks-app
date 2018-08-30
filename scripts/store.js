const store = (() => {
    const store = {
        bookmarks: [],
        formOpen: false,
        idOfExpanded: null,
        minimumRating: 0
    };

    const addBookmark = ({id, title, url, desc, rating}) => {
        const newBookmark = {
            id: id,
            title: title,
            url: url,
            desc: desc,
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
        idOfExpanded: store.idOfExpanded,
        bookmarks: store.bookmarks,
        minimumRating: store.minimumRating,
        formOpen: store.formOpen,

        addBookmark: addBookmark,
        deleteBookmark: deleteBookmark,
        setRating: setRating,
        setExpandedId: setExpandedId
    };
})();