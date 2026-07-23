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
<span class="t-cyan">skills</span>      - Diller ve teknik yetenekler (PyTorch, Flutter, C++)
<span class="t-cyan">projects</span>    - Geliştirilen öne çıkan projeler
<span class="t-cyan">certificates</span>- İndirilebilir 12 teknik sertifika
<span class="t-cyan">contact</span>     - İletişim bilgileri ve sosyal hesaplar
<span class="t-cyan">clear</span>       - Terminal ekranını temizle
<span class="t-cyan">whoami</span>      - Kullanıcı kimlik bilgisi`,

        'about': `Mustafa Ali Ertuğrul - Bilgisayar Mühendisi (B.Sc.)
Yapay Zeka, PyTorch Derin Öğrenme, Flutter Mobil ve Python Geliştirici.`,

        'education': `Mezuniyet: Bilgisayar Mühendisliği (2024)
GNO: 3.85 / 4.00 (Yüksek Onur Derecesi)
Sertifikalar: 12 Adet Uzmanlık Sertifikası`,

        'skills': `Diller: Python, C++, Java, Dart, SQL, JavaScript
Yapay Zeka: PyTorch, Makine Öğrenmesi, Derin Öğrenme, Prompt Engineering
Mobil & Araçlar: Flutter, Docker, Git, Linux`,

        'certificates': `1. PyTorch ile Derin Öğrenme Algoritmaları
2. Python ile Makine Öğrenmesi
3. Flutter ile Mobil Uygulama Geliştirme
4. Dart Programlama Dili
5. Uygulamalarla SQL Öğreniyorum
6. Sıfırdan İleri Seviye Python Programlama
7. C++ ile Programlamaya Giriş
8. JAVA ile Programlamaya Giriş
9. Büyük Veriye Giriş
10. Prompt Mühendisliği
11. Python ile Topluluk Öğrenmesi Pratikleri
12. İleri Seviye Python Programlama Dili`,

        'projects': `1. PyTorch Derin Öğrenme & Anomali Tespiti
2. Flutter Cross-Platform Mobil Uygulaması
3. C++ & Java Veri Mimarisi
4. Büyük Veri Analitiği & SQL Sorgu Optimizasyonu`,

        'contact': `Telefon: 0551 086 74 93
E-posta: ertugrulmustafaali@gmail.com
LinkedIn: linkedin.com/in/mustafa-ali-ertuğrul
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
});

// Form Submission simulation
function handleFormSubmit(e) {
    e.preventDefault();
    alert('Mesajınız başarıyla iletildi! En kısa sürede dönüş yapılacaktır.');
    e.target.reset();
}
