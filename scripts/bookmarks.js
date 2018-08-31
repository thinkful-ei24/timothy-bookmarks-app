const bookmarks = (()=> {

    const generateHTML = bookmark => {
        const expanded = bookmark.id === store.idOfExpanded;
        if(expanded) {
            return (`
                <li class="expanded-bookmark" data-bookmark-id="${bookmark.id}">
                    <div>
                        <h2>${bookmark.title}</h2>
                        <span>${bookmark.rating}/5 </span>
                        <p>${bookmark.desc}</p>
                        <a href="${bookmark.url}"><span>Visit site</span></a>
                        <button class="delete-button">Delete bookmark</button>
                    </div>
                </li>
            `);
        } else {
            return (`
                <li class="unexpanded-bookmark" data-bookmark-id="${bookmark.id}">
                    <div>
                        <h2>${bookmark.title}</h2>
                        <span>${bookmark.rating}/5</span>
                    </div>
                </li>
            `);
        }
    };

    const generateErrorMessage = () => {
        return (store.errorMessage !== null ? 
            `<p>${store.errorMessage}</p>`:
            ``
        );
    }

    const generateBookmarkList = bookmarks => { 
        return bookmarks.map(generateHTML).join('');
    };

    const generateRatingOption = (optionRating, storeRating) => {
        return (
        `<option value="${optionRating}"${optionRating === store.minimumRating ? " selected": ""}>
            ${
                optionRating === 1 ?
                    'Show all bookmarks' :
                '☆'.repeat(optionRating)
            }
        </option>
        `);
    };

    const generateAddBookmarkForm = () => {
        if(!store.formOpen) return (
            `
            <button class="add-bookmark-button">Add new bookmark</button>
            <select class="select-rating">
                ${  
                    [1,2,3,4,5].map(rating => 
                        generateRatingOption(rating)
                    )
                    .join('')
                }   
            </select>
            `   
        );

        return (
            `
            <form class="add-bookmark-form">
                <label for="bookmark-title">Title</label>
                <input type="text" name="title" id="bookmark-title">
                <label for="bookmark-url">URL</label>
                <input type="text" name="url" id="bookmark-url">
                <label for="bookmark-desc">Description</label>
                <input type="text" name="desc" id="bookmark-desc">
                <label for="bookmark-rating">Rating</label>
                <input type="text" name="rating" id="bookmark-rating">
                <button type="submit" class="submit-bookmark-button">Submit</button>
                <button class="cancel-button">Cancel</button>
            </form>
            `
        );
    };

    const render = () => {
        const filteredBookmarks = store.bookmarks.filter(bookmark => 
            bookmark.rating >= store.minimumRating
        );
        const list = generateBookmarkList(filteredBookmarks);
        $('.bookmarks-list').html(list);
        $('.space').html(generateAddBookmarkForm);
        $('.error-message').html(generateErrorMessage());
    };

    const handleSetRating = () => {
        $('.space').on('change', '.select-rating', event => {
            store.minimumRating = parseInt($(event.target).val());
            render();
        });
    };

    
    const handleDeleteBookmark = () => {

        //deletes a bookmark when the delete button is clicked
        $('ul').on('click', '.delete-button', event => {
            const targetButton = $(event.target);
            const bookmarkId = $(targetButton).closest('li').attr('data-bookmark-id');
            api.deleteBookmark(bookmarkId, response => {
                store.deleteBookmark(bookmarkId);
                render();
            },
            displayError
            );
        });

    };


    const handleExpandBookmark = () => {

        //expands a bookmark when it's clicked
        $('ul').on('click', '.unexpanded-bookmark > div', event => {
            const clickedBookmark = $(event.currentTarget);
            const bookmarkId = clickedBookmark.closest('li').attr('data-bookmark-id');
            store.idOfExpanded = bookmarkId;
            store.formOpen = false;
            render();
        });
    };

    //creates a bookmark object from the form data
    const createBookmarkFromForm = form => {
        const formData = new FormData(form);
        const bookmarkObject = {};
        formData.forEach((val, name) => bookmarkObject[name] = val);
        return bookmarkObject;
    };


    //sets the error message in the store when the API returns an error 
    const displayError = error => {
            store.errorMessage = error.responseJSON.message;
            bookmarks.render();
            store.errorMessage = null;
    };

    //opens a form to create a new bookmark 
    const handleAddBookmark = () => {
        $(".space").on("submit",'.add-bookmark-form', event => {
            event.preventDefault();
            const formElement = $(event.target)[0];
            const newBookmark = createBookmarkFromForm(formElement);
            api.createBookmark(newBookmark, response => {
                store.addBookmark(response);
                store.formOpen = false;
                render();
            },
                displayError
            );
        });
    };

    const handleOpenForm = () => {  
        $('.space').on('click', '.add-bookmark-button', event => {
            store.formOpen = true;
            store.idOfExpanded = null;
            render();
        });    
    };

    const handleFormCancel = () => {
        $('.space').on('click', '.cancel-button', event => {
            store.formOpen = false;
            render();
        });
    };

    const bindEventListeners = () => {
        handleOpenForm();
        handleAddBookmark();
        handleExpandBookmark();
        handleDeleteBookmark();
        handleSetRating();
        handleFormCancel();
    };

    return {
        render: render,
        bindEventListeners
    };
})();
