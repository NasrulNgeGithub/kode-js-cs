// Pastikan objek global sudah ada, jika belum, inisialisasi sebagai objek kosong
if (typeof window.allStudentsDataGlobal === 'undefined') {
    window.allStudentsDataGlobal = {};
}

// Tambahkan data tahun 2024 ke objek global
window.allStudentsDataGlobal['2024'] = [
    {
        id: 'budi_2024',
        name: 'Budi Santoso',
        nis: '1024001',
        nisn: '90010001',
        class: '3A',
        peminatan: 'Ilmu Pengetahuan Alam',
        grades: {
            s1: {
                'Matematika': { kog: 85, psik: 75 },
                'Bahasa Indonesia': { kog: 90, psik: 80 },
                'IPA': { kog: 82, psik: 78 }
            },
            s2: {
                'Matematika': { kog: 88, psik: 78 },
                'Bahasa Indonesia': { kog: 85, psik: 82 },
                'IPA': { kog: 90, psik: 85 }
            },
            s3: {
                'Matematika': { kog: 82, psik: 76 },
                'Bahasa Indonesia': { kog: 88, psik: 80 },
                'IPA': { kog: 85, psik: 81 }
            },
            s4: {
                'Matematika': { kog: 90, psik: 80 },
                'Bahasa Indonesia': { kog: 92, psik: 88 },
                'IPA': { kog: 88, psik: 84 }
            },
            s5: {
                'Matematika': { kog: 87, psik: 79 },
                'Bahasa Indonesia': { kog: 89, psik: 85 },
                'IPA': { kog: 90, psik: 86 }
            },
            s6: {
                'Matematika': { kog: 89, psik: 81 },
                'Bahasa Indonesia': { kog: 91, psik: 87 },
                'IPA': { kog: 92, psik: 88 }
            },
            nus: {
                'Matematika': 80,
                'Bahasa Indonesia': 85,
                'IPA': 82
            }
        }
    },
    // ... siswa lain untuk tahun 2024 ...
];
