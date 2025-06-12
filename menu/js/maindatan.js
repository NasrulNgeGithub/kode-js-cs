//maindatan
document.addEventListener('DOMContentLoaded', () => {
    const yearSelect = document.getElementById('year-select');
    const studentSelectionDiv = document.getElementById('student-selection');
    const studentSelect = document.getElementById('student-select');
    const subjectSelectionDiv = document.getElementById('subject-selection');
    const subjectSelect = document.getElementById('subject-select');
    const studentDetailsDiv = document.getElementById('student-details');

    // --- OBJEK KONFIGURASI TAHUNAN ---
    const yearConfigurations = {
        '2024': {
            maxSemester: 6, // Rata-rata hingga semester 6
            kogWeight: 0.50, // 50% Rata-rata Kog
            nusWeight: 0.50  // 50% Nilai Ujian Sekolah
        },
        '2025': {
            maxSemester: 5, // Rata-rata hingga semester 5
            kogWeight: 0.70, // 70% Rata-rata Kog
            nusWeight: 0.30  // 30% Nilai Ujian Sekolah
        },
        // Tambahkan konfigurasi untuk tahun 2026 dan seterusnya di sini
        '2026': { // Contoh konfigurasi untuk tahun 2026
            maxSemester: 6,
            kogWeight: 0.60,
            nusWeight: 0.40
        },
    };

    // Konfigurasi default jika tahun tidak ditemukan dalam yearConfigurations
    const defaultConfiguration = {
        maxSemester: 5,
        kogWeight: 0.60,
        nusWeight: 0.40
    };

    // Variabel global untuk menyimpan data siswa yang sedang aktif
    let currentStudentsData = []; // Akan menyimpan array siswa untuk tahun yang dipilih
    let currentSelectedStudent = null;

    // --- FUNGSI PERHITUNGAN (Sudah benar, tidak perlu diubah lagi) ---

    function calculateKogAvgBySubject(studentGrades, subjectName, year) {
        const config = yearConfigurations[year] || defaultConfiguration;
        let totalKog = 0;
        let count = 0;
        let maxSemester = config.maxSemester;

        for (let i = 1; i <= maxSemester; i++) {
            const semesterKey = `s${i}`;
            if (studentGrades[semesterKey] && studentGrades[semesterKey][subjectName]) {
                totalKog += studentGrades[semesterKey][subjectName].kog;
                count++;
            }
        }
        return count > 0 ? (totalKog / count).toFixed(2) : 'N/A';
    }

    function getNusBySubject(nusGrades, subjectName) {
        if (nusGrades && typeof nusGrades === 'object' && nusGrades[subjectName] !== undefined) {
            return parseFloat(nusGrades[subjectName]).toFixed(2);
        }
        return 'N/A';
    }

    function calculateNilaiSekolahBySubject(avgKogBySubject, nusBySubject, year) {
        if (avgKogBySubject === 'N/A' || nusBySubject === 'N/A') {
            return 'N/A';
        }
        const config = yearConfigurations[year] || defaultConfiguration;
        const avg = parseFloat(avgKogBySubject);
        const nus = parseFloat(nusBySubject);

        const nilaiSekolah = (avg * config.kogWeight) + (nus * config.nusWeight);
        return nilaiSekolah.toFixed(2);
    }

    function calculateKogAvgOverall(studentGrades, year) {
        const config = yearConfigurations[year] || defaultConfiguration;
        let totalKog = 0;
        let count = 0;
        let maxSemester = config.maxSemester;

        for (let i = 1; i <= maxSemester; i++) {
            const semesterGrades = studentGrades[`s${i}`];
            if (semesterGrades) {
                for (const subject in semesterGrades) {
                    if (semesterGrades[subject].kog !== undefined) { // Pastikan kog ada
                         totalKog += semesterGrades[subject].kog;
                         count++;
                    }
                }
            }
        }
        return count > 0 ? (totalKog / count).toFixed(2) : 'N/A';
    }

    function calculateNusOverall(nusGrades) {
        if (typeof nusGrades !== 'object' || Object.keys(nusGrades).length === 0) {
            return 'N/A';
        }
        let totalNus = 0;
        let count = 0;
        for (const subject in nusGrades) {
            if (nusGrades[subject] !== undefined && !isNaN(nusGrades[subject])) { // Pastikan nilai adalah angka
                totalNus += nusGrades[subject];
                count++;
            }
        }
        return count > 0 ? (totalNus / count).toFixed(2) : 'N/A';
    }

    function calculateNilaiSekolahOverall(avgKogOverall, nusOverall, year) {
        if (avgKogOverall === 'N/A' || nusOverall === 'N/A') {
            return 'N/A';
        }
        const config = yearConfigurations[year] || defaultConfiguration;
        const avg = parseFloat(avgKogOverall);
        const nus = parseFloat(nusOverall);

        const nilaiSekolah = (avg * config.kogWeight) + (nus * config.nusWeight);
        return nilaiSekolah.toFixed(2);
    }

    // --- EVENT LISTENERS (MODIFIKASI PENTING DI SINI) ---

    yearSelect.addEventListener('change', async (event) => { // Tambahkan 'async' di sini
        const selectedYear = event.target.value;
        studentSelect.innerHTML = '<option value="">-- Pilih Siswa --</option>';
        subjectSelect.innerHTML = '<option value="">-- Pilih Mata Pelajaran --</option>';
        studentSelectionDiv.style.display = 'none';
        subjectSelectionDiv.style.display = 'none';
        studentDetailsDiv.style.display = 'none';
        currentSelectedStudent = null;
        currentStudentsData = []; // Reset data siswa saat tahun berubah

        if (selectedYear) {
            try {
                // URL dasar hosting file JSON Anda (PASTIKAN INI BERAKHIR DENGAN GARIS MIRING '/')
                const BASE_JSON_URL = 'https://nasrulngegithub.github.io/kode-js-cs/media/datan/'; 
                
                const response = await fetch(`${BASE_JSON_URL}students_${selectedYear}.json`);
                
                if (!response.ok) {
                    // Berikan pesan error yang lebih informatif jika file tidak ditemukan
                    if (response.status === 404) {
                        throw new Error(`File data students_${selectedYear}.json tidak ditemukan di server.`);
                    }
                    throw new Error(`Tidak dapat memuat data untuk tahun ${selectedYear}. Status: ${response.status}`);
                }
                currentStudentsData = await response.json(); // Data dimuat ke variabel ini

                // Mengisi dropdown siswa
                if (currentStudentsData.length > 0) {
                    currentStudentsData.forEach(student => {
                        const option = document.createElement('option');
                        option.value = student.id;
                        option.textContent = student.name;
                        studentSelect.appendChild(option);
                    });
                    studentSelectionDiv.style.display = 'block';
                } else {
                    console.warn(`Tidak ada data siswa ditemukan untuk tahun ${selectedYear}.`);
                    alert(`Tidak ada data siswa ditemukan untuk tahun ${selectedYear}.`);
                }
            } catch (error) {
                console.error("Error loading student data:", error);
                alert(`Gagal memuat data siswa: ${error.message}`);
            }
        } else {
            studentSelectionDiv.style.display = 'none';
        }
    });
	
    studentSelect.addEventListener('change', (event) => {
        const studentId = event.target.value;
        const selectedYear = yearSelect.value;
        subjectSelect.innerHTML = '<option value="">-- Pilih Mata Pelajaran --</option>';
        subjectSelectionDiv.style.display = 'none';
        studentDetailsDiv.style.display = 'none';
        currentSelectedStudent = null;

        // Cari siswa di 'currentStudentsData' yang sudah dimuat dari JSON
        if (studentId && selectedYear && currentStudentsData.length > 0) {
            const student = currentStudentsData.find(s => s.id === studentId);
            if (student) {
                currentSelectedStudent = student;
                currentSelectedStudent.year = selectedYear;

                let subjects = new Set();
                const config = yearConfigurations[selectedYear] || defaultConfiguration; // Ambil konfigurasi tahun
                const maxSemesterToConsider = Math.min(6, config.maxSemester); // Batasi hingga semester 6 atau maxSemester dari config

                for(let i = 1; i <= maxSemesterToConsider; i++) { // Iterasi hingga maxSemester yang relevan
                    const semesterKey = `s${i}`;
                    if (student.grades[semesterKey]) {
                        Object.keys(student.grades[semesterKey]).forEach(subject => {
                            subjects.add(subject);
                        });
                    }
                }
                
                if (student.grades.nus) {
                    Object.keys(student.grades.nus).forEach(subject => {
                        subjects.add(subject);
                    });
                }
                
                const sortedSubjects = Array.from(subjects).sort();

                sortedSubjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject;
                    option.textContent = subject;
                    subjectSelect.appendChild(option);
                });
                subjectSelectionDiv.style.display = 'block';
            }
        }
    });

    subjectSelect.addEventListener('change', (event) => {
        const selectedSubject = event.target.value;
        studentDetailsDiv.style.display = 'none';

        if (selectedSubject && currentSelectedStudent) {
            displayStudentSubjectGrades(currentSelectedStudent, selectedSubject, currentSelectedStudent.year);
        }
    });

    // --- FUNGSI TAMPILAN DETAIL (MODIFIED untuk menggunakan konfigurasi) ---
    function displayStudentSubjectGrades(student, subjectName, year) {
        const grades = student.grades;

        const config = yearConfigurations[year] || defaultConfiguration;

        const avgKogBySubject = calculateKogAvgBySubject(grades, subjectName, year);
        const nusBySubject = getNusBySubject(grades.nus, subjectName);
        const nilaiSekolahBySubject = calculateNilaiSekolahBySubject(avgKogBySubject, nusBySubject, year);

        const avgKogOverall = calculateKogAvgOverall(grades, year);
        const nusOverall = calculateNusOverall(grades.nus);
        const nilaiSekolahOverall = calculateNilaiSekolahOverall(avgKogOverall, nusOverall, year);

        let tableRows = '';
        // Sesuaikan loop semester agar hanya menampilkan hingga maxSemester dari konfigurasi
        for (let i = 1; i <= config.maxSemester; i++) { // Loop hingga maxSemester dari config
            const semesterKey = `s${i}`;
            const subjectGrades = grades[semesterKey] && grades[semesterKey][subjectName] ? grades[semesterKey][subjectName] : null;

            const kogDisplay = subjectGrades ? parseFloat(subjectGrades.kog).toFixed(2).replace('.', ',') : 'N/A';
            const psikDisplay = subjectGrades ? parseFloat(subjectGrades.psik).toFixed(2).replace('.', ',') : 'N/A';

            tableRows += `
                <tr>
                    <td>Semester ${i}</td>
                    <td>${kogDisplay}</td>
                    <td>${psikDisplay}</td>
                </tr>
            `;
        }

        const kogPercentage = `${(config.kogWeight * 100)}%`;
        const nusPercentage = `${(config.nusWeight * 100)}%`;
        let semesterRangeText;

        if (config.maxSemester === 6) {
            semesterRangeText = 'semester 1 sampai semester 6';
        } else if (config.maxSemester === 5) {
            semesterRangeText = 'semester 1 sampai semester 5';
        } else if (config.maxSemester === 4) {
            semesterRangeText = 'semester 1 sampai semester 4';
        } else {
            semesterRangeText = `semester 1 sampai semester ${config.maxSemester}`;
        }

        studentDetailsDiv.innerHTML = `
            <h3>Nilai Siswa: ${student.name}</h3>
            <div class="student-identity">
                <div class="identity-item"><span>NIS</span><span>:</span><span>${student.nis}</span></div>
                <div class="identity-item"><span>NISN</span><span>:</span><span>${student.nisn}</span></div>
                <div class="identity-item"><span>Kelas</span><span>:</span><span>${student.class}</span></div>
                <div class="identity-item"><span>Peminatan</span><span>:</span><span>${student.peminatan}</span></div>
            </div>
            <h4>Nilai Mata Pelajaran: ${subjectName}</h4>
            <table>
                <thead>
                    <tr>
                        <th rowspan="2">Semester</th>
                        <th colspan="2">Nilai Semester</th>
                    </tr>
                    <tr>
                        <th>Kog</th>
                        <th>Psik</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
            <div class="summary-grades">
                <div class="summary-item"><span>Rata-rata Kog ${semesterRangeText} (${subjectName})</span><span>:</span><span>${avgKogBySubject.replace('.', ',')}</span></div>
                <div class="summary-item"><span>Nilai Ujian Sekolah (${subjectName})</span><span>:</span><span>${nusBySubject.replace('.', ',')}</span></div>
                <div class="summary-item"><span><b>Nilai Sekolah (${subjectName})</b></span><span>:</span><span><b>${nilaiSekolahBySubject.replace('.', ',')}</b></span></div>
                <hr>
                <div class="summary-item"><span><b>Rata-rata Kog ${semesterRangeText} (Semua Mapel)</b></span><span>:</span><span><b>${avgKogOverall.replace('.', ',')}</b></span></div>
                <div class="summary-item"><span><b>Rata-rata Nilai Ujian Sekolah (Semua Mapel)</b></span><span>:</span><span><b>${nusOverall.replace('.', ',')}</b></span></div>
                <div class="summary-item"><span><b>Rata-rata Nilai Sekolah / IPK (Semua Mapel)</b></span><span>:</span><span><b>${nilaiSekolahOverall.replace('.', ',')}</b></span></div>
            </div>
            <div class="calculation-info">
                <h4>Keterangan Perolehan Nilai Sekolah (${subjectName}) Tahun ${year}:</h4>
                <p>Nilai Sekolah (${subjectName}) dihitung berdasarkan akumulasi:</p>
                <ul>
                    <li>**${kogPercentage}** dari rata-rata nilai "Kog" ${semesterRangeText} untuk mata pelajaran **${subjectName}**.</li>
                    <li>**${nusPercentage}** dari Nilai Ujian Sekolah untuk mata pelajaran **${subjectName}**.</li>
                </ul>
                <p>Rumus: (Rata-rata Nilai Kog ${semesterRangeText} ${subjectName} &times; ${config.kogWeight}) + (Nilai Ujian Sekolah ${subjectName} &times; ${config.nusWeight})</p>
                <br>
                <h4>Informasi Rata-rata Nilai Sekolah / IPK (Semua Mapel) Tahun ${year}:</h4>
                <p>Rata-rata Nilai Sekolah / IPK (Semua Mapel) dihitung berdasarkan akumulasi:</p>
                <ul>
                    <li>**${kogPercentage}** dari rata-rata nilai "Kog" ${semesterRangeText} dari **semua mata pelajaran**.</li>
                    <li>**${nusPercentage}** dari rata-rata Nilai Ujian Sekolah dari **semua mata pelajaran**.</li>
                </ul>
                <p>Rumus: (Rata-rata Nilai Kog ${semesterRangeText} (Semua Mapel) &times; ${config.kogWeight}) + (Rata-rata Nilai Ujian Sekolah (Semua Mapel) &times; ${config.nusWeight})</p>
            </div>
        `;
        studentDetailsDiv.style.display = 'block';
    }
});
