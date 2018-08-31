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
        const indexDeleted = store.bookmarks.findIndex(bookmark => bookmark.id === id);
        store.bookmarks.splice(indexDeleted, 1);
    };

    const setIdExpanded = id => store.idOfExpanded = id;
    const setMinimumRating = rating => store.minimumRating = rating;
    const setFormOpen = isOpen => store.formOpen = isOpen;
    const setErrorMessage = message => store.errorMessage = message;
    const getBookmarks = () => store.bookmarks;

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