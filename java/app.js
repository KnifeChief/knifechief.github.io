// ==========================================
// 1. NAVBAR YÜKLEME VE YÖNETİMİ
// ==========================================
function loadNavbar() {
    fetch('navbar.html?v=' + new Date().getTime())
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            console.log("✅ Navbar HTML olarak sayfaya basıldı.");
            
            updateSpotify();
            setInterval(updateSpotify, 10000); 
        })
        .catch(error => console.error("❌ Navbar yüklenirken hata oluştu:", error));
}

// ==========================================
// 2. SPOTIFY KÖPRÜSÜ (BACKEND BAĞLANTISI)
// ==========================================
async function updateSpotify() {
    try {
        const BACKEND_URL = "https://spotify-backend-two-mauve.vercel.app/api/spotify"; 
        
        const response = await fetch(BACKEND_URL);
        const spotifyModul = document.getElementById("spotify-mini");

        if (response.status === 200) {
            const data = await response.json();
            
            if (data.isPlaying) {
                console.log("🎵 Şarkı bulundu:", data.title);
                if(spotifyModul) spotifyModul.style.display = "flex";
                
                document.getElementById("nav-sarki").textContent = data.title;
                document.getElementById("nav-sanatci").textContent = data.artist;
            } else {
                console.log("⏸️ Şu an şarkı çalmıyor. Modül gizlendi.");
                if(spotifyModul) spotifyModul.style.display = "none";
            }
        } else {
            if(spotifyModul) spotifyModul.style.display = "none";
        }
    } catch (error) {
        console.error("❌ Backend Bağlantı Hatası:", error);
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
