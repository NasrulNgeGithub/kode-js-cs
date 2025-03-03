// 1. nptnsrdr
const nptnsrdr = ['https://docs.google.com/uc?export=download&id=1-vj04I9Fd9sMjKbgcRytPOKhXwZXQgq5', 'https://docs.google.com/uc?export=download&id=1d1fD5t5P7NAE1PTRC9EoW4FXqTz1hpIk', 'https://docs.google.com/uc?export=download&id=1ZJ58rbhULDIqhqnr5JANJSMqX1vkJdxn', 'https://docs.google.com/uc?export=download&id=158cX49a9GjxCqnSzHZfNIh7kptZWRNw6', 'https://docs.google.com/uc?export=download&id=1NGcxNkMDwMi8R-3-AeZahIE5yuVd5fHd', 'https://docs.google.com/uc?export=download&id=1nc4G03KoA0T7JDLd5zbq9nFGjbR0ywd2', 'https://docs.google.com/uc?export=download&id=1_zOaW_O0PnddL0xP8MlEmxYOPArjBlXJ', 'https://docs.google.com/uc?export=download&id=1KWY3KWmuZYxoy1g_weR_gtx-wp-Q5JfS', 'https://docs.google.com/uc?export=download&id=1M3gqywHVPFZE52lb13tRHVbuWuNpDjVS', 'https://docs.google.com/uc?export=download&id=1rLDIS0l6OZh7yA3fZrJsSpyIvwbzKGnS', 'https://docs.google.com/uc?export=download&id=1byxLPbcuA96j1gmDweOa1y9iRS8veLdY', 'https://docs.google.com/uc?export=download&id=1khH1WYae_ITp2KB_ICiFsI-pyJ1obYO5', 'https://docs.google.com/uc?export=download&id=1V3mvzu8uvnN5WSi0UGyS5pRKIWedkUDx'];

// 2 lybrnos
const lybrnos = [196500150002,197500250001,197800380002,198400440003,198500550005,198700670001,198900790004,198800880001,198800980002,199501050003,200001100001,200001200002,199501350002,198601460002,198901590004,197701670002,198401740002];

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
