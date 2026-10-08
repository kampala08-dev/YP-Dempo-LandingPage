// Foto kegiatan terapi untuk bagian "Galeri Kegiatan" (urutan = urutan tampil).
// Berkas ada di public/galeri/<id>-480.webp, <id>-800.webp (grid) dan <id>-1800.webp (lightbox).
// w & h = ukuran asli foto, dipakai untuk rasio agar tata letak tidak bergeser saat foto dimuat.
// Jangan cantumkan nama, usia, atau diagnosis anak di caption/alt.

export const GALLERY = [
    {
        id: "dsc00577",
        w: 7028,
        h: 4688,
        caption: "Terapi Wicara dengan kartu gambar",
        alt: "Terapis berhijab dan berkacamata memperlihatkan kartu bergambar topi sambil mencontohkan gerak mulut kepada seorang anak yang duduk membelakangi kamera.",
    },
    {
        id: "dsc00092",
        w: 3894,
        h: 5103,
        caption: "Seru bergelantungan di flying fox",
        alt: "Seorang anak tertawa sambil bergelantungan pada pegangan cincin flying fox di ruang terapi, didampingi terapis berhijab yang tersenyum di belakangnya.",
    },
    {
        id: "dsc00157",
        w: 7008,
        h: 4672,
        caption: "Latihan motorik halus di meja",
        alt: "Terapis berhijab dan berkacamata duduk di samping seorang anak kecil di meja hijau dan membantunya memasang jepitan biru di tepi mangkuk merah, dengan rak berisi kotak-kotak alat di belakang.",
    },
    {
        id: "dsc00250",
        w: 3866,
        h: 5530,
        caption: "Melompati ban, digandeng terapis",
        alt: "Seorang anak melompat dari ban ke ban sambil bergandengan tangan dengan terapis berhijab di ruang terapi beralas matras hijau.",
    },
    {
        id: "dsc00101",
        w: 4672,
        h: 7008,
        caption: "Tos penyemangat bersama terapis",
        alt: "Terapis pria berbaju batik dan bermasker beradu telapak tangan (tos) dengan seorang anak yang tersenyum lebar di meja hijau, dengan rak warna-warni berisi kotak alat di belakang mereka.",
    },
    {
        id: "dsc00502",
        w: 7028,
        h: 4688,
        caption: "Latihan keseimbangan di ayunan papan",
        alt: "Seorang anak berdiri di atas ayunan papan sambil berpegangan pada tali, didampingi terapis berhijab yang tersenyum, dengan tangga tali, dinding panjat, dan rangka panjat berjaring di sekitarnya.",
    },
    {
        id: "dsc00541",
        w: 4688,
        h: 7028,
        caption: "Menyusun puzzle huruf kayu",
        alt: "Terapis berhijab dan berkacamata menunjuk kepingan puzzle huruf kayu di meja biru, sementara tangan seorang anak tampak di tepi gambar.",
    },
    {
        id: "dsc00498",
        w: 7028,
        h: 4688,
        caption: "Latihan melempar bola ke ring",
        alt: "Seorang anak bersiap melempar bola ke arah ring basket, didampingi terapis yang berdiri di belakangnya, sementara sebuah bola biru melayang di udara di ruang terapi beralas matras hijau.",
    },
    {
        id: "dsc00532",
        w: 4688,
        h: 7028,
        caption: "Belajar dengan kartu warna",
        alt: "Terapis pria berseragam kuning menunjukkan kartu-kartu warna di meja hijau kepada seorang anak yang duduk di seberangnya.",
    },
    {
        id: "dsc00076",
        w: 4672,
        h: 7008,
        caption: "Memanjat tangga tali, diawasi terapis",
        alt: "Seorang anak berdiri di tangga tali sambil mengangkat cincin ke arah palang di atasnya, sementara terapis berhijab di bawah memegangi tangga dan memperhatikannya.",
    },
    {
        id: "dsc00247",
        w: 2965,
        h: 4190,
        caption: "Melompati rintangan kecil",
        alt: "Seorang anak melompati deretan rintangan kecil berwarna kuning di ruang terapi beralas matras hijau, dengan bola terapi dan bantal besar di latar.",
    },
    {
        id: "dsc00402",
        w: 7008,
        h: 4672,
        caption: "Sesi pelatihan tim",
        alt: "Seorang pemateri duduk di atas bola terapi sambil menunjuk papan tulis kecil, di hadapan anggota tim yang duduk di atas matras.",
    },
];

export const gallerySrc = (item, width) => `/galeri/${item.id}-${width}.webp`;
