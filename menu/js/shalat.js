// Jadwal Shalat
const pilihKota = document.getElementById("pilih-kota");
let kodeKota = pilihKota.value;
const adzanSound = document.getElementById("adzan");
const adzanSubuhSound = document.getElementById("adzan-subuh");
const imsakAlertSound = document.getElementById("imsak-alert");

let imsakPlayed = false;
let subuhPlayed = false;
let dzuhurPlayed = false;
let asharPlayed = false;
let maghribPlayed = false;
let isyaPlayed = false;

function tampilkanJadwal(kode, tanggalDipilih) {
    let tanggal;
    if (tanggalDipilih) {
        tanggal = new Date(tanggalDipilih);
    } else {
        tanggal = new Date();
    }
    const tahun = tanggal.getFullYear();
    const bulan = String(tanggal.getMonth() + 1).padStart(2, '0');
    const hari = String(tanggal.getDate()).padStart(2, '0');
    const url = `https://api.myquran.com/v2/sholat/jadwal/${kode}/${tahun}/${bulan}/${hari}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === true) {
                const jadwal = data.data.jadwal;
                document.getElementById("lokasi").textContent = data.data.lokasi;
                document.getElementById("imsak").textContent = jadwal.imsak;
                document.getElementById("subuh").textContent = jadwal.subuh;
                document.getElementById("dzuhur").textContent = jadwal.dzuhur;
                document.getElementById("ashar").textContent = jadwal.ashar;
                document.getElementById("maghrib").textContent = jadwal.maghrib;
                document.getElementById("isya").textContent = jadwal.isya;

                // Update judul jadwal
                const namaKota = pilihKota.options[pilihKota.selectedIndex].text;
                const tanggalFormat = tanggal.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                document.getElementById("judul-jadwal").textContent = `Jadwal Shalat ${tanggalFormat} - ${namaKota}`;

                // Reset status pemutaran suara
                imsakPlayed = false;
                subuhPlayed = false;
                dzuhurPlayed = false;
                asharPlayed = false;
                maghribPlayed = false;
                isyaPlayed = false;
            } else {
                console.error("Gagal mengambil data jadwal shalat:", data.status);
                // Tampilkan pesan kesalahan kepada pengguna
            }
        })
        .catch((error) => {
            console.error("Error fetching jadwal shalat:", error);
            // Tampilkan pesan kesalahan kepada pengguna
        });
}

function tampilkanWaktu() {
    const waktu = new Date();
    const jam = String(waktu.getHours()).padStart(2, '0');
    const menit = String(waktu.getMinutes()).padStart(2, '0');
    const detik = String(waktu.getSeconds()).padStart(2, '0');
    const waktuDigital = `${jam}:${menit}`;
    document.getElementById("waktu-digital").textContent = `${jam}:${menit}:${detik}`;

    // Cek waktu shalat
    if (waktuDigital === document.getElementById("imsak").textContent.substring(0, 5) && !imsakPlayed) {
        imsakAlertSound.play();
        imsakPlayed = true;
    }
    if (waktuDigital === document.getElementById("subuh").textContent.substring(0, 5) && !subuhPlayed) {
        adzanSubuhSound.play();
        subuhPlayed = true;
    }
    if (waktuDigital === document.getElementById("dzuhur").textContent.substring(0, 5) && !dzuhurPlayed) {
        adzanSound.play();
        dzuhurPlayed = true;
    }
    if (waktuDigital === document.getElementById("ashar").textContent.substring(0, 5) && !asharPlayed) {
        adzanSound.play();
        asharPlayed = true;
    }
    if (waktuDigital === document.getElementById("maghrib").textContent.substring(0, 5) && !maghribPlayed) {
        adzanSound.play();
        maghribPlayed = true;
    }
    if (waktuDigital === document.getElementById("isya").textContent.substring(0, 5) && !isyaPlayed) {
        adzanSound.play();
        isyaPlayed = true;
    }
}

pilihKota.addEventListener("change", function () {
    kodeKota = this.value;
    const tanggalDipilih = document.getElementById("pilih-tanggal").value;
    tampilkanJadwal(kodeKota, tanggalDipilih);
});

document.getElementById("pilih-tanggal").addEventListener("change", function () {
    const tanggalDipilih = this.value;
    tampilkanJadwal(kodeKota, tanggalDipilih);
});


