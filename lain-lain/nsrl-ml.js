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

// 2 jalur
const jalur = {
      111: [0], // Anggota 111 hanya bisa akses link 1
      222: [1], // Anggota 222 hanya bisa akses link 2
      333: [2], // Anggota 333 hanya bisa akses link 3
    };