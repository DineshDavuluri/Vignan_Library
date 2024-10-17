document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm === '') {
            alert('Please enter a search term.');
            return;
        }

        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displaySearchResults(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch search results. Please try again later.');
            });
    });

    function displaySearchResults(data) {
        searchResults.innerHTML = ''; 

        if (data.items.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
            return;
        }

        const results = data.items.map(item => {
            const bookInfo = item.volumeInfo;
            const title = bookInfo.title;
            const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author';
            const description = bookInfo.description ? bookInfo.description : 'No description available';
            
            return `
                <div class="book">
                    <h3>${title}</h3>
                    <p><strong>Authors:</strong> ${authors}</p>
                    <p><strong>Description:</strong> ${description}</p>
                </div>
            `;
        }).join('');

        searchResults.innerHTML = results;
    }
});
