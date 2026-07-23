/* ==========================================================================
   MATRIX AI SYSTEMS ENGINEER PORTFOLIO - JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. MATRIX DIGITAL RAIN CANVAS ANIMATION
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[];:=+*&^%$#@!';
        const alphabet = katakana + latin;

        const fontSize = 16;
        let columns = Math.floor(canvas.width / fontSize);
        let rainDrops = [];

        function initDrops() {
            columns = Math.floor(canvas.width / fontSize);
            rainDrops = [];
            for (let i = 0; i < columns; i++) {
                rainDrops[i] = Math.floor(Math.random() * -50);
            }
        }
        initDrops();
        window.addEventListener('resize', initDrops);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(4, 8, 6, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00FF66';
            ctx.font = fontSize + 'px Fira Code, monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                const x = i * fontSize;
                const y = rainDrops[i] * fontSize;

                if (Math.random() > 0.85) {
                    ctx.fillStyle = '#FFFFFF';
                } else {
                    ctx.fillStyle = '#00FF66';
                }

                ctx.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        }

        setInterval(drawMatrix, 35);
    }

    // ----------------------------------------------------------------------
    // 2. SCROLLSPY & ACTIVE SIDEBAR LINK HIGHLIGHTING
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');

    function highlightSidebarNav() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightSidebarNav);

    // ----------------------------------------------------------------------
    // 3. MOBILE MENU TOGGLE
    // ----------------------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    sidebar.classList.remove('open');
                }
            });
        });
    }

    // ----------------------------------------------------------------------
    // 4. PROJECT CATEGORY FILTERING
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 5. INTERACTIVE TERMINAL ENGINE
    // ----------------------------------------------------------------------
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');

    const commands = {
        'help': `Mevcut komutlar:
<span class="t-cyan">allbrain</span>    - AllBrain MCP sistem mimarisi vaka incelemesi
<span class="t-cyan">projects</span>    - Üretim seviyesinde öne çıkan sistemler
<span class="t-cyan">stack</span>       - AI & Multi-Agent mühendislik yetenekleri
<span class="t-cyan">education</span>   - Lisans ve akademik geçmiş
<span class="t-cyan">contact</span>     - İletişim & sosyal bağlantılar
<span class="t-cyan">clear</span>       - Terminal ekranını temizle
<span class="t-cyan">whoami</span>      - Kullanıcı kimlik bilgisi`,

        'allbrain': `AllBrain MCP (Multi-Agent Control Protocol Engine)
- Event Sourcing & Değişmez Zaman Çizelgesi
- Çelişki ve Güvenilirlik Skorlama Motoru (Trust & Uncertainty)
- MCP Protocol Standardına Uygun Araç Çağırma ve Kiralama
- Otonom Senaryo Simülasyonu ve Meta-Öğrenme`,

        'about': `Mustafa Ali Ertuğrul - Computer Engineer & AI Systems Developer
Odak Alanları: AllBrain MCP, Multi-Agent Sistemler, Siber Güvenlik AI (NetMind-AI), BIST Algotrading.`,

        'education': `Lisans: Burdur Mehmet Akif Ersoy Üniversitesi - Bilgisayar Mühendisliği
GNO: 3.85 / 4.00 (Yüksek Onur Derecesi)`,

        'stack': `AI & Agent: Model Context Protocol (MCP), Multi-Agent Orchestration, PyTorch, RAG
Core Languages: Python 3.11+ (Expert), C/C++, Java, SQL, Dart
Platforms: Linux, Docker, PCAP Traffic Engine, Streamlit, Flutter`,

        'projects': `1. AllBrain MCP (Multi-Agent Control & Orchestration Core)
2. Multi-Agent (Otonom Kod Analizi & PR Robotu)
3. NetMind-AI (Siber Güvenlik & PCAP Trafik Analizi)
4. bist-bot (BIST Borsa Algotrading Platformu)
5. DocMind-AI (Yapay Zeka Doküman Analizi & RAG)`,

        'contact': `E-posta: ertugrulmustafaali@gmail.com
LinkedIn: linkedin.com/in/mustafa-ali-ertuğrul
GitHub: github.com/Mustafa-Ali-Ertugrul`,

        'whoami': `root@allbrain-core: Mustafa Ali Ertuğrul'un Sistem Mimarı Portföyü`
    };

    if (terminalInput && terminalOutput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';

                const echoLine = document.createElement('p');
                echoLine.className = 'term-line';
                echoLine.innerHTML = `<span class="term-prompt">mustafa@allbrain:~$</span> ${cmd}`;
                terminalOutput.appendChild(echoLine);

                if (cmd === 'clear') {
                    terminalOutput.innerHTML = '';
                    return;
                }

                const responseLine = document.createElement('p');
                responseLine.className = 'term-line';

                if (commands[cmd]) {
                    responseLine.innerHTML = commands[cmd];
                } else if (cmd !== '') {
                    responseLine.innerHTML = `<span class="t-red">Bilinmeyen komut: '${cmd}'.</span> Yardım için <span class="t-cyan">'help'</span> yazın.`;
                }

                terminalOutput.appendChild(responseLine);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }
});

// Form Submission simulation
function handleFormSubmit(e) {
    e.preventDefault();
    alert('Mesajınız başarıyla iletildi! En kısa sürede dönüş yapılacaktır.');
    e.target.reset();
}
