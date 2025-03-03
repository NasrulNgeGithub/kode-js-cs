//Jadwal Shalat

    const pilihKota = document.getElementById("pilih-kota");
    let kodeKota = pilihKota.value;
    const adzanSound = document.getElementById("adzan");
    const adzanSubuhSound = document.getElementById("adzan-subuh");
    const imsakAlertSound = document.getElementById("imsak-alert");

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
        const url = `https://api.myquran.com/v2/sholat/jadwal/<span class="math-inline">\{kode\}/</span>{tahun}/<span class="math-inline">\{bulan\}/</span>{hari}`;

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
                } else {
                    console.error("Gagal mengambil data jadwal shalat:", data.status);
                }
            })
            .catch((error) => {
                console.error("Error fetching jadwal shalat:", error);
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
        if (waktuDigital === document.getElementById("imsak").textContent) {
            imsakAlertSound.play();
        }
        if (waktuDigital === document.getElementById("subuh").textContent) {
            adzanSubuhSound.play();
        }
        if (waktuDigital === document.getElementById("dzuhur").textContent) {
            adzanSound.play();
        }
        if (waktuDigital === document.getElementById("ashar").textContent) {
            adzanSound.play();
        }
        if (waktuDigital === document.getElementById("maghrib").textContent) {
            adzanSound.play();
        }
        if (waktuDigital === document.getElementById("isya").textContent) {
            adzanSound.play();
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

    tampilkanJadwal(kodeKota);
    tampilkanWaktu();
    setInterval(tampilkanWaktu, 1000);
