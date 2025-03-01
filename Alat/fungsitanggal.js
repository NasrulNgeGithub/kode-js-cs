(function () {
  const kalender = document.getElementById("kalender");
  const bulanTahun = document.getElementById("bulan-tahun");
  const badanKalender = document.getElementById("badan-kalender");
  const daftarKegiatan = document.getElementById("daftar-kegiatan");
  const daftarAgenda = document.getElementById("daftar-agenda");
  const prevBulan = document.getElementById("prev-bulan");
  const nextBulan = document.getElementById("next-bulan");
  let tanggal = new Date();
  let bulan = tanggal.getMonth();
  let tahun = tanggal.getFullYear();
  let kegiatanTanggal = [];
  let agendaTanggal = [];

  function buatKalender(tahun, bulan) {
    console.log("Membuat kalender untuk:", tahun, bulan);
    bulanTahun.textContent = new Date(tahun, bulan).toLocaleString("id-ID", {
      month: "long",
      year: "numeric",
    });
    badanKalender.innerHTML = "";
    const hariPertama = new Date(tahun, bulan, 1).getDay();
    const jumlahHari = new Date(tahun, bulan + 1, 0).getDate();
    let hari = 0;
    let baris = document.createElement("tr");
    for (let i = 0; i < hariPertama; i++) {
      baris.appendChild(document.createElement("td"));
      hari++;
    }
    for (let i = 1; i <= jumlahHari; i++) {
      const sel = document.createElement("td");
      sel.textContent = i;
      const tanggalHariIni = new Date();
      const tanggalSel = `${tahun}-${(bulan + 1)
        .toString()
        .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;

      if (
        tahun === tanggalHariIni.getFullYear() &&
        bulan === tanggalHariIni.getMonth() &&
        i === tanggalHariIni.getDate()
      ) {
        sel.classList.add("hari-ini");
        tampilkanKeteranganOtomatis(tanggalSel); // Tampilkan keterangan otomatis
      }

      if (hariLibur[tanggalSel] && !sel.classList.contains("hari-ini")) {
        sel.classList.add("hari-libur");
        sel.addEventListener("click", (event) => {
          event.stopPropagation();
          tampilkanHariLibur(tanggalSel);
        });
      }

      if (kegiatanTanggal.includes(tanggalSel)) {
        sel.classList.add("ada-kegiatan");
      }
      if (agendaTanggal.includes(tanggalSel)) {
        sel.classList.add("ada-agenda");
      }

      sel.addEventListener("click", (event) => {
        if (!hariLibur[tanggalSel]) {
          event.stopPropagation();
          setTimeout(() => {
            console.log("Kegiatan diklik:", tanggalSel);
            tampilkanKegiatan(tahun, bulan, i, "Kegiatan");
          }, 10);
        }
      });

      sel.addEventListener("click", (event) => {
        if (!hariLibur[tanggalSel]) {
          event.stopPropagation();
          setTimeout(() => {
            console.log("Agenda diklik:", tanggalSel);
            tampilkanKegiatan(tahun, bulan, i, "Agenda");
          }, 10);
        }
      });

      baris.appendChild(sel);
      hari++;
      if (hari % 7 === 0) {
        badanKalender.appendChild(baris);
        baris = document.createElement("tr");
      }
      if (hari % 7 === 6 && !sel.classList.contains("hari-ini")) {
        sel.style.fontWeight = "bold";
        sel.style.color = "darkgreen";
      }
      if (hari % 7 === 1 && !sel.classList.contains("hari-ini")) {
        sel.style.fontWeight = "bold";
        sel.style.color = "red";
        sel.style.backgroundColor = "pink";
      }
    }
    badanKalender.appendChild(baris);
    ambilAgenda();
  }

  function tampilkanKegiatan(tahun, bulan, hari, label) {
    const tanggalKegiatan = `${tahun}-${(bulan + 1)
      .toString()
      .padStart(2, "0")}-${hari.toString().padStart(2, "0")}`;
    const url = `/feeds/posts/default/-/` + label + `?alt=json`;
    console.log("URL Feed:", url);
    fetch(url)
      .then((response) => {
        console.log("Status Response:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Data Feed:", data);
        const daftar = document.getElementById(`daftar-${label.toLowerCase()}`);
        daftar.innerHTML = "";
        data.feed.entry.forEach((entry) => {
          const tanggalPostingan = entry.published.$t.substring(0, 10);
          console.log("Tanggal Postingan:", tanggalPostingan);
          if (tanggalPostingan === tanggalKegiatan) {
            const postingan = document.createElement("div");
            postingan.className = "postingan";
            const link = entry.link.find((l) => l.rel === "alternate");
            const urlPostingan = link ? link.href : "#";
            const tautan = document.createElement("a");
            tautan.href = urlPostingan;
            tautan.textContent = entry.title.$t;
            postingan.appendChild(tautan);
            daftar.appendChild(postingan);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching feed:", error);
        const daftar = document.getElementById(`daftar-${label.toLowerCase()}`);
        daftar.innerHTML = `Gagal mengambil data ${label}.`;
      });
  }

  function ambilKegiatan() {
    const label = "Kegiatan";
    const url = `/feeds/posts/default/-/` + label + `?alt=json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        kegiatanTanggal = data.feed.entry.map(
          (entry) => entry.published.$t.substring(0, 10)
        );
        buatKalender(tahun, bulan);
      })
      .catch((error) => {
        console.error("Error fetching feed:", error);
      });
  }

  function ambilAgenda() {
    const label = "Agenda";
    const url = `/feeds/posts/default/-/` + label + `?alt=json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        agendaTanggal = data.feed.entry.map(
          (entry) => entry.published.$t.substring(0, 10)
        );
        buatKalender(tahun, bulan);
      })
      .catch((error) => {
        console.error("Error fetching feed:", error);
      });
  }

  function tampilkanHariLibur(tanggal) {
    const keterangan = hariLibur[tanggal];
    if (keterangan) {
      const daftar = document.getElementById("daftar-kegiatan"); // Atau daftar-agenda, sesuaikan kebutuhan
      daftar.innerHTML = `<div class="postingan">${keterangan}</div>`;
    }
  }

  function tampilkanKeteranganOtomatis(tanggal) {
    const daftar = document.getElementById("daftar-kegiatan");
    daftar.innerHTML = "";

    if (hariLibur[tanggal]) {
      daftar.innerHTML += `<div class="postingan">${hariLibur[tanggal]}</div>`;
    }

    if (kegiatanTanggal.includes(tanggal)) {
      tampilkanKegiatan(
        parseInt(tanggal.substring(0, 4)),
        parseInt(tanggal.substring(5, 7)) - 1,
        parseInt(tanggal.substring(8, 10)),
        "Kegiatan"
      );
    }

    if (agendaTanggal.includes(tanggal)) {
      tampilkanKegiatan(
        parseInt(tanggal.substring(0, 4)),
        parseInt(tanggal.substring(5, 7)) - 1,
        parseInt(tanggal.substring(8, 10)),
        "Agenda"
      );
    }
  }
  
  prevBulan.addEventListener("click", () => {
    bulan--;
    if (bulan < 0) {
      bulan = 11;
      tahun--;
    }
    buatKalender(tahun, bulan);
  });

  nextBulan.addEventListener("click", () => {
    bulan++;
    if (bulan > 11) {
      bulan = 0;
      tahun++;
    }
    buatKalender(tahun, bulan);
  });

  ambilKegiatan();
  ambilAgenda();
})();
