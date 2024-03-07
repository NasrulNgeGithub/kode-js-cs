Data Provinsi, Kabupaten, Kecamatan, dan Kelurahan/Desa di Indonesia dalam bentuk json
------------------------------------------------------------------------

Data disini hanya untuk memudahkan membuat autocomplete di aplikasi yang saya buat, tidak cocok untuk ajax, karena ada proteksi ajax beda domain.

----------


Struktur data
-------------
> - provinsi.json
> - kabupaten/[id provinsi].json
> - kecamatan/[id kabupaten].json
> - kelurahan/[id kecamatan].json


struktur **id** Kabupaten diawali dengan **id** Provinsi.

struktur **id** Kecamatan diawali dengan **id** Provinsi dan **id** Kabupaten.

struktur **id** Kelurahan diawali dengan **id** Provinsi, **id** Kabupaten, dan **id** Kecamatan.

total ada 91.219 data.


Contoh Penggunaan
-------------
Untuk contoh cara pakai menggunakan select2 cek berkas [contoh.html](https://github.com/NasrulNgeGithub/kode-js-cs/blob/master/daerah/contoh.html)


Demo
-------------
Untuk demo implementasi bisa dilihat disini: [Demo](https://nasrulngegithub.github.io/kode-js-cs/daerah/contoh.html)

### Support NasrulNgeGithub

[<img src="https://" width="128">](https://)
[<img src="https://" width="120">](https://)
