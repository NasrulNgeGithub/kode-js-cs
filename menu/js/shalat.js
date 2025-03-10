// Jadwal Shalat
    const pilihKota = document.getElementById("pilih-kota");
    const pilihTanggal = document.getElementById("pilih-tanggal");

    function tampilkanJadwal(kode, tanggal) {
        const url = `https://api.myquran.com/v2/sholat/jadwal/${kode}/${tanggal.getFullYear()}/${String(tanggal.getMonth() + 1).padStart(2, '0')}/${String(tanggal.getDate()).padStart(2, '0')}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    const jadwal = data.data.jadwal;

                    // Menampilkan jadwal shalat
                    document.getElementById("imsak").textContent = jadwal.imsak;
                    document.getElementById("subuh").textContent = jadwal.subuh;
                    document.getElementById("dzuhur").textContent = jadwal.dzuhur;
                    document.getElementById("ashar").textContent = jadwal.ashar;
                    document.getElementById("maghrib").textContent = jadwal.maghrib;
                    document.getElementById("isya").textContent = jadwal.isya;

                    // Update judul jadwal
                    const namaKota = pilihKota.options[pilihKota.selectedIndex].text;
                    const tanggalFormat = tanggal.toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });
                    document.getElementById("judul-jadwal").textContent = `Jadwal Shalat ${tanggalFormat} - ${namaKota}`;

                    // Memeriksa waktu untuk memutar audio
                    const now = new Date();
                    const waktuImsak = new Date(`${tanggal.toLocaleDateString("id-ID")} ${jadwal.imsak}`);
                    const waktuSubuh = new Date(`${tanggal.toLocaleDateString("id-ID")} ${jadwal.subuh}`);
                    const waktuDzuhur = new Date(`${tanggal.toLocaleDateString("id-ID")} ${jadwal.dzuhur}`);
                    const waktuAshar = new Date(`${tanggal.toLocaleDateString("id-ID")} ${jadwal.ashar}`);
                    const waktuMaghrib = new Date(`${tanggal.toLocaleDateString("id-ID")} ${jadwal.maghrib}`);
                    const waktuIsya = new Date(`${tanggal.toLocaleDateString("id-ID")} ${jadwal.isya}`);

                    // Memutar adzan berdasarkan waktu shalat
                    if (now.getTime() === waktuImsak.getTime()) {
                        document.getElementById("imsak-alert").play();
                    } else if (now.getTime() === waktuSubuh.getTime()) {
                        document.getElementById("adzan-subuh").play();
                    } else if (now.getTime() === waktuDzuhur.getTime()) {
                        document.getElementById("adzan-dzuhur").play();
                    } else if (now.getTime() === waktuAshar.getTime()) {
                        document.getElementById("adzan-ashar").play();
                    } else if (now.getTime() === waktuMaghrib.getTime()) {
                        document.getElementById("adzan-maghrib").play();
                    } else if (now.getTime() === waktuIsya.getTime()) {
                        document.getElementById("adzan-isya").play();
                    }

                    // Menampilkan ikon aktif jika waktu sesuai
                    if (now.getTime() === waktuImsak.getTime()) {
                        document.querySelector(".imsak-ikon").classList.add("aktif");
                    } else if (now.getTime() === waktuSubuh.getTime()) {
                        document.querySelector(".subuh-ikon").classList.add("aktif");
                    } else if (now.getTime() === waktuDzuhur.getTime()) {
                        document.querySelector(".dzuhur-ikon").classList.add("aktif");
                    } else if (now.getTime() === waktuAshar.getTime()) {
                        document.querySelector(".ashar-ikon").classList.add("aktif");
                    } else if (now.getTime() === waktuMaghrib.getTime()) {
                        document.querySelector(".maghrib-ikon").classList.add("aktif");
                    } else if (now.getTime() === waktuIsya.getTime()) {
                        document.querySelector(".isya-ikon").classList.add("aktif");
                    }
                }
            })
            .catch(error => console.error("Gagal mengambil data jadwal:", error));
    }

    pilihKota.addEventListener('change', () => {
        tampilkanJadwal(pilihKota.value, new Date());
    });

    pilihTanggal.addEventListener('change', () => {
        tampilkanJadwal(pilihKota.value, new Date(pilihTanggal.value));
    });

    document.addEventListener('DOMContentLoaded', () => {
        tampilkanJadwal(pilihKota.value, new Date());
        setInterval(() => {
            const now = new Date();
            document.getElementById("jam-menit-detik").textContent = now.toLocaleTimeString('id-ID');
        }, 1000);
    });
