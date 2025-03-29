document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.querySelector('.accordion-header').classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            if (!isActive) {
                this.classList.add('active');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                this.classList.remove('active');
                accordionContent.style.maxHeight = null;
            }
        });
    });
    
    // FAQ search functionality
    const faqSearch = document.querySelector('.faq-search input');
    const faqSections = document.querySelectorAll('.faq-section');
    
    faqSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length > 2) {
            faqSections.forEach(section => {
                const questions = section.querySelectorAll('.accordion-header');
                let hasMatch = false;
                
                questions.forEach(question => {
                    const questionText = question.textContent.toLowerCase();
                    const contentText = question.nextElementSibling.textContent.toLowerCase();
                    
                    if (questionText.includes(searchTerm) || contentText.includes(searchTerm)) {
                        question.parentElement.style.display = '';
                        hasMatch = true;
                        
                        // Highlight matching text
                        const regex = new RegExp(searchTerm, 'gi');
                        question.innerHTML = question.textContent.replace(regex, match => `<span class="highlight">${match}</span>`);
                        question.nextElementSibling.innerHTML = question.nextElementSibling.textContent.replace(regex, match => `<span class="highlight">${match}</span>`);
                    } else {
                        question.parentElement.style.display = 'none';
                    }
                });
                
                section.style.display = hasMatch ? '' : 'none';
            });
        } else {
            // Reset if search term is too short or empty
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.style.display = '';
                item.querySelector('.accordion-header').innerHTML = item.querySelector('.accordion-header').textContent;
                item.querySelector('.accordion-content').innerHTML = item.querySelector('.accordion-content').textContent;
            });
            
            faqSections.forEach(section => {
                section.style.display = '';
            });
        }
    });
    
    // FAQ category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter sections
            faqSections.forEach(section => {
                if (category === 'all' || section.getAttribute('data-category') === category) {
                    section.style.display = '';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
    
    // Open first accordion item in each section by default
    document.querySelectorAll('.faq-section').forEach(section => {
        const firstItem = section.querySelector('.accordion-item');
        if (firstItem) {
            firstItem.querySelector('.accordion-header').classList.add('active');
            firstItem.querySelector('.accordion-content').style.maxHeight = firstItem.querySelector('.accordion-content').scrollHeight + 'px';
        }
    });
});