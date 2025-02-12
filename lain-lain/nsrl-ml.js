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