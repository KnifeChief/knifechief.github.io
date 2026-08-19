document.addEventListener('mousemove', function(e) {
    
    // Yeni bir 'div' elementi oluşturuyoruz (bu bizim yıldızımız olacak)
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

// Sayfa içi bağlantılar için tek, kesintiye uğrayabilen smooth-scroll denetimi.
// Delegasyon sayesinde sonradan yüklenen navbar bağlantıları da aynı davranışı kullanır.
let kaydirmaAnimasyonu = null;
let kaydirmaKimligi = 0;

document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const linkUrl = new URL(link.href, window.location.href);
    const ayniSayfa = linkUrl.origin === window.location.origin
        && linkUrl.pathname === window.location.pathname;
    const hedefID = ayniSayfa ? linkUrl.hash : '';
    if (!hedefID || hedefID === '#') return;

    const hedefBolum = document.querySelector(hedefID);
    if (!hedefBolum) return;

    e.preventDefault();
    if (kaydirmaAnimasyonu) cancelAnimationFrame(kaydirmaAnimasyonu);
    const buKaydirma = ++kaydirmaKimligi;

    const baslangic = window.scrollY;
    const navbar = document.querySelector('.ust-menu');
    const navbarYuksekligi = navbar ? navbar.getBoundingClientRect().height : 0;
    const hedef = Math.max(0, baslangic + hedefBolum.getBoundingClientRect().top - navbarYuksekligi);
    const mesafe = Math.abs(hedef - baslangic);
    const sure = Math.min(750, Math.max(250, mesafe * 0.45));
    let baslangicZamani = null;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function animasyon(simdikiZaman) {
        // Daha yeni bir bağlantı tıklandıysa eski kare yeni animasyonun üstüne yazamaz.
        if (buKaydirma !== kaydirmaKimligi) return;
        if (baslangicZamani === null) baslangicZamani = simdikiZaman;
        const ilerleme = Math.min((simdikiZaman - baslangicZamani) / sure, 1);
        window.scrollTo(0, baslangic + (hedef - baslangic) * easeInOutQuad(ilerleme));

        if (ilerleme < 1) {
            kaydirmaAnimasyonu = requestAnimationFrame(animasyon);
        } else {
            kaydirmaAnimasyonu = null;
        }
    }

    kaydirmaAnimasyonu = requestAnimationFrame(animasyon);
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
               
                kapsayici.style.transition = 'none';
                if (kapsayici.classList.contains('sol-kapsayici')) {
                    kapsayici.style.transform = 'translateX(-50vw)';
                } else {
                    kapsayici.style.transform = 'translateX(50vw)';
                }

                
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
        
        const hamburgerBtn = e.target.closest('#hamburger-btn');
        const kisiselMenu = document.getElementById('kisisel-menu');
        
        if (hamburgerBtn && kisiselMenu) {
            e.preventDefault();
           
            hamburgerBtn.classList.toggle('aktif');
            
            kisiselMenu.classList.toggle('goster');
            hamburgerBtn.setAttribute('aria-expanded', kisiselMenu.classList.contains('goster'));
        } 
        
        else if (kisiselMenu && kisiselMenu.classList.contains('goster') && !e.target.closest('.kisisel-menu')) {
            document.getElementById('hamburger-btn').classList.remove('aktif');
            kisiselMenu.classList.remove('goster');
            document.getElementById('hamburger-btn').setAttribute('aria-expanded', 'false');
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





