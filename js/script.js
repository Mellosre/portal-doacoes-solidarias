       // Controle de Tema
        const themeToggle = document.getElementById('theme-toggle');
        const contrastToggle = document.getElementById('contrast-toggle');
        const fontIncrease = document.getElementById('font-increase');
        let fontSize = 16;

        // Carregar preferências salvas
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeButton(savedTheme);

        // Alternar Tema Escuro
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeButton(newTheme);
            
            // Anunciar mudança para leitores de tela
            announceToScreenReader(`Tema alterado para ${newTheme === 'dark' ? 'escuro' : 'claro'}`);
        });

        // Alternar Alto Contraste
        contrastToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'high-contrast' ? 'light' : 'high-contrast';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            announceToScreenReader(`${newTheme === 'high-contrast' ? 'Alto contraste ativado' : 'Alto contraste desativado'}`);
        });

        // Aumentar Fonte
        fontIncrease.addEventListener('click', () => {
            fontSize += 2;
            if (fontSize > 24) fontSize = 16;
            
            document.documentElement.style.fontSize = fontSize + 'px';
            localStorage.setItem('fontSize', fontSize);
            
            announceToScreenReader(`Tamanho da fonte: ${fontSize} pixels`);
        });

        // Atualizar ícone do botão de tema
        function updateThemeButton(theme) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', 
                theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'
            );
        }

        // Função para anunciar mudanças aos leitores de tela
        function announceToScreenReader(message) {
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }

        // Formulário de Doação
        const donationForm = document.querySelector('.donation-form');
        
        donationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(donationForm);
            const name = formData.get('donor-name');
            const amount = formData.get('amount');
            
            // Simular envio de doação
            alert(`Obrigado, ${name}! Sua doação de R$ ${parseFloat(amount).toFixed(2)} foi registrada com sucesso!`);
            
            // Anunciar sucesso
            announceToScreenReader(`Doação de ${amount} reais realizada com sucesso`);
            
            // Resetar formulário
            donationForm.reset();
        });

        // Navegação suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Focar no elemento alvo para acessibilidade
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });

        // Carregar tamanho de fonte salvo
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            fontSize = parseInt(savedFontSize);
            document.documentElement.style.fontSize = fontSize + 'px';
        }

        // Animação dos cards ao entrar na viewport
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.cause-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(card);
        });

        // Suporte a teclado para navegação
        document.addEventListener('keydown', (e) => {
            // Atalho Alt+1 para pular para o conteúdo principal
            if (e.altKey && e.key === '1') {
                e.preventDefault();
                document.getElementById('main-content').focus();
            }
            
            // Atalho Alt+T para alternar tema
            if (e.altKey && e.key.toLowerCase() === 't') {
                e.preventDefault();
                themeToggle.click();
            }
        });