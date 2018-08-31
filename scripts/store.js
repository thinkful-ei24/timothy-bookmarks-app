'use strict';

const store = (() => {
    const store = {
        bookmarks: [],
        formOpen: false,
        idOfExpanded: null,
        minimumRating: 0,
        errorMessage: null
    };

    const addBookmark = bookmark => store.bookmarks.push(bookmark);

    const deleteBookmark = (id) => {
        const indexOfBookmarkToBeDeleted = store.bookmarks.findIndex(bookmark =>
            bookmark.id === id    
        );
        store.bookmarks.splice(indexOfBookmarkToBeDeleted, 1);
    };

    return {
        idOfExpanded: store.idOfExpanded,
        bookmarks: store.bookmarks,
        minimumRating: store.minimumRating,
        formOpen: store.formOpen,
        errorMessage: store.errorMessage,

        addBookmark: addBookmark,
        deleteBookmark: deleteBookmark,
    };
})();