'use strict';

const bookmarks = (()=> {

    //template for individual bookmark elements
    const generateHTML = bookmark => {
        const expanded = bookmark.id === store.idOfExpanded;
        const bookmarkRating = bookmark.rating === null? 'Unrated' : `${bookmark.rating}/5 stars`;
        const expandedHTML = expanded? (`
            <p>${bookmark.desc}</p>
            <a href="${bookmark.url}"><span>Visit site</span></a>
            <button class="delete-button">Delete bookmark</button>   
        `) : '';
        const liClass = expanded ? 'expanded-bookmark' : 'unexpanded-bookmark';
        
        return (`
                <li class=${liClass} data-bookmark-id="${bookmark.id}">
                    <div>
                        <h2>${bookmark.title}</h2>
                        <span>${bookmarkRating}</span>
                        ${expandedHTML}
                    </div>
                </li>
            `);
    };

    const generateErrorMessage = () => {
        return (store.errorMessage !== null ? 
            `<p>${store.errorMessage}</p>`:
            ``
        );
    }

    const generateBookmarkList = bookmarks => bookmarks.map(generateHTML).join('');

    const generateRatingOption = (optionRating, storeRating) => {
        return (
        `<option value="${optionRating}"${optionRating === store.minimumRating ? " selected": ""}>
            ${
                optionRating === 0 ?
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
                    [0,1,2,3,4,5].map(rating => 
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
                    <label for="bookmark-desc">Description</label><br>
                    <textarea type="text" name="desc" id="bookmark-desc"/>
                <div class="rating-radio">
                    <input type="radio" name="rating" id="5-stars" value="5"/><label for="5-stars">5 stars</label>
                    <input type="radio" name="rating" id="4-stars" value="4"/><label for="4-stars">4 stars</label>
                    <input type="radio" name="rating" id="3-stars" value="3"/><label for="3-stars">3 stars</label>
                    <input type="radio" name="rating" id="1-stars" value="2"/><label for="2-stars">2 stars</label>
                    <input type="radio" name="rating" id="1-star" value="1"/><label for="1-star">1 star</label>
                </div>
                <div class="submit-and-cancel-buttons">
                    <button type="submit" class="submit-bookmark-button">Submit</button>
                    <button class="cancel-button">Cancel</button>
                </div>
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
        $('.form-container').html(generateAddBookmarkForm());
        $('.error-message').html(generateErrorMessage());
    };

    const handleSetRating = () => {
        $('.form-container').on('change', '.select-rating', event => {
            store.minimumRating = parseInt($(event.target).val());
            render();
        });
    };

    //deletes a bookmark when the delete button is clicked
    const handleDeleteBookmark = () => {
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

    //expands a bookmark when it's clicked
    const handleExpandBookmark = () => {
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
        $('.form-container').on('submit','.add-bookmark-form', event => {
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
        $('.form-container').on('click', '.add-bookmark-button', event => {
            store.formOpen = true;
            store.idOfExpanded = null;
            render();
        });    
    };

    const handleFormCancel = () => {
        $('.form-container').on('click', '.cancel-button', event => {
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
