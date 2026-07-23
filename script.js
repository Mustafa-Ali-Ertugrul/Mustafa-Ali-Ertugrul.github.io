/* ==========================================================================
   MATRIX PORTFOLIO INTERACTIVE JAVASCRIPT LOGIC
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

        // Matrix character set
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
            ctx.fillStyle = 'rgba(5, 11, 8, 0.08)';
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
<span class="t-cyan">about</span>       - Hakkımda ve mühendislik profili
<span class="t-cyan">education</span>   - Lisans ve mezuniyet bilgisi
<span class="t-cyan">skills</span>      - Diller ve teknik yetenekler
<span class="t-cyan">projects</span>    - Geliştirilen öne çıkan projeler
<span class="t-cyan">contact</span>     - İletişim bilgileri
<span class="t-cyan">clear</span>       - Terminal ekranını temizle
<span class="t-cyan">whoami</span>      - Kullanıcı kimlik bilgisi`,

        'about': `Mustafa Ali Ertuğrul - Bilgisayar Mühendisi (B.Sc.)
İstanbul Teknik Üniversitesi mezunu.
İlgi Alanları: Dağıtık Sistemler, Yapay Zeka, Web Performansı.`,

        'education': `Mezuniyet: İTÜ Bilgisayar Mühendisliği (2024)
GNO: 3.85 / 4.00 (Yüksek Onur Derecesi)
Bitirme Projesi: Dağıtık Mimarilerde ML ile Anomali Tespiti`,

        'skills': `Diller: Python, JavaScript, C++, Go, SQL, Java
Frameworkler: React, Node.js, Next.js, Express, FastAPI
Araçlar: Docker, AWS, Git, Linux, PostgreSQL, MongoDB`,

        'projects': `1. MatrixVision AI (Python/PyTorch/YOLO)
2. CyberVault Ağ Tarayıcı (C++/Multithreading)
3. DevPulse Dashboard (React/Node.js)
4. CloudScale Microservice Engine (Go/Docker)`,

        'contact': `E-posta: mustafa.ali.ertugrul@example.com
Konum: İstanbul, Türkiye
GitHub: github.com/Mustafa-Ali-Ertugrul`,

        'whoami': `root@matrix-guest: Mustafa Ali Ertuğrul'un Portföy Ziyaretçisi`
    };

    if (terminalInput && terminalOutput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';

                const echoLine = document.createElement('p');
                echoLine.className = 'term-line';
                echoLine.innerHTML = `<span class="term-prompt">mustafa@engineer:~$</span> ${cmd}`;
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

    // ----------------------------------------------------------------------
    // 6. CV DOWNLOAD BUTTON HANDLER
    // ----------------------------------------------------------------------
    const downloadCvBtn = document.getElementById('downloadCvBtn');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('CV indiriliyor... (GitHub Pages üzerinde kendi CV PDF belgenizin bağlantısını ekleyebilirsiniz)');
        });
    }
});

// --------------------------------------------------------------------------
// 7. CERTIFICATE MODAL FUNCTIONS
// --------------------------------------------------------------------------
function openCertModal(title, desc, imgSrc) {
    const modal = document.getElementById('certModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalImg = document.getElementById('modalImg');

    if (modal && modalTitle && modalDesc && modalImg) {
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modalImg.src = imgSrc;
        modal.classList.add('open');
    }
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('open');
    }
}

// Form Submission simulation
function handleFormSubmit(e) {
    e.preventDefault();
    alert('Mesajınız başarıyla iletildi! En kısa sürede dönüş yapılacaktır.');
    e.target.reset();
}
