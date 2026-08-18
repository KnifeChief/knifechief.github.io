document.addEventListener('mousemove', function(e) {
    
   
    const yildiz = document.createElement('div');
    yildiz.classList.add('yildiz-izi'); // CSS'teki yildiz-izi sınıfını veriyoruz[cite: 3]
    
    // YENİ EKLENEN DÜZELTME:
    // Yıldızın farenin tam o anki X ve Y koordinatlarında çıkmasını sağlıyoruz
    // pageX ve pageY yerine, ekrana kilitli olan clientX ve clientY kullanıyoruz!
    yildiz.style.left = (e.clientX - 10) + 'px';
    yildiz.style.top = (e.clientY - 10) + 'px';
    
    // Yıldızı ekrana (body içine) ekliyoruz
    document.body.appendChild(yildiz);
    
    // Yıldızın sonsuza kadar ekranda kalmaması için 800 milisaniye sonra siliyoruz
    setTimeout(() => {
        yildiz.remove();
    }, 800);
    
});

// Sayfa yüklendiğinde Navbar'ı getiren kod
document.addEventListener("DOMContentLoaded", function() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        });
});

    // Sayfadaki '#' ile başlayan tüm linkleri bul
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Tarayıcının ışınlamasını durdur

            const hedefID = this.getAttribute('href');
            if (hedefID === '#') return; // Boş linkleri atla

            const hedefBolum = document.querySelector(hedefID);
            if (!hedefBolum) return;

            // --- AYAR KISMI ---
            // 1500 = 1.5 saniye demektir. Daha yavaş istersen 2000 (2 saniye) yapabilirsin.
            const sure = 1300; 
            
            // Konum hesaplamaları
            const baslangic = window.scrollY; // Şu an bulunduğumuz yer
            const hedefY = hedefBolum.getBoundingClientRect().top; // Hedefe olan uzaklık
            let baslangicZamani = null;

            // Yumuşak hızlanma ve yavaşlama (Easing) matematiği
            function easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            }

            // Animasyon Döngüsü
            function animasyon(suankiZaman) {
                if (baslangicZamani === null) baslangicZamani = suankiZaman;
                const gecenZaman = suankiZaman - baslangicZamani;
                
                // İlerlemeyi 0 ile 1 arasında bir değere çevir
                let ilerleme = gecenZaman / sure;
                if (ilerleme > 1) ilerleme = 1;

                // Easing fonksiyonunu uygula (Yağ gibi kayması için)
                const easeIlerleme = easeInOutQuad(ilerleme);

                // Ekranı yeni konuma kaydır
                window.scrollTo(0, baslangic + (hedefY * easeIlerleme));

                // Süre dolmadıysa animasyona devam et
                if (gecenZaman < sure) {
                    requestAnimationFrame(animasyon);
                }
            }

            // Animasyonu başlat
            requestAnimationFrame(animasyon);
        });
    });
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('sifre-modal');
    const girisBtn = document.getElementById('giris-yap-btn');
    const kapatBtn = document.getElementById('kapat-btn');
    const sifreInput = document.getElementById('admin-sifre-input');
    const hataMesaji = document.getElementById('hata-mesaji');

    // Belirleyeceğin gizli admin şifresi
    const DOGRU_SIFRE = "1234"; 

    // Navbar sonradan yüklense bile logoya tıklanmasını yakalar
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'knifechief-logo') {
            e.preventDefault(); // Sayfanın zıplamasını engeller
            if (modal) {
                modal.style.display = 'flex';
                sifreInput.value = '';
                hataMesaji.style.display = 'none';
                sifreInput.focus();
            }
        }
    });

    // İptal butonuna basınca modalı kapat
    if (kapatBtn) {
        kapatBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Modalın dışındaki siyah boşluğa tıklandığında da kapanmasını istersen (isteğe bağlı)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Giriş Yap butonuna basınca şifreyi kontrol et
    if (girisBtn) {
        girisBtn.addEventListener('click', () => {
            if (sifreInput.value === DOGRU_SIFRE) {
                window.location.href = 'admin311087.html'; // Şifre doğruysa admin sayfasına git
            } else {
                hataMesaji.style.display = 'block'; // Yanlışsa hata yazısını göster
                sifreInput.value = '';
            }
        });
    }

    // Klavyeden "Enter" tuşuna basıldığında giriş yapma
    if (sifreInput) {
        sifreInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                girisBtn.click();
            }
        });
    }
});


