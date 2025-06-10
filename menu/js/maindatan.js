// maindata
document.addEventListener('DOMContentLoaded', () => {
    const yearSelect = document.getElementById('year-select');
    const studentSelectionDiv = document.getElementById('student-selection');
    const studentSelect = document.getElementById('student-select');
    const subjectSelectionDiv = document.getElementById('subject-selection');
    const subjectSelect = document.getElementById('subject-select');
    const studentDetailsDiv = document.getElementById('student-details');

    // Gabungkan data dari file terpisah
    // Pastikan studentsData2024 dan studentsData2025 sudah terdefinisi di scope global
    // karena file-file data dimuat sebelum main.js di index.html
    const allStudentsData = {
        '2024': typeof studentsData2024 !== 'undefined' ? studentsData2024 : [],
        '2025': typeof studentsData2025 !== 'undefined' ? studentsData2025 : [],
        // Tambahkan tahun lain di sini jika Anda membuat file data baru
        // '2026': typeof studentsData2026 !== 'undefined' ? studentsData2026 : [],
    };

    let currentSelectedStudent = null;

    // --- FUNGSI PERHITUNGAN (TETAP DI SINI KARENA SUDAH ADAPTIF TERHADAP TAHUN) ---

    function calculateKogS1toS5BySubject(studentGrades, subjectName) {
        let totalKog = 0;
        let count = 0;
        for (let i = 1; i <= 5; i++) {
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

    // Fungsi Nilai Sekolah per Mata Pelajaran (adaptif terhadap tahun)
    function calculateNilaiSekolahBySubject(avgKogBySubject, nusBySubject, year) {
        if (avgKogBySubject === 'N/A' || nusBySubject === 'N/A') {
            return 'N/A';
        }
        const avg = parseFloat(avgKogBySubject);
        const nus = parseFloat(nusBySubject);
        let nilaiSekolah;

        if (year === '2024') {
            nilaiSekolah = (avg * 0.50) + (nus * 0.50);
        } else if (year === '2025') {
            nilaiSekolah = (avg * 0.60) + (nus * 0.40);
        }
        // Tambahkan kondisi untuk tahun 2026 dan seterusnya di sini
        // else if (year === '2026') {
        //     nilaiSekolah = (avg * 0.X0) + (nus * 0.Y0);
        // }
        else {
            nilaiSekolah = (avg * 0.60) + (nus * 0.40); // Default
        }
        return nilaiSekolah.toFixed(2);
    }

    // Fungsi Rata-rata Kog Semester 1-5 OVERALL
    function calculateKogS1toS5Overall(studentGrades) {
        let totalKog = 0;
        let count = 0;
        for (let i = 1; i <= 5; i++) {
            const semesterGrades = studentGrades[`s${i}`];
            if (semesterGrades) {
                for (const subject in semesterGrades) {
                    totalKog += semesterGrades[subject].kog;
                    count++;
                }
            }
        }
        return count > 0 ? (totalKog / count).toFixed(2) : 'N/A';
    }

    // Fungsi Rata-rata Nilai Ujian Sekolah OVERALL
    function calculateNusOverall(nusGrades) {
        if (typeof nusGrades !== 'object' || Object.keys(nusGrades).length === 0) {
            return 'N/A';
        }
        let totalNus = 0;
        let count = 0;
        for (const subject in nusGrades) {
            totalNus += nusGrades[subject];
            count++;
        }
        return count > 0 ? (totalNus / count).toFixed(2) : 'N/A';
    }

    // Fungsi Perhitungan Nilai Sekolah OVERALL (adaptif terhadap tahun)
    function calculateNilaiSekolahOverall(avgKogOverall, nusOverall, year) {
        if (avgKogOverall === 'N/A' || nusOverall === 'N/A') {
            return 'N/A';
        }
        const avg = parseFloat(avgKogOverall);
        const nus = parseFloat(nusOverall);
        let nilaiSekolah;

        if (year === '2024') {
            nilaiSekolah = (avg * 0.50) + (nus * 0.50);
        } else if (year === '2025') {
            nilaiSekolah = (avg * 0.60) + (nus * 0.40);
        }
        // Tambahkan kondisi untuk tahun 2026 dan seterusnya di sini
        // else if (year === '2026') {
        //     nilaiSekolah = (avg * 0.X0) + (nus * 0.Y0);
        // }
        else {
            nilaiSekolah = (avg * 0.60) + (nus * 0.40); // Default
        }
        return nilaiSekolah.toFixed(2);
    }

    // --- EVENT LISTENERS (Modifikasi studentsData menjadi allStudentsData) ---

    yearSelect.addEventListener('change', (event) => {
        const selectedYear = event.target.value;
        studentSelect.innerHTML = '<option value="">-- Pilih Siswa --</option>';
        subjectSelect.innerHTML = '<option value="">-- Pilih Mata Pelajaran --</option>';
        studentSelectionDiv.style.display = 'none';
        subjectSelectionDiv.style.display = 'none';
        studentDetailsDiv.style.display = 'none';
        currentSelectedStudent = null;

        if (selectedYear && allStudentsData[selectedYear]) { // Menggunakan allStudentsData
            const students = allStudentsData[selectedYear]; // Menggunakan allStudentsData
            students.forEach(student => {
                const option = document.createElement('option');
                option.value = student.id;
                option.textContent = student.name;
                studentSelect.appendChild(option);
            });
            studentSelectionDiv.style.display = 'block';
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

        if (studentId && selectedYear && allStudentsData[selectedYear]) { // Menggunakan allStudentsData
            const student = allStudentsData[selectedYear].find(s => s.id === studentId); // Menggunakan allStudentsData
            if (student) {
                currentSelectedStudent = student;
                currentSelectedStudent.year = selectedYear;

                let subjects = [];
                for(let i=1; i<=6; i++) {
                    if (student.grades[`s${i}`]) {
                        subjects = Object.keys(student.grades[`s${i}`]);
                        break;
                    }
                }
                
                subjects.forEach(subject => {
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

    // --- FUNGSI TAMPILAN DETAIL (Sama seperti sebelumnya) ---

    function displayStudentSubjectGrades(student, subjectName, year) {
        const grades = student.grades;

        const avgKogBySubject = calculateKogS1toS5BySubject(grades, subjectName);
        const nusBySubject = getNusBySubject(grades.nus, subjectName);
        const nilaiSekolahBySubject = calculateNilaiSekolahBySubject(avgKogBySubject, nusBySubject, year);

        const avgKogOverall = calculateKogS1toS5Overall(grades);
        const nusOverall = calculateNusOverall(grades.nus);
        const nilaiSekolahOverall = calculateNilaiSekolahOverall(avgKogOverall, nusOverall, year);


        let tableRows = '';
        for (let i = 1; i <= 6; i++) {
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

        let kogPercentage;
        let nusPercentage;
        if (year === '2024') {
            kogPercentage = '50%';
            nusPercentage = '50%';
        } else if (year === '2025') {
            kogPercentage = '60%';
            nusPercentage = '40%';
        }
        // Tambahkan kondisi untuk tahun 2026 dan seterusnya di sini
        // else if (year === '2026') {
        //     kogPercentage = 'X%';
        //     nusPercentage = 'Y%';
        // }
        else {
            kogPercentage = '60%'; // Default
            nusPercentage = '40%'; // Default
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
                <div class="summary-item"><span>Rata-rata Kog Smt 1-5 (${subjectName})</span><span>:</span><span>${avgKogBySubject.replace('.', ',')}</span></div>
                <div class="summary-item"><span>Nilai Ujian Sekolah (${subjectName})</span><span>:</span><span>${nusBySubject.replace('.', ',')}</span></div>
                <div class="summary-item"><span><b>Nilai Sekolah (${subjectName})</b></span><span>:</span><span><b>${nilaiSekolahBySubject.replace('.', ',')}</b></span></div>
                <hr>
                <div class="summary-item"><span><b>Rata-rata Kog Smt 1-5 (Semua Mapel)</b></span><span>:</span><span><b>${avgKogOverall.replace('.', ',')}</b></span></div>
                <div class="summary-item"><span><b>Rata-rata Nilai Ujian Sekolah (Semua Mapel)</b></span><span>:</span><span><b>${nusOverall.replace('.', ',')}</b></span></div>
                <div class="summary-item"><span><b>Nilai Sekolah (Overall)</b></span><span>:</span><span><b>${nilaiSekolahOverall.replace('.', ',')}</b></span></div>
            </div>
            <div class="calculation-info">
                <h4>Keterangan Perolehan Nilai Sekolah (${subjectName}) Tahun ${year}:</h4>
                <p>Nilai Sekolah (${subjectName}) dihitung berdasarkan akumulasi:</p>
                <ul>
                    <li>**${kogPercentage}** dari rata-rata nilai "Kog" semester 1 sampai semester 5 untuk mata pelajaran **${subjectName}**.</li>
                    <li>**${nusPercentage}** dari Nilai Ujian Sekolah untuk mata pelajaran **${subjectName}**.</li>
                </ul>
                <p>Rumus: (Rata-rata Nilai Kog Smt 1-5 ${subjectName} &times; ${parseFloat(kogPercentage)/100}) + (Nilai Ujian Sekolah ${subjectName} &times; ${parseFloat(nusPercentage)/100})</p>
                <br>
                <h4>Informasi Nilai Sekolah (Overall) Tahun ${year}:</h4>
                <p>Nilai Sekolah (Overall) dihitung berdasarkan akumulasi:</p>
                <ul>
                    <li>**${kogPercentage}** dari rata-rata nilai "Kog" semester 1 sampai semester 5 dari **semua mata pelajaran**.</li>
                    <li>**${nusPercentage}** dari rata-rata Nilai Ujian Sekolah dari **semua mata pelajaran**.</li>
                </ul>
                <p>Rumus: (Rata-rata Nilai Kog Smt 1-5 (Semua Mapel) &times; ${parseFloat(kogPercentage)/100}) + (Rata-rata Nilai Ujian Sekolah (Semua Mapel) &times; ${parseFloat(nusPercentage)/100})</p>
            </div>
        `;
        studentDetailsDiv.style.display = 'block';
    }
});