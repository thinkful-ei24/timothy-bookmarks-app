const bookmarks = (()=> {

    const generateHTML = bookmark => {
        const expanded = bookmark.id === store.idOfExpanded;
        if(expanded) {
            return (`
                <li class="expanded-bookmark" data-bookmark-id="${bookmark.id}">
                    <div>
                        <h2>${bookmark.title}</h2>
                        <p>${bookmark.rating}</p>
                        <p>${bookmark.desc}</p>
                        <a href="${bookmark.url}"><span>Visit site</span></a>
                        <button>Delete bookmark</button>
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

    const generateBookmarkList = bookmarks => { 
        return bookmarks.map(generateHTML).join('');
    };

    const generateAddBookmarkForm = () => {
        if(!store.formOpen) return (
            `
            <button class="add-bookmark-button">Add new bookmark</button>
            <select>
                <option value="1-star">☆☆☆☆☆</option>
                <option value="1-star">☆☆☆☆</option>
                <option value="1-star">☆☆☆</option>
                <option value="1-star">☆☆</option>
                <option value="1-star">☆</option>
                <option value="1-star">Show all bookmarks</option>
            </select>
            `    
        );
        const formHTML = (
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
                <button>Cancel</button>
            </form>
            `
        );
        return formHTML;
    };

    const render = () => {
        const filteredBookmarks = store.bookmarks.filter(bookmark => 
            bookmark.rating >= store.minimumRating
        );
        const list = generateBookmarkList(filteredBookmarks);
        console.log(list);
        $('.bookmarks-list').html(list);
        $('.space').html(generateAddBookmarkForm);
    };



    const handleExpandBookmark = () => {
        $('ul').on('click', '.unexpanded-bookmark > div', event => {
            const targetBookmarkElement = $(event.currentTarget);
            console.log(targetBookmarkElement);
            console.log(targetBookmarkElement.closest('li'));
            const bookmarkId = targetBookmarkElement.closest('li').attr('data-bookmark-id');
            console.log(bookmarkId);
            store.idOfExpanded = bookmarkId;
            render();
        });
    };

    const createObjectFromForm = form => {
        const formData = new FormData(form);
        const bookmarkObject = {};
        formData.forEach((val, name) => bookmarkObject[name] = val);
        return bookmarkObject;
    };

    const handleAddBookmark = () => {
        $(".space").on("submit",'.add-bookmark-form', event => {
            event.preventDefault();
            const formElement = $(event.target)[0];
            const newBookmark = createObjectFromForm(formElement);
            console.log(newBookmark);
            api.createBookmark(newBookmark, response => {
                store.addBookmark(response);
                store.formOpen = false;
                render();
            });
        });
    };

    const handleOpenForm = () => {  
        $('.space').on('click', '.add-bookmark-button', event => {
            store.formOpen = true;
            console.log('running');
            store.idOfExpanded = null;
            render();
        });    
    };

    const bindEventListeners = () => {
        handleOpenForm();
        handleAddBookmark();
        handleExpandBookmark();
    };

    return {
        render: render,
        bindEventListeners
    };
})();