// balon anm 
document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.balon-kapsayici').forEach(kapsayici => {
        const govde = kapsayici.querySelector('.baloncuk-govde');
        let isAnimating = false; // Animasyon bitmeden tekrar tıklanmasını engeller

        govde.addEventListener('click', function() {
            if (isAnimating) return;
            isAnimating = true;

            // 1. AŞAMA: PATLAMA EFEKTİ
            // Baloncuk aniden büyür ve şeffaflaşıp kaybolur
            govde.style.transform = 'scale(2.5)';
            govde.style.opacity = '0';
            
            // 2. AŞAMA: DUVAR ARKASINA IŞINLANMA (1 saniye sonra)
            setTimeout(() => {
                // Kapsayıcıyı ekranda görünmeden hızlıca dışarı taşıyoruz
                kapsayici.style.transition = 'none';
                if (kapsayici.classList.contains('sol-kapsayici')) {
                    kapsayici.style.transform = 'translateX(-50vw)';
                } else {
                    kapsayici.style.transform = 'translateX(50vw)';
                }

                // Gövdeyi görünmezken eski boyutuna getiriyoruz
                govde.style.transform = 'scale(1)';
                govde.style.opacity = '1';

                // 3. AŞAMA: SÜZÜLEREK GERİ GELME
                setTimeout(() => {
                    // Yavaşça orijinal konumuna (0) geri kaydırıyoruz
                    kapsayici.style.transition = 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
                    kapsayici.style.transform = 'translateX(0)';

                    // Süzülme işlemi bitince kilidi açıyoruz
                    setTimeout(() => {
                        isAnimating = false;
                    }, 1500); 

                }, 50); // CSS motorunun ışınlanmayı kavraması için çok minik bir gecikme
                
            }, 800); // Patladıktan sonra boşlukta bekleme süresi
        });
    });

});


// KİŞİSEL MENÜ (3 ÇİZGİ) İÇİN KONTROL SİSTEMİ
    document.addEventListener('click', (e) => {
        // Tıklanan şey 3 çizgi butonu mu kontrol et
        const hamburgerBtn = e.target.closest('#hamburger-btn');
        const kisiselMenu = document.getElementById('kisisel-menu');
        
        if (hamburgerBtn && kisiselMenu) {
            e.preventDefault();
            // Butona 'aktif' (çarpı olma) sınıfını ekle/çıkar
            hamburgerBtn.classList.toggle('aktif');
            // Menüye 'goster' sınıfını ekle/çıkar
            kisiselMenu.classList.toggle('goster');
        } 
        // Eğer menü açıkken boş bir yere tıklanırsa menüyü otomatik kapat
        else if (kisiselMenu && kisiselMenu.classList.contains('goster') && !e.target.closest('.kisisel-menu')) {
            document.getElementById('hamburger-btn').classList.remove('aktif');
            kisiselMenu.classList.remove('goster');
        }
    });


    document.addEventListener('DOMContentLoaded', () => {
    const iletisimFormu = document.getElementById('benim-formum');
    const formDurumu = document.getElementById('form-durumu');

    if (iletisimFormu) {
        iletisimFormu.addEventListener('submit', async function(event) {
            event.preventDefault(); // Tarayıcının başka sayfaya (Formspree'nin beyaz ekranına) gitmesini kesin olarak engeller!
            
            const data = new FormData(iletisimFormu);
            
            // Kullanıcıya gönderildiğine dair ufak bir yükleniyor geri bildirimi verelim
            formDurumu.style.display = 'block';
            formDurumu.style.color = '#ccc';
            formDurumu.textContent = "Mesajınız gönderiliyor...";

            try {
                // Formspree'ye arka planda istek atıyoruz (Accept: application/json kısmı çok önemli)
                const response = await fetch(iletisimFormu.action, {
                    method: iletisimFormu.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Gönderim başarılıysa
                    formDurumu.style.color = '#00ff00'; // Yeşil renk
                    formDurumu.textContent = "Mesajın bana ulaştı. En kısa sürede dönüş yapacağım.";
                    iletisimFormu.reset(); // Kutuların içini temizle
                } else {
                    // Formspree'den bir hata dönerse
                    const responseData = await response.json();
                    if (Object.hasOwn(responseData, 'errors')) {
                        formDurumu.textContent = responseData["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formDurumu.style.color = '#ff3333'; // Kırmızı renk
                        formDurumu.textContent = "Bir sorun oluştu. Lütfen daha sonra tekrar dene.";
                    }
                }
            } catch (error) {
                // İnternet bağlantısı koptuysa vs.
                formDurumu.style.color = '#ff3333';
                formDurumu.textContent = "Bağlantı hatası! Lütfen internetini kontrol et.";
            }
            
            // Mesajı 5 saniye sonra ekrandan yavaşça kaldır
            setTimeout(() => {
                formDurumu.style.display = 'none';
            }, 5000);
        });
    }
});



