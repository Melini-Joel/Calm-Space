// Navegación suave
        function scrollToSection(id) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }

        // Tips aleatorios
        const tips = [
            "Hacé 5 respiraciones profundas ahora mismo",
            "Escribí 3 cosas por las que estás agradecido hoy",
            "Estirá tu cuerpo por 2 minutos",
            "Tomá un vaso de agua y prestale atención a cada sorbo",
            "Mirá por la ventana durante 1 minuto sin pensar en nada",
            "Escuchá tu canción favorita con los ojos cerrados",
            "Enviá un mensaje amable a alguien que querés",
            "Apagá las notificaciones por 30 minutos",
            "Hacé una lista de cosas que te hacen feliz",
            "Sonreí. Aunque sea forzado, tu cerebro responde positivo"
        ];

        function generateRandomTip() {
            const randomTip = tips[Math.floor(Math.random() * tips.length)];
            document.getElementById('randomTip').innerHTML = 
                `<p class="random-tip-text">${randomTip}</p>`;
        }

        // Simulación de sonidos
        let currentSound = null;

        function toggleSound(sound) {
            const buttons = document.querySelectorAll('.sound-btn');
            buttons.forEach(btn => btn.classList.remove('playing'));

            if (sound === 'parar') {
                currentSound = null;
                return;
            }

            if (currentSound === sound) {
                currentSound = null;
            } else {
                currentSound = sound;
                event.target.classList.add('playing');
                
                // Simulación visual
                let message = '';
                switch(sound) {
                    case 'lluvia':
                        message = '🌧️ Sonido de lluvia activado...';
                        break;
                    case 'olas':
                        message = '🌊 Sonido de olas activado...';
                        break;
                    case 'bosque':
                        message = '🌲 Sonido de bosque activado...';
                        break;
                }
                
                console.log(message);
            }
        }