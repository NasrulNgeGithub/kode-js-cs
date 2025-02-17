// nsrol
function nsrol(index) {
  const lyberno = prompt('Masukkan nomor anggota Perpustakaan Anda:');
  if (lybrno.includes(Number(lyberno))) {
    window.location.href = nptnsrdr[index];
  } else {
    if (confirm('Nomor Anggota Perpustakaan yang Anda masukkan tidak terdaftar. Apakah Anda ingin mendaftar anggota atau tetap di halaman ini?')) {
      // Redirect ke halaman pendaftaran
      window.location.href = '/p/daftar-anggota-perpustakaan.html';
    } else {
      alert('Anda tetap berada di halaman ini.');
    }
  }
}

//NonAktifkanTombol
const nmrAnggtInpt = document.getElementById('nmranggt');
const errorMessage = document.getElementById('error-message');
const toMailLink = document.getElementById('to_mail');
const toWaLink = document.getElementById('to_wa');

// Simpan href asli kedua tombol
const originalHrefMail = toMailLink.href;
const originalHrefWa = toWaLink.href;

nmrAnggtInpt.addEventListener('input', function() {
  const inputValue = parseInt(this.value);

  if (lybrno.includes(inputValue)) {
    errorMessage.style.display = 'none';
    toMailLink.classList.remove('disabled');
    toWaLink.classList.remove('disabled');
    toMailLink.href = originalHrefMail; // Kembalikan href
    toWaLink.href = originalHrefWa; // Kembalikan href
  } else {
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'Nomor anggota yang Anda masukkan tidak terdaftar. Apakah Anda ingin mendaftar anggota atau tetap di halaman ini?';

    errorMessage.innerHTML = '';
    const daftarButton = document.createElement('button');
    daftarButton.textContent = 'Daftar';
    daftarButton.addEventListener('click', function() {
      window.location.href = '/p/daftar-anggota-perpustakaan.html';
    });
    errorMessage.appendChild(daftarButton);

    const tetapButton = document.createElement('button');
    tetapButton.textContent = 'Tutup';
    tetapButton.addEventListener('click', function() {
      errorMessage.style.display = 'none';
    });
    errorMessage.appendChild(tetapButton);

    toMailLink.classList.add('disabled');
    toWaLink.classList.add('disabled');

    // Mencegah aksi default link dengan javascript:void(0);
    toMailLink.href = 'javascript:void(0);'; 
    toWaLink.href = 'javascript:void(0);';
  }
});


// 2 jalur
const jalur = {
      196500150002: [0],
      197500250001: [1],
      197800380002: [2],
      198400440003: [3],
      198500550005: [4],
      198700670001: [5],
      198900790004: [6],
      198800880001: [7],
      198800980002: [8],
      199501050003: [9],
      200001100001: [10],
      200001200002: [11],
      199501350002: [12],
      198601460002: [13],
      198901590004: [14],
      197701670002: [15],
      198401740002: [16],
    };