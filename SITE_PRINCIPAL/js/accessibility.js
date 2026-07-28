/* ==========================================================================
   NEUMORPHIC PORTFOLIO - FULVIO TANURE
   MODULAR JS: ACCESSIBILITY ENGINE (HIGH CONTRAST)
   ========================================================================== */

(() => {
    // Global settings object - keeping structure for compatibility
    window.accessibilitySettings = {
        pauseAnimations: false,
        highContrast: false,
        largeText: false
    };

    document.addEventListener('DOMContentLoaded', () => {
        initAccessibility();
    });

    function initAccessibility() {
        const contrastToggleBtn = document.getElementById('contrast-toggle-btn');

        if (!contrastToggleBtn) return;

        // Load setting from localStorage
        const savedContrast = localStorage.getItem('acc-high-contrast') === 'true';

        // Apply initial setting
        setHighContrast(savedContrast);

        // Click event listener
        contrastToggleBtn.addEventListener('click', () => {
            const newState = !window.accessibilitySettings.highContrast;
            setHighContrast(newState);
            localStorage.setItem('acc-high-contrast', newState);
        });

        function setHighContrast(contrast) {
            window.accessibilitySettings.highContrast = contrast;
            contrastToggleBtn.setAttribute('aria-pressed', contrast ? 'true' : 'false');
            contrastToggleBtn.classList.toggle('inset', contrast);
            document.body.classList.toggle('accessibility-high-contrast', contrast);
        }
    }
})();
