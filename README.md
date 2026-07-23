# 🚀 Bilgisayar Mühendisliği GitHub Pages Portföy Sitesi

Bu proje, **Bilgisayar Mühendisliği** mezuniyeti, projeler, diplomalar, sertifikalar ve teknik yetenekleri sergilemek üzere **GitHub Pages** altyapısıyla tam uyumlu, **Matrix Dijital Yağmur Temalı** özel bir statik web sitesidir.

---

## 🌟 Öne Çıkan Özellikler

* **Sol Sidebar Navigasyonu:** Ana bölümlere (Hakkımda, Eğitim, Yetenekler, Projeler, Belgeler, Terminal, İletişim) hızlı erişim sağlayan responsive sol menü.
* **Merkezi Profil Fotoğrafı:** En başta ortada yeşil matrix ışık halkasıyla çevrelenmiş mühendis profil fotoğrafı.
* **Matrix Digital Rain Canvas:** Arka planda HTML5 Canvas ile çalışan akan kod animasyonu.
* **İnteraktif Mühendislik Terminali:** `help`, `skills`, `projects`, `education`, `whoami` vb. komutları çalıştıran dahili bash benzeri konsol.
* **Kategori Filtreli Proje Kartları:** Yapay Zeka, Web ve Sistem projelerini canlı önizleme ve GitHub bağlantılarıyla sergileme.
* **Diploma & Sertifika Modal Önizleyici:** Tıklandığında açılan detaylı belge inceleme penceresi.
* **%100 Responsive & Mobil Uyumlu:** Mobil cihazlarda açılır çekmece menü desteği.

---

## 🛠️ GitHub Pages Üzerinde 4 Adımda Yayına Alma

### Adım 1: GitHub'da Depo (Repository) Oluşturun
1. [GitHub.com](https://github.com) hesabınıza giriş yapın ve sağ üstteki **"+"** ikonundan **New repository** seçin.
2. Depo adını şu şekilde yapın:
   * Doğrudan ana adresiniz için: **`kullaniciadi.github.io`**
   * (Farklı isim verirseniz `kullaniciadi.github.io/repo-adi` adresinde yayınlanır).
3. Public seçeneğini işaretleyip **Create repository** butonuna basın.

### Adım 2: Kodları Depoya Yükleyin
Bilgisayarınızda terminal / PowerShell açıp proje klasörüne gidin:

```bash
cd C:\Users\Ali\github-pages-portfolio

git init
git add .
git commit -m "Initial matrix CS engineer portfolio"
git branch -M main
git remote add origin https://github.com/kullaniciadi/kullaniciadi.github.io.git
git push -u origin main
```

*(Not: `kullaniciadi` yazan yerleri kendi GitHub kullanıcı adınızla değiştirin).*

### Adım 3: GitHub Pages Özelliğini Aktif Edin
1. GitHub deponuzda **Settings** (Ayarlar) sekmesine gidin.
2. Sol menüden **Pages** seçeneğine tıkla.
3. **Build and deployment -> Source** kısmında `Deploy from a branch` seçili olduğundan emin olun.
4. **Branch** kısmında `main` (veya `master`) dalını ve `/ (root)` klasörünü seçip **Save** butonuna basın.

### Adım 4: Siteniz Yayında! 🎉
1-2 dakika içinde GitHub projenizi derleyecek ve siteniz **`https://kullaniciadi.github.io`** adresinde ücretsiz HTTPS sertifikasıyla canlıya alınacaktır!

---

## 📁 Proje Dosya Yapısı

```
github-pages-portfolio/
├── index.html       # Ana HTML yapısı ve sol sidebar düzeni
├── style.css        # Matrix yeşili dark tema, responsive CSS
├── script.js        # Matrix canvas, terminal motoru, filtreler ve modal
├── profile.jpg      # En başta ortada yer alan profil fotoğrafı
└── README.md        # Yayına alma rehberi
```

Sitedeki isim, e-posta, proje ve sertifika bilgilerini `index.html` dosyasından istediğiniz gibi güncelleyebilirsiniz.
