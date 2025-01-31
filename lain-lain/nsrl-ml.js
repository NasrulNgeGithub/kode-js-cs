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