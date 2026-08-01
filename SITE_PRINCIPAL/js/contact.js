/* ==========================================================================
   NEUMORPHIC PORTFOLIO - FULVIO TANURE
   MODULAR JS: CONTACT SECTION (FORM & SUCCESS MODAL)
   ========================================================================== */

// CONFIGURAÇÃO DO ENVIO DE E-MAILS DE VERDADE:
// 1. Acesse https://web3forms.com/ e insira seu e-mail para receber uma chave (Access Key) gratuita.
// 2. Substitua o texto abaixo pela chave recebida:
const WEB3FORMS_ACCESS_KEY = "bf2e767b-e809-4b59-968e-9ba6d342f3f2";

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        initContactFormHandler();
        initCustomSelect();
    });

    function initCustomSelect() {
        const wrapper = document.getElementById('custom-service-select');
        if (!wrapper) return;

        const trigger = wrapper.querySelector('.custom-select-trigger');
        const options = wrapper.querySelectorAll('.custom-option');
        const textSpan = wrapper.querySelector('.custom-select-text');
        const hiddenInput = document.getElementById('form-service');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.classList.toggle('open');
        });

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                textSpan.textContent = opt.textContent;
                hiddenInput.value = opt.getAttribute('data-value');
                wrapper.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                wrapper.classList.remove('open');
            }
        });
    }

    /* ==========================================================================
       CONTACT FORM HANDLER WITH NEUMORPHIC ALERT MODAL
       ========================================================================== */
    function initContactFormHandler() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const origText = submitBtn.querySelector('.btn-text').textContent;
            
            const sendingText = (window.i18n && typeof window.i18n.t === 'function') ? window.i18n.t('contact.sending') : "Enviando...";

            // Disable button and show sending feedback
            submitBtn.disabled = true;
            submitBtn.classList.add('inset');
            submitBtn.querySelector('.btn-text').textContent = sendingText;

            const nameVal = document.getElementById('form-name').value;
            const emailVal = document.getElementById('form-email').value;
            const serviceVal = document.getElementById('form-service').value;
            const messageVal = document.getElementById('form-message').value;

            // Se a chave não foi configurada, roda no Modo de Simulação original
            if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
                setTimeout(() => {
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('inset');
                    submitBtn.querySelector('.btn-text').textContent = origText;

                    // Show custom Neumorphic success alert modal in simulation mode
                    showSuccessModal(nameVal, true, submitBtn);

                    // Reset form
                    contactForm.reset();
                }, 1500);
                return;
            }

            // Envio real de dados para o e-mail via API do Web3Forms
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: WEB3FORMS_ACCESS_KEY,
                        name: nameVal,
                        email: emailVal,
                        subject: `Novo Contato do Portfólio: ${nameVal}`,
                        from_name: "Portfólio Fulvio Tanure",
                        service: serviceVal,
                        message: messageVal
                    })
                });

                const result = await response.json();

                // Reset button
                submitBtn.disabled = false;
                submitBtn.classList.remove('inset');
                submitBtn.querySelector('.btn-text').textContent = origText;

                if (response.status === 200 && result.success) {
                    // Show custom Neumorphic success alert modal in real mode
                    showSuccessModal(nameVal, false, submitBtn);

                    // Reset form
                    contactForm.reset();
                } else {
                    console.error("Erro Web3Forms:", result);
                    const errorText = (window.i18n && typeof window.i18n.t === 'function') 
                        ? window.i18n.t('contact.error_generic') || "Ops! Ocorreu um erro ao enviar sua mensagem: " 
                        : "Ops! Ocorreu um erro ao enviar sua mensagem: ";
                    alert(errorText + (result.message || ""));
                }
            } catch (error) {
                console.error("Erro de conexão:", error);
                submitBtn.disabled = false;
                submitBtn.classList.remove('inset');
                submitBtn.querySelector('.btn-text').textContent = origText;
                const connErrorText = (window.i18n && typeof window.i18n.t === 'function')
                    ? window.i18n.t('contact.error_connection') || "Falha na conexão de rede ao enviar a mensagem. Por favor, verifique sua internet."
                    : "Falha na conexão de rede ao enviar a mensagem. Por favor, verifique sua internet.";
                alert(connErrorText);
            }
        });

        function showSuccessModal(clientName, isSimulation = false, returnEl = null) {
            // Create modal overlay
            const overlay = document.createElement('div');
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-modal', 'true');
            overlay.setAttribute('aria-labelledby', 'success-modal-title');
            
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(26, 30, 36, 0.8)';
            overlay.style.backdropFilter = 'blur(10px)';
            overlay.style.webkitBackdropFilter = 'blur(10px)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = '1000';
            overlay.style.padding = '2rem';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';

            // Custom Modal Content
            const modal = document.createElement('div');
            modal.className = 'btn-neu';
            modal.style.padding = '3rem 2rem';
            modal.style.maxWidth = '400px';
            modal.style.textAlign = 'center';
            modal.style.display = 'flex';
            modal.style.flexDirection = 'column';
            modal.style.alignItems = 'center';
            modal.style.gap = '1.5rem';
            modal.style.transform = 'scale(0.8)';
            modal.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            // Fetch translated strings
            const tThanks = (window.i18n && typeof window.i18n.t === 'function') 
                ? window.i18n.t('contact.thanks', { name: clientName.split(' ')[0] }) 
                : `Muito Obrigado, ${clientName.split(' ')[0]}!`;
            const tSuccessMsg = (window.i18n && typeof window.i18n.t === 'function') 
                ? window.i18n.t('contact.success_msg') 
                : "Sua mensagem foi enviada com sucesso! Fulvio Tanure entrará em contato em breve para tirar suas ideias do papel.";
            const tSimTitle = (window.i18n && typeof window.i18n.t === 'function') 
                ? window.i18n.t('contact.sim_title') 
                : "Modo Simulação Ativo:";
            const tSimMsg = (window.i18n && typeof window.i18n.t === 'function') 
                ? window.i18n.t('contact.sim_msg') 
                : "Para enviar e-mails de verdade para a sua caixa de entrada, coloque sua chave do Web3Forms no arquivo <code>js/contact.js</code>.";
            const tClose = (window.i18n && typeof window.i18n.t === 'function') 
                ? window.i18n.t('contact.close') 
                : "Fechar";

            modal.innerHTML = `
                <div class="info-card-icon" style="width: 70px; height: 70px; border-radius: 50%; font-size: 2rem; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #22c55e; filter: drop-shadow(0 0 5px rgba(34, 197, 94, 0.3));"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h3 id="success-modal-title" style="font-size: 1.5rem; margin-top: 0.5rem;">${tThanks}</h3>
                <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">${tSuccessMsg}</p>
                ${isSimulation ? `
                    <div style="font-size: 0.8rem; text-align: left; color: #eab308; background: rgba(234, 179, 8, 0.1); border: 1px solid rgba(234, 179, 8, 0.25); padding: 0.75rem; border-radius: 12px; margin-top: 0.5rem; line-height: 1.4;">
                        <strong>${tSimTitle}</strong><br>
                        ${tSimMsg}
                    </div>
                ` : ''}
                <button class="btn btn-primary btn-neu" id="close-modal-btn" style="width: 100%;">
                    <span class="btn-text">${tClose}</span>
                </button>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // Show transition
            setTimeout(() => {
                overlay.style.opacity = '1';
                modal.style.transform = 'scale(1)';
                setTimeout(() => {
                    const closeBtn = modal.querySelector('#close-modal-btn');
                    if (closeBtn) closeBtn.focus();
                }, 50);
            }, 50);

            // Close logic
            const closeBtn = modal.querySelector('#close-modal-btn');
            const closeModal = () => {
                overlay.style.opacity = '0';
                modal.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }
                    if (returnEl) returnEl.focus();
                }, 300);
            };

            closeBtn.addEventListener('click', closeModal);

            // Close with Escape key
            const handleEsc = (evt) => {
                if (evt.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEsc);
                }
            };
            document.addEventListener('keydown', handleEsc);

            // Trap focus inside modal
            overlay.addEventListener('keydown', (evt) => {
                if (evt.key === 'Tab') {
                    const focusableElements = Array.from(overlay.querySelectorAll('button, [tabindex="0"]'));
                    if (focusableElements.length === 0) return;
                    
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (evt.shiftKey) { // Shift + Tab
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            evt.preventDefault();
                        }
                    } else { // Tab
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            evt.preventDefault();
                        }
                    }
                }
            });
        }
    }
})();
