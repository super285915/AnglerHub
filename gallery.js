document.addEventListener('DOMContentLoaded', function() {
    // Sample cat image URLs - in a real implementation, these would be your actual image URLs
    const catImages = [
        'https://placekitten.com/600/400',
        'https://placekitten.com/601/400',
        'https://placekitten.com/602/400',
        'https://placekitten.com/603/400',
        'https://placekitten.com/604/400',
        'https://placekitten.com/605/400'
    ];
    
    // Replace placeholder divs with actual images
    const placeholders = document.querySelectorAll('.placeholder-img');
    placeholders.forEach((placeholder, index) => {
        if (index < catImages.length) {
            const img = document.createElement('img');
            img.src = catImages[index];
            img.alt = `Cat image ${index + 1}`;
            img.loading = 'lazy'; // Lazy loading for better performance
            
            // Replace the placeholder with the image
            placeholder.parentNode.replaceChild(img, placeholder);
        }
    });
    
    // Add click event to gallery items for a simple lightbox effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Create lightbox elements
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.style.position = 'fixed';
                lightbox.style.top = '0';
                lightbox.style.left = '0';
                lightbox.style.width = '100%';
                lightbox.style.height = '100%';
                lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
                lightbox.style.display = 'flex';
                lightbox.style.alignItems = 'center';
                lightbox.style.justifyContent = 'center';
                lightbox.style.zIndex = '1000';
                
                // Create the enlarged image
                const enlargedImg = document.createElement('img');
                enlargedImg.src = img.src;
                enlargedImg.style.maxHeight = '90%';
                enlargedImg.style.maxWidth = '90%';
                enlargedImg.style.objectFit = 'contain';
                
                // Add close functionality
                lightbox.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                });
                
                // Add elements to the DOM
                lightbox.appendChild(enlargedImg);
                document.body.appendChild(lightbox);
            }
        });
    });
    
    // Add filter functionality
    const addFilterButtons = () => {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
        filterContainer.style.textAlign = 'center';
        filterContainer.style.marginBottom = '30px';
        
        const filters = ['All', 'Kittens', 'Sleeping', 'Playful'];
        
        filters.forEach(filter => {
            const button = document.createElement('button');
            button.textContent = filter;
            button.style.margin = '0 10px';
            button.style.padding = '8px 16px';
            button.style.border = 'none';
            button.style.borderRadius = '4px';
            button.style.backgroundColor = filter === 'All' ? '#4CAF50' : '#f1f1f1';
            button.style.color = filter === 'All' ? 'white' : 'black';
            button.style.cursor = 'pointer';
            
            button.addEventListener('click', function() {
                // Update active button styling
                document.querySelectorAll('.filter-container button').forEach(btn => {
                    btn.style.backgroundColor = '#f1f1f1';
                    btn.style.color = 'black';
                });
                this.style.backgroundColor = '#4CAF50';
                this.style.color = 'white';
                
                // Filter logic would go here in a real implementation
                console.log(`Filter applied: ${filter}`);
            });
            
            filterContainer.appendChild(button);
        });
        
        // Insert filter container after the intro section
        const intro = document.querySelector('.intro');
        intro.parentNode.insertBefore(filterContainer, intro.nextSibling);
    };
    
    // Call the function to add filter buttons
    addFilterButtons();
});
