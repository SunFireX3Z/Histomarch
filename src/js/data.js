/**
 * Marching Songs Database
 * Edit this file to add, modify, or update marching songs, audio URLs, images, and histories.
 *
 * imageUrl: optional path/URL to a thumbnail or related image for the song (used in catalog cards).
 * bannerUrl: optional path/URL to a larger banner image (used in the detailed history modal header).
 * Example values:
 *   imageUrl: "src/image/preussens_gloria.jpg"
 *   bannerUrl: "src/image/banner_preussens.jpg"
 */
const marchingSongs = [
  {
    id: "preussens-gloria",
    title: "Preußens Gloria",
    titleTranslation: "Prussia's Glory",
    composer: "Johann Gottfried Piefke",
    year: "1871",
    country: "Prussia / Germany",
    flagUrl: "https://flagcdn.com/w80/de.png",
    era: "Imperial Era (19th Century)",
    category: "Prussian Brass March",
    duration: "1:53",
    audioUrl: "src/audio/Preußens Gloria - Prussian March - Winds of Time.mp3", // User will fill this in (e.g. "src/audio/preussens_gloria.mp3")
    imageUrl: "src/image/A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_(3._Fassung_1885).jpg", // User will fill this image path in (e.g. "src/image/preussens_gloria.jpg")
    bannerUrl: "src/image/Flag_of_Prussia_(1892-1918).svg.png", // User will fill banner image path in
    shortDesc: "A triumphant Prussian military march composed after victory in the Franco-Prussian War, cementing German unification.",
    fullHistory: `Preußens Gloria (Armeemarsch II, 240) adalah lagu berbaris militer Prusia yang sangat terkenal dari abad ke-19, digubah oleh Johann Gottfried Piefke pada tahun 1871 setelah kemenangan Kerajaan Prusia dalam Perang Prancis-Prusia yang menyatukan negara-negara Jerman menjadi Kekaisaran Jerman.

Lagu ini awalnya ditulis untuk penampilan militer khusus dan tidak langsung dipublikasikan secara luas. Piefke hanya memainkannya pada acara-acara kemenangan besar. Partitur lagu ini sempat tersimpan dan terlupakan hingga awal abad ke-20 ketika diselamatkan dan dimasukkan ke dalam buku panduan musik militer Jerman.

Selama era Kekaisaran Jerman dan Perang Dunia I, lagu ini menjadi sangat populer sebagai simbol kegagahan militer Jerman. Setelah runtuhnya monarki, lagu ini tetap dipertahankan dan sekarang menjadi salah satu lagu baris-berbaris paling populer di dunia, yang secara teratur dimainkan oleh Bundeswehr (Angkatan Bersenjata Jerman modern) dalam upacara resmi (seperti Grosser Zapfenstreich) serta oleh berbagai korps musik militer internasional di seluruh dunia karena nadanya yang megah dan penuh semangat.`,
    lyrics: {
      original: "Instrumental (Tidak memiliki lirik resmi. Mengandalkan tiupan terompet tembaga dan perkusi drum yang megah).",
      translation: "Instrumental (No official lyrics. Relies on brass horns and powerful snare and bass drums to convey Prussian military discipline)."
    },
    facts: [
      "Digubah setelah penyatuan Jerman pada tahun 1871 setelah mengalahkan Kekaisaran Prancis Kedua.",
      "Komposer Johann Gottfried Piefke juga menggubah lagu terkenal lainnya seperti 'Königgrätzer Marsch'.",
      "Lagu ini sangat identik dengan langkah tegap ala Prusia (Gänseschritt / Goose-step) yang sangat disiplin.",
      "Populer secara global dan sering digunakan dalam parade militer di Chili, Rusia, hingga Inggris Raya."
    ]
  },
  {
    id: "british-grenadiers",
    title: "The British Grenadiers",
    titleTranslation: "Prajurit Grenadier Inggris",
    composer: "Traditional",
    year: "Abad ke-17 (Sekitar 1685-1700)",
    country: "Great Britain / UK",
    flagUrl: "https://flagcdn.com/w80/gb.png",
    era: "17th - 18th Century",
    category: "Regimental Quick March",
    duration: "1:57",
    audioUrl: "src/audio/The British Grenadiers (Best Version) - Squigy McWilliam.mp3", // User will fill this in
    imageUrl: "src/image/redcoats.jpg", // User will fill this in
    bannerUrl: "src/image/britishflag.jpg",
    shortDesc: "The historic regimental quick march of the British Army's elite Grenadier Guards, characterized by its iconic fife-and-drum melody.",
    fullHistory: `The British Grenadiers adalah lagu baris tradisional Inggris yang berasal dari akhir abad ke-17. Melodinya pertama kali tercatat dalam koleksi dansa cetak tahun 1680-an dengan nama 'The New Bath' atau 'The Granadeers March'. Liriknya ditambahkan kemudian, merayakan keberanian para prajurit pembawa granat (Grenadier) yang memimpin serangan garis depan dalam kepungan benteng pertahanan.

Grenadier adalah prajurit elit bertubuh tinggi besar yang bertugas melempar granat tangan awal yang berbahaya. Tugas mereka memerlukan keberanian luar biasa karena mereka harus mendekati benteng musuh di bawah hujan peluru untuk melempar granat. Lagu ini merayakan senjata legendaris mereka serta topi berbulu tinggi mereka (mitre caps/bearskins) yang dirancang agar mereka tampak lebih tinggi.

Lagu ini merupakan lagu baris resmi untuk beberapa resimen elit Angkatan Darat Britania Raya, terutama Grenadier Guards, Honourable Artillery Company, dan Royal Regiment of Fusiliers. Alat musik klasik fife (suling kayu militer) dan snare drum memberikan irama langkah cepat yang sangat khas bagi tentara berjas merah Britania Raya.`,
    lyrics: {
      original: `Some talk of Alexander, and some of Hercules
Of Hector and Lysander, and such great names as these.
But of all the world's great heroes, there's none that can compare
With a tow, row, row, row, row, row, to the British Grenadiers.

Those heroes of antiquity ne'er saw a cannon ball,
Or knew the force of powder to slay their foes withal.
But our brave boys do know it, and banish all their fears,
Sing tow, row, row, row, row, row, for the British Grenadiers!`,
      translation: `Ada yang membicarakan Alexander, dan ada yang Hercules
Tentang Hector dan Lysander, dan nama-nama besar lainnya.
Namun dari semua pahlawan besar dunia, tak ada yang bisa dibandingkan
Dengan ketukan genderang perang dari Prajurit Grenadier Inggris.

Para pahlawan kuno itu tidak pernah melihat bola meriam,
Atau tahu kekuatan bubuk mesiu untuk membunuh musuh-musuh mereka.
Namun anak-anak berani kita mengetahuinya, dan mengusir semua ketakutan mereka,
Bernyanyilah tow-row-row-row-row-row untuk Prajurit Grenadier Inggris!`
    },
    facts: [
      "Menggunakan irama ketukan cepat (Quickstep) sekitar 120 ketukan per menit.",
      "Para Grenadier awalnya mengenakan topi mitre berbentuk kerucut agar bisa dengan mudah menyampirkan senapan musket mereka saat bersiap melempar granat.",
      "Lagu ini sangat sering dimainkan dalam upacara tahunan terkenal 'Trooping the Colour' di London untuk merayakan ulang tahun Monarki Inggris.",
      "Melodi lagu ini sangat mudah dikenali dan sering muncul dalam budaya populer bertema kolonial Inggris."
    ]
  },
  {
    id: "yankee-doodle",
    title: "Yankee Doodle",
    titleTranslation: "Yankee Doodle",
    composer: "Traditional / Dr. Richard Shuckburgh",
    year: "Sekitar 1755 (Perang Prancis dan Indian)",
    country: "United States",
    flagUrl: "https://flagcdn.com/w80/us.png",
    era: "Revolutionary War Era",
    category: "Fife and Drum March",
    duration: "2:34",
    audioUrl: "src/audio/Yankee Doodle (Fife and Drum) - Vitor B. Macarthy.mp3", // User will fill this in
    imageUrl: "src/image/Surrender_of_Lord_Cornwallis.jpg", // User will fill this in
    bannerUrl: "src/image/AmeRevFlag.jpg",
    shortDesc: "A song originally sung by British officers to mock American colonists, which was proudly adopted by the Americans as a revolutionary anthem.",
    fullHistory: `Yankee Doodle adalah lagu patriotik Amerika Serikat yang berasal dari masa sebelum Perang Kemerdekaan Amerika. Menariknya, lagu ini awalnya diciptakan oleh tentara Britania Raya selama Perang Prancis dan Indian (sekitar tahun 1755) untuk mengejek para milisi kolonial Amerika yang mereka anggap tidak teratur, miskin, dan kurang berbudaya.

Kata 'Yankee' kemungkinan berasal dari bahasa Belanda 'Janke' (Yohanes kecil) yang digunakan sebagai ejekan, sedangkan 'Doodle' berarti orang bodoh atau pelupa. Lirik terkenal tentang menaruh bulu di topi dan menyebutnya 'Macaroni' merujuk pada gaya busana mewah ekstrem Eropa abad ke-18 yang disebut mode 'Macaroni'. Ejekan ini bermakna bahwa orang Amerika sangat terbelakang sehingga berpikir sebatang bulu di topi sudah cukup membuat mereka modis secara elit.

Namun, selama Perang Kemerdekaan Amerika (1775-1783), tentara kontinental Amerika di bawah George Washington justru membalikkan keadaan. Mereka mengambil lagu ejekan ini, menyanyikannya dengan bangga dalam pertempuran (seperti di Pertempuran Lexington and Concord), dan menggunakannya untuk mengejek balik tentara Inggris saat menyerah di Yorktown. Lagu ini pun bertransformasi dari lagu hinaan menjadi simbol pembangkangan dan kemenangan revolusioner yang abadi.`,
    lyrics: {
      original: `Yankee Doodle went to town
A-riding on a pony,
Stuck a feather in his cap
And called it macaroni.

Yankee Doodle keep it up,
Yankee Doodle dandy,
Mind the music and the step,
And with the girls be handy.`,
      translation: `Yankee Doodle pergi ke kota
Menunggangi seekor kuda poni,
Menancapkan sebatang bulu di topinya
Dan menyebutnya macaroni (gaya elit modis).

Yankee Doodle teruskanlah,
Yankee Doodle yang gagah,
Perhatikan musik dan langkah barismu,
Dan bersikap ramahlah kepada para gadis.`
    },
    facts: [
      "Lagu patriotik tertua yang masih populer di Amerika Serikat, mendahului lagu kebangsaan 'The Star-Spangled Banner'.",
      "Merupakan lagu resmi negara bagian Connecticut.",
      "Istilah 'Macaroni' dalam lagu ini tidak merujuk pada makanan pasta, melainkan pada perkumpulan pemuda modis di London yang berdandan sangat berlebihan.",
      "Saat tentara Inggris menyerah di Yorktown pada tahun 1781, tentara Amerika sengaja memainkan lagu ini sebagai bentuk sindiran kemenangan."
    ]
  },
  {
    id: "radetzky-march",
    title: "Radetzky-Marsch",
    titleTranslation: "Radetzky March",
    composer: "Johann Strauss I",
    year: "1848",
    country: "Austria",
    flagUrl: "https://flagcdn.com/w80/at.png",
    era: "Austrian Empire Era",
    category: "Orchestral Military March",
    duration: "3:25",
    audioUrl: "src/audio/Radetzky March - Austria Hungary - Winds of Time.mp3", // User will fill this in
    imageUrl: "src/image/AustroHungary1942_15_dbi298.jpg", // User will fill this in
    bannerUrl: "src/image/Austrohungary.png",
    shortDesc: "A lively Austrian military march dedicated to Field Marshal Joseph Radetzky von Radetz, famous for its audience-clapping tradition.",
    fullHistory: `Radetzky March (Op. 228) adalah lagu berbaris yang digubah oleh Johann Strauss I pada tahun 1848. Lagu ini didedikasikan untuk Marsekal Lapangan Austria Joseph Radetzky von Radetz setelah kemenangan militernya yang krusial dalam Pertempuran Custoza selama Revolusi 1848 di Italia.

Lagu ini memiliki ritme yang sangat dinamis, ceria, dan tidak terlalu bergaya agresi militer berat. Ketika lagu ini pertama kali dimainkan di depan para perwira militer Austria yang menang, mereka secara spontan bertepuk tangan dan mengentakkan kaki mengikuti irama refrainnya. Tradisi tepuk tangan ini berlanjut hingga hari ini.

Saat ini, Radetzky March sangat terkenal secara global karena menjadi lagu penutup tradisional dalam Konser Tahun Baru Vienna (Neujahrskonzert) oleh Vienna Philharmonic Orchestra. Konduktor konser akan berbalik menghadap penonton dan memimpin mereka bertepuk tangan berirama keras dan lembut sesuai ketukan dinamis yang dimainkan oleh orkestra. Lagu ini juga menjadi mars resmi bagi Resimen Kavaleri Lapis Baja ke-1 milik Angkatan Darat Britania Raya (karena kedekatan sejarah Austria-Inggris saat itu).`,
    lyrics: {
      original: "Instrumental (Tidak memiliki lirik vokal, namun interaksi tepuk tangan penonton bertindak sebagai ritme pengiring utama).",
      translation: "Instrumental (Contains no vocal lyrics. Instead, rhythmic audience clapping serves as the historical live accompaniment during performances)."
    },
    facts: [
      "Sangat terkenal dengan tradisi tepuk tangan interaktif penonton di bawah aba-aba konduktor konser.",
      "Meskipun bertema militer, melodinya sangat ceria dan sering diasosiasikan dengan perayaan Tahun Baru di seluruh dunia.",
      "Marsekal Radetzky, sosok yang menginspirasi lagu ini, adalah salah satu jenderal Austria paling berprestasi yang memimpin militer selama Perang Napoleon.",
      "Lagu ini digubah dalam kurun waktu hanya dua jam setelah berita kemenangan militer Austria tiba di Wina."
    ]
  },
  {
    id: "la-marseillaise",
    title: "La Marseillaise",
    titleTranslation: "Lagu Kota Marseille",
    composer: "Claude Joseph Rouget de Lisle",
    year: "1792",
    country: "France",
    flagUrl: "https://flagcdn.com/w80/fr.png",
    era: "French Revolution Era",
    category: "Revolutionary Anthem / March",
    duration: "4:20",
    audioUrl: "src/audio/First French Republic (1792-1804) La Marseillaise - Norwegian Baron.mp3", // User will fill this in
    imageUrl: "src/image/Pils_rouget_lisle_chantant_marseillaise_mb_(Musée).jpg", // User will fill this in
    bannerUrl: "src/image/frenchflag.jpg",
    shortDesc: "The revolutionary war song of the French Republic that became France's national anthem, known for its fiery lyrics and passionate drive.",
    fullHistory: `La Marseillaise digubah oleh Claude Joseph Rouget de Lisle di Strasbourg pada malam tanggal 25 April 1792, menyusul deklarasi perang Prancis terhadap Austria. Judul aslinya adalah 'Chant de guerre pour l'Armée du Rhin' (Lagu Perang untuk Angkatan Darat Rhine).

Lagu ini mendapatkan nama populernya ketika pasukan sukarelawan dari kota Marseille menyanyikannya di sepanjang jalan-jalan Paris saat mereka berbaris menuju ibu kota untuk membantu mempertahankan revolusi Prancis. Lirik lagu ini sangat emosional, revolusioner, dan agresif, menyerukan warga Prancis untuk mengangkat senjata melawan tirani raja-raja asing yang ingin menghancurkan republik baru mereka.

Konvensi Nasional mengadopsinya sebagai lagu kebangsaan Prancis pada tahun 1795. Lagu ini sempat dilarang selama masa Kekaisaran Napoleon dan Restorasi Bourbon karena dinilai terlalu provokatif dan revolusioner, sebelum akhirnya ditetapkan kembali secara permanen pada tahun 1879. Melodinya yang sangat kuat dan bernuansa mars heroik menjadikannya salah satu lagu kebangsaan paling ikonik dan berpengaruh dalam sejarah dunia, menginspirasi banyak gerakan pembebasan di negara lain.`,
    lyrics: {
      original: `Allons enfants de la Patrie,
Le jour de gloire est arrivé!
Contre nous de la tyrannie
L'étendard sanglant est levé.
Entendez-vous dans les campagnes
Mugir ces féroces soldats?
Ils viennent jusque dans vos bras
Égorger vos fils, vos compagnes!

Aux armes, citoyens! Formez vos bataillons!
Marchons, marchons! Qu'un sang impur abreuve nos sillons!`,
      translation: `Bangkitlah anak-anak Ibu Pertiwi,
Hari kemuliaan telah tiba!
Melawan kita tirani berdiri,
Bendera berdarah dikibarkan.
Apakah kau mendengar di pedesaan
Lolongan para prajurit kejam itu?
Mereka datang tepat ke hadapanmu
Untuk menggorok anak-anak dan istrimu!

Angkat senjata, warga negara! Bentuk batalionmu!
Mari berbaris, mari berbaris! Semoga darah kotor mengairi ladang kita!`
    },
    facts: [
      "Ditulis dalam waktu satu malam saja atas permintaan walikota Strasbourg yang menginginkan lagu patriotik untuk menyemangati pasukan.",
      "Melodinya dikutip oleh komposer besar Pyotr Ilyich Tchaikovsky dalam karya orkestra monumentalnya '1812 Overture' untuk menggambarkan invasi Prancis.",
      "Lirik 'darah kotor' (sang impur) merujuk pada darah rakyat biasa (non-bangsawan) yang rela berkorban demi membela tanah air dari tentara bangsawan asing.",
      "Menjadi inspirasi global bagi lagu-lagu revolusioner di berbagai negara pada abad ke-19 dan ke-20."
    ]
  },
  {
    id: "la-victoire-est-a-nous",
    title: "La Victoire est à Nous",
    titleTranslation: "Kemenangan adalah Milik Kita",
    composer: "Lorem Ipsum",
    year: "1234",
    country: "France",
    flagUrl: "https://flagcdn.com/w80/fr.png",
    era: "Lorem Ipsum Era",
    category: "Lorem Ipsum March",
    duration: "3:00",
    audioUrl: "src/audio/La Victoire est à Nous (Victory is ours) French Napoleonic Military March–Fanfare [HQ] - Mattia von Sigmund.mp3",
    imageUrl: "src/image/Napoleon.jpg",
    bannerUrl: "src/image/NapoleonFranceFlag.jpg",
    shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    fullHistory: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`,
    lyrics: {
      original: `Lorem ipsum dolor sit amet
Consectetur adipiscing elit
Sed do eiusmod tempor incididunt
Ut labore et dolore magna aliqua

Ut enim ad minim veniam
Quis nostrud exercitation ullamco
Laboris nisi ut aliquip ex ea
Commodo consequat duis aute irure`,
      translation: `Lorem ipsum dolor sit amet
Consectetur adipiscing elit
Sed do eiusmod tempor incididunt
Ut labore et dolore magna aliqua

Ut enim ad minim veniam
Quis nostrud exercitation ullamco
Laboris nisi ut aliquip ex ea
Commodo consequat duis aute irure`
    },
    facts: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "Nisi ut aliquip ex ea commodo consequat duis aute irure dolor."
    ]
  }
];

// Share database globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { marchingSongs };
} else {
  window.marchingSongs = marchingSongs;
}
