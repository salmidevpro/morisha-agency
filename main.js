/**
 * ==========================================================================
 * MORISHA AGENCY - ENTERPRISE ECOMMERCE B2B JAVASCRIPT ENGINE
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Global App Initializer
    initGlobalFeatures();
    
    // Page-Specific Context Detection
    if (document.querySelector('.shop-layout')) {
        initShopCatalogEngine();
    }
    if (document.querySelector('.product-container')) {
        initProductConfiguratorEngine();
    }
    if (document.querySelector('.form-card') && document.querySelector('.contact-layout')) {
        initBulkOrderFormEngine();
    }
    if (document.getElementById('branding-form-section')) {
        initBrandingIntakeEngine();
    }
});

/* ==========================================================================
   GLOBAL UTILITY SYSTEM UTILITIES
   ========================================================================== */
function initGlobalFeatures() {
    // Dynamic WhatsApp Widget Parameter Updates Based on Page Actions
    const globalWAWidget = document.querySelector('.whatsapp-float');
    if (globalWAWidget) {
        globalWAWidget.addEventListener('click', () => {
            const currentRoute = window.location.pathname.split("/").pop() || 'index.html';
            let contextMessage = `Hi Morisha Agency, I am browsing your website and would like to speak to a corporate outfitting agent.`;
            
            if (currentRoute.includes('shop')) contextMessage = `Hi Morisha Agency, I'm reviewing your commercial inventory catalog and want to check stock availability.`;
            if (currentRoute.includes('branding')) contextMessage = `Hi Morisha Agency, I'm reviewing your custom corporate identity solutions and want to discuss logo integration options.`;
            
            globalWAWidget.href = `https://wa.me/15550199000?text=${encodeURIComponent(contextMessage)}`;
        });
    }
}

/* ==========================================================================
   SHOP CATALOG INTERACTIVE FILTER & SEARCH SYSTEM
   ========================================================================== */
function initShopCatalogEngine() {
    const searchInput = document.querySelector('.search-input');
    const categoryCheckboxes = document.querySelectorAll('.sidebar input[type="checkbox"]');
    const productCards = document.querySelectorAll('.shop-content .card');
    const sortSelect = document.querySelector('.sort-select');
    const displayCounter = document.querySelector('.catalog-controls div');

    // Live Execution Filter Routing
    function executeCatalogFilter() {
        const query = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        productCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const meta = card.querySelector('.card-meta').textContent.toLowerCase();
            const matchesSearch = title.includes(query) || meta.includes(query);
            
            // In a production environment with data tags, we would filter categories here:
            // const matchesCategory = activeCategories.includes(card.dataset.category);

            if (matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (displayCounter) {
            displayCounter.textContent = `Showing ${visibleCount} of ${productCards.length} industrial assets matching criteria`;
        }
    }

    // Live Search Execution
    if (searchInput) {
        searchInput.addEventListener('keyup', executeCatalogFilter);
    }

    // Filter Controls Handlers
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', executeCatalogFilter);
    });

    // Dynamic Client Sorting Architecture Simulation
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const criterion = e.target.value;
            const container = document.querySelector('.shop-content .grid-3');
            const cardsArray = Array.from(productCards);

            cardsArray.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.card-price').textContent.replace(/[^0-9.]/g, ''));
                const priceB = parseFloat(b.querySelector('.card-price').textContent.replace(/[^0-9.]/g, ''));

                if (criterion === 'price-low') return priceA - priceB;
                if (criterion === 'price-high') return priceB - priceA;
                return 0; // Default/Popularity structural sorting baseline
            });

            cardsArray.forEach(card => container.appendChild(card));
        });
    }
}

/* ==========================================================================
   PRODUCT PROFILE VARIANT CONFIGURATOR & PRICING ENGINE
   ========================================================================== */
