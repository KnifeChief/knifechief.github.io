// ==========================================
// 1. NAVBAR YÜKLEME VE YÖNETİMİ
// ==========================================
function loadNavbar() {
    console.log("➡️ ADIM 1: Navbar yükleniyor...");
    fetch('navbar.html?v=' + new Date().getTime())
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            console.log("✅ ADIM 1 BAŞARILI: Navbar HTML sayfaya basıldı.");
            
            updateSpotify();
            setInterval(updateSpotify, 10000); 
        })
        .catch(error => console.error("❌ ADIM 1 HATASI (Navbar yüklenemedi):", error));
}

// ==========================================
// 2. SPOTIFY KÖPRÜSÜ (BACKEND BAĞLANTISI)
// ==========================================
async function updateSpotify() {
    console.log("➡️ ADIM 2: Spotify verisi için Vercel'e istek atılıyor...");
    try {
        const BACKEND_URL = "https://spotify-backend-two-mauve.vercel.app/api/spotify"; 
        
        const response = await fetch(BACKEND_URL);
        console.log("➡️ ADIM 3: Vercel'den yanıt alındı. Durum kodu:", response.status);

        const spotifyModul = document.getElementById("spotify-mini");
        if (!spotifyModul) {
            console.warn("⚠️ UYARI: Navbar içinde id'si 'spotify-mini' olan bir HTML elementi bulunamadı!");
        }

        if (response.status === 200) {
            const data = await response.json();
            console.log("➡️ ADIM 4: Gelen JSON verisi:", data);
            
            if (data.isPlaying) {
                console.log("🎵 ADIM 5: Şarkı çalıyor ->", data.title, "-", data.artist);
                if(spotifyModul) spotifyModul.style.display = "flex";
                
                const sarkiEl = document.getElementById("nav-sarki");
                const sanatciEl = document.getElementById("nav-sanatci");

                if (sarkiEl) sarkiEl.textContent = data.title;
                else console.error("❌ HATA: HTML içinde id='nav-sarki' elemanı bulunamadı!");

                if (sanatciEl) sanatciEl.textContent = data.artist;
                else console.error("❌ HATA: HTML içinde id='nav-sanatci' elemanı bulunamadı!");

            } else {
                console.log("⏸️ ADIM 5: Şu an şarkı çalmıyor. Modül gizleniyor.");
                if(spotifyModul) spotifyModul.style.display = "none";
            }
        } else {
            console.warn("⚠️ UYARI: Vercel 200 dışında bir durum kodu döndürdü:", response.status);
            if(spotifyModul) spotifyModul.style.display = "none";
        }
    } catch (error) {
        console.error("❌ KRİTİK HATA (Adım 2-5 arası patladı):", error);
        const spotifyModul = document.getElementById("spotify-mini");
        if(spotifyModul) spotifyModul.style.display = "none";
    }
}

// ==========================================
// 3. İNCELEMELER SAYFASI FİLTRELEME SİSTEMİ
// ==========================================
function initFilters() {
    const filtreButonlari = document.querySelectorAll('.filtre-btn');
    const incelemeKartlari = document.querySelectorAll('.inceleme-kart');

    if (filtreButonlari.length > 0) {
        filtreButonlari.forEach(buton => {
            buton.addEventListener('click', function() {
                filtreButonlari.forEach(b => b.classList.remove('aktif'));
                this.classList.add('aktif');

                const secilenFiltre = this.getAttribute('data-filtre');

                incelemeKartlari.forEach(kart => {
                    const kartKategorisi = kart.getAttribute('data-kategori');
                    if (secilenFiltre === 'hepsi' || secilenFiltre === kartKategorisi) {
                        kart.classList.remove('gizli');
                    } else {
                        kart.classList.add('gizli');
                    }
                });
            });
        });
    }
}

// ==========================================
// SİSTEMİ BAŞLAT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
    initFilters();
});
