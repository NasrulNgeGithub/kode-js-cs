// 1. nptnsrdr
const nptnsrdr = ['https://docs.google.com/uc?export=download&id=1-vj04I9Fd9sMjKbgcRytPOKhXwZXQgq5', 'https://docs.google.com/uc?export=download&id=1d1fD5t5P7NAE1PTRC9EoW4FXqTz1hpIk', 'https://docs.google.com/uc?export=download&id=1ZJ58rbhULDIqhqnr5JANJSMqX1vkJdxn', 'https://docs.google.com/uc?export=download&id=158cX49a9GjxCqnSzHZfNIh7kptZWRNw6', 'https://docs.google.com/uc?export=download&id=1NGcxNkMDwMi8R-3-AeZahIE5yuVd5fHd', 'https://docs.google.com/uc?export=download&id=1nc4G03KoA0T7JDLd5zbq9nFGjbR0ywd2', 'https://docs.google.com/uc?export=download&id=1_zOaW_O0PnddL0xP8MlEmxYOPArjBlXJ'];

// 2 lybrnos
const lybrnos = [111, 222, 333, 444];

// 2 nsrols
function nsrols(index) {
      const lybernos = prompt('Masukkan nomor anggota Anda:');
      if (lybrnos.includes(Number(lybernos)) && jalur[lybernos].includes(index)) {
        // Tampilkan popup yang sesuai
        document.querySelectorAll('.tunjukkan').forEach(div => div.style.display = 'none');
        document.getElementById(`tampilan${index+1}`).style.display = 'block';
      } else {
        alert('Nomor anggota tidak valid atau Anda tidak memiliki akses.');
      }
    }

    function tutupPopup() {
      document.querySelectorAll('.tunjukkan').forEach(div => div.style.display = 'none');
    }