function initProductConfiguratorEngine() {
    const mainImage = document.querySelector('.gallery-main img');
    const thumbnails = document.querySelectorAll('.thumb');
    const colorChips = document.querySelectorAll('.color-chips .chip');
    const sizeChips = document.querySelectorAll('.size-chips .chip');
    const brandingSelect = document.querySelector('.p-details select');
    const quantityInput = document.querySelector('.p-details input[type="number"]');
    const dynamicPriceDisplay = document.querySelector('.p-details .price');
    const quoteBasketBtn = document.querySelector('.btn-accent');
    const directWAOrderBtn = document.querySelector('.btn-whatsapp');

    // Structural Configuration Target Variables
    let selectedColor = "Safety Orange";
    let selectedSize = "M";
    const productTitle = document.querySelector('.p-details h1').textContent;

    // Gallery Controller Interface
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            mainImage.src = this.querySelector('img').src;
        });
    });

    // Color Selection Router
    colorChips.forEach(chip => {
        chip.addEventListener('click', function() {
            colorChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.textContent;
            calculatePricingMatrix();
        });
    });

    // Size Selection Router
    sizeChips.forEach(chip => {
        chip.addEventListener('click', function() {
            sizeChips.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.textContent;
        });
    });

    // Dynamic Pricing Logic Matrix Calculator
    function calculatePricingMatrix() {
        let baseUnitCost = 55.00; 
        const totalQuantity = parseInt(quantityInput.value) || 10;

        // B2B Tier Scaling Pricing Adjustments Rules
        if (totalQuantity >= 51 && totalQuantity <= 200) {
            baseUnitCost = 49.50; // 10% wholesale cost tier rule
        } else if (totalQuantity > 200) {
            baseUnitCost = 44.00; // Enterprise scale allocation framework rate
        }

        // Configuration Surcharge Processing Interceptor
        const selectedBrandingIndex = brandingSelect.selectedIndex;
        if (selectedBrandingIndex === 1) baseUnitCost += 3.50; // High Definition Embroidery surcharge mapping rules
        if (selectedBrandingIndex === 2) baseUnitCost += 2.50; // Screen Printing process sheet calculation addition

        const consolidatedTotalCost = baseUnitCost * totalQuantity;

        // Interface String Render Update Formats
        if (totalQuantity > 200) {
            dynamicPriceDisplay.innerHTML = `Custom RFQ <span style="font-size: 1rem; color: var(--text-muted); font-weight: normal;">/ Enterprise Rate calculated</span>`;
        } else {
            dynamicPriceDisplay.innerHTML = `$${baseUnitCost.toFixed(2)} <span style="font-size: 1rem; color: var(--text-muted); font-weight: normal;">/ unit ($${consolidatedTotalCost.toFixed(2)} total)</span>`;
        }
    }

    // Attach Price Matrix Realtime Hooks listeners
    if (quantityInput && brandingSelect) {
        quantityInput.addEventListener('input', calculatePricingMatrix);
        brandingSelect.addEventListener('change', calculatePricingMatrix);
    }

    // WhatsApp Automated Message Formulation Compiler
    if (directWAOrderBtn) {
        directWAOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const orderQty = quantityInput.value;
            const chosenBrandingOption = brandingSelect.options[brandingSelect.selectedIndex].text;

            const structuredManifestMessage = 
                `*NEW PROCUREMENT INQUIRY - MORISHA AGENCY*\n` +
                `-----------------------------------------\n` +
                `• *Asset Model:* ${productTitle}\n` +
                `• *Required Volume:* ${orderQty} units\n` +
                `• *Variant Colorway:* ${selectedColor}\n` +
                `• *Variant Dimensions:* Size ${selectedSize}\n` +
                `• *Branding Modality:* ${chosenBrandingOption}\n` +
                `-----------------------------------------\n` +
                `Please confirm active asset inventory availability and send over corresponding formal invoice sheets.`;

            window.open(`https://wa.me/15550199000?text=${encodeURIComponent(structuredManifestMessage)}`, '_blank');
        });
    }

    // LocalStorage Pipeline Mock implementation for Quote Basket
    if (quoteBasketBtn) {
        quoteBasketBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const orderManifestItem = {
                title: productTitle,
                quantity: quantityInput.value,
                color: selectedColor,
                size: selectedSize,
                branding: brandingSelect.value
            };
            
            localStorage.setItem('morisha_latest_rfq', JSON.stringify(orderManifestItem));
            alert(`SUCCESS: ${orderManifestItem.quantity}x Units added to your Corporate RFQ Package. Proceeding to final documentation workspace inputs.`);
            window.location.href = "contact.html";
        });
    }
}

/* ==========================================================================
   B2B PROCUREMENT BULK ORDER ENGINE CONVERSION ROUTING
   ========================================================================== */
function initBulkOrderFormEngine() {
    // Hydrate form fields dynamically if pre-configured from product page choice structures
    const storedRfqDataString = localStorage.getItem('morisha_latest_rfq');
    if (storedRfqDataString) {
        const parsedRfqData = JSON.parse(storedRfqDataString);
        const specificationsInputArea = document.querySelector('.form-card textarea');
        
        if (specificationsInputArea) {
            specificationsInputArea.value = `AUTOMATED MANIFEST LINK PROFILE:\n- Requesting bulk allocation for item: "${parsedRfqData.title}"\n- Individual Configured Parameter Options: Color: ${parsedRfqData.color}, Dimensions Array: Size ${parsedRfqData.size}.\n- Modality Selected: ${parsedRfqData.branding}\n- Est Target Count: ${parsedRfqData.quantity} Units.\n\nPlease process matching scale discount models.`;
            // Clear storage parameters once consumed securely
            localStorage.removeItem('morisha_latest_rfq');
        }
    }
}

/* ==========================================================================
   BRANDING INTAKE PIPELINE INTERACTION HANDLERS
   ========================================================================== */
function initBrandingIntakeEngine() {
    const brandingIntakeForm = document.querySelector('#branding-form-section form');
    if (brandingIntakeForm) {
        brandingIntakeForm.removeAttribute('onsubmit'); // override static stub configuration parameters
        brandingIntakeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const clientCompany = brandingIntakeForm.querySelector('input[placeholder*="Vanguard"]').value;
            const targetTechnology = brandingIntakeForm.querySelector('select').value;
            const allocationCount = brandingIntakeForm.querySelector('input[placeholder*="75"]').value;
            
            alert(`STRATEGIC FILE INGESTION SUCCESSFUL:\nYour corporate asset profile for "${clientCompany}" has been uploaded to our production floors. Digital identity mockups for your ${allocationCount} items using "${targetTechnology}" are processing for generation.`);
            brandingIntakeForm.reset();
        });
    }
}