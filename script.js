const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    if (window.scrollY > 600) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop, height = section.offsetHeight, id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link && scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); navLinks.classList.toggle('active'); overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});
overlay.addEventListener('click', () => {
    hamburger.classList.remove('active'); navLinks.classList.remove('active'); overlay.classList.remove('active');
    document.body.style.overflow = '';
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
    hamburger.classList.remove('active'); navLinks.classList.remove('active'); overlay.classList.remove('active');
    document.body.style.overflow = '';
}));

const particlesContainer = document.getElementById('heroParticles');
for (let i=0; i<25; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random()*100+'%';
    particle.style.top = Math.random()*100+'%';
    particle.style.animationDelay = Math.random()*5+'s';
    particle.style.animationDuration = (Math.random()*5+3)+'s';
    particlesContainer.appendChild(particle);
}

const statsSection = document.getElementById('estadisticas');
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;
function animateStats() {
    if (animated) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight-100) {
        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            let count = 0;
            const step = target/40;
            const timer = setInterval(() => {
                count += step;
                if (count >= target) { el.textContent = target; clearInterval(timer); }
                else el.textContent = Math.floor(count);
            }, 30);
        });
        animated = true;
    }
}
window.addEventListener('scroll', animateStats);

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});

document.querySelectorAll('.organ-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const organ = dot.getAttribute('data-organ');
        document.querySelectorAll('.organ-detail').forEach(d => d.classList.remove('show'));
        const detail = document.getElementById('detail-'+organ);
        if (detail) detail.classList.add('show');
        document.querySelectorAll('.organ-dot').forEach(d => d.style.transform='scale(1)');
        dot.style.transform='scale(1.4)';
        setTimeout(()=>{ dot.style.transform='scale(1)'; },300);
    });
});

function calcularAhorro() {
    const gastoAlcohol = parseFloat(document.getElementById('gastoAlcohol').value)||0;
    const gastoTabaco = parseFloat(document.getElementById('gastoTabaco').value)||0;
    const horasConsumo = parseFloat(document.getElementById('horasConsumo').value)||0;
    const gastoSemanal = gastoAlcohol+gastoTabaco;
    const gastoAnual = gastoSemanal*52;
    const horasAnuales = horasConsumo*52;
    const diasAhorrados = Math.round(horasAnuales/24);
    document.getElementById('resultadoAhorro').innerHTML = `
        💵 <strong>Ahorro anual:</strong> $${gastoAnual.toLocaleString('es-MX')}<br>
        ⏰ <strong>Tiempo recuperado:</strong> ${horasAnuales} horas (≈ ${diasAhorrados} días)
    `;
    const barChart = document.getElementById('barChart');
    barChart.style.display = 'flex';
    document.getElementById('barDinero').style.width = Math.min(100, (gastoAnual/50000)*100)+'%';
    document.getElementById('barTiempo').style.width = Math.min(100, (diasAhorrados/365)*100)+'%';
}

function evaluarTest() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    if(!q1||!q2||!q3||!q4){alert('Responde todas las preguntas');return;}
    const puntuacion = parseInt(q1.value)+parseInt(q2.value)+parseInt(q3.value)+parseInt(q4.value);
    const resultadoDiv = document.getElementById('quizResultado');
    resultadoDiv.className = 'quiz-result';
    if(puntuacion<=2){resultadoDiv.classList.add('low');resultadoDiv.innerHTML='✅ Riesgo bajo. ¡Sigue así!';}
    else if(puntuacion<=5){resultadoDiv.classList.add('medium');resultadoDiv.innerHTML='⚠️ Riesgo moderado. Reflexiona y busca apoyo si es necesario.';}
    else{resultadoDiv.classList.add('high');resultadoDiv.innerHTML='🔴 Riesgo elevado. Recomendamos buscar ayuda profesional.';}
    resultadoDiv.style.display='block';
    resultadoDiv.scrollIntoView({behavior:'smooth',block:'center'});
}
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const totalPreguntas = 4;
        const respondidas = document.querySelectorAll('input[type="radio"]:checked').length;
        document.getElementById('quizProgress').style.width = (respondidas/totalPreguntas)*100+'%';
    });
});
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if(!wasOpen) item.classList.add('open');
    });
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity='1'; entry.target.style.transform='translateY(0)';
        }
    });
}, {threshold:0.1});
document.querySelectorAll('.card, .calculator-box, .body-simulator, .quiz-box, .faq-item, .stat-card').forEach(el => {
    el.style.opacity='0'; el.style.transform='translateY(30px)';
    el.style.transition='opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
