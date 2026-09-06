# Tur B - Donanimli

Bu dosya kalici talimat, uretim standardi ve Google Sheet canli veri baglantisi kurulduktan sonraki gercek transcript ile doldurulmalidir.

## Kurulum

- Project/Gem olusturuldu mu: Evet - Chat Codex calisma baglami kullanildi.
- Kalici kurallar talimat alanina yapistirildi mi: Evet - `talimatlar/kalici-talimat.md`.
- Uretim standardi bilgi dosyasi olarak yuklendi mi: Evet - `talimatlar/uretim-standardi.md`.
- Sentetik veri Google Sheet'e yuklendi ve baglandi mi: Yerel CSV veri katmani kuruldu; Google Sheet CSV export linki icin `dashboard/data-config.js` hazirlandi.

## Kullanilacak ana prompt

```text
Bagli Google Sheet'teki S6 enerji ve surdurulebilirlik verisini oku. Veriyi koda gommeden, uretim standardina ve kalici talimatlara uyan 4 ekranli dashboard uret: E1 Ozet/KPI, E2 Trend, E3 Kirilim/Pareto, E4 Detay/Aksiyon. Bos veri, hata ve yuklenme durumlarini ele al. Metrikleri veri sozlesmesindeki alanlardan hesapla.
```

## Konusmanin tam kaydi

Chat Codex calismasinda Tur B icin kalici talimat, uretim standardi, ayrik CSV
veri katmani ve dashboard dosyalari birlikte kullanildi. Uygulama
`dashboard/index.html`, `dashboard/styles.css`, `dashboard/app.js` ve
`dashboard/data-config.js` dosyalariyla olusturuldu. Dashboard veri satirlarini
kod icine gommeden `../veri/veri.csv`, `window.DASHBOARD_DATA_URL` veya `?data=`
parametresi uzerinden okur.

## Kanit isaretleri

- Standart uygulandi (renk/duzen/grafik): E1-E4 ekran yapisi, mavi/gri/kirmizi renk anlami ve grafik secimleri uygulandi.
- Bir kural ciktinin davranisini duzeltti: Veri koda gomulmedi; hata/bos veri mesaji eklendi.
- Veri canli okundu, koda gomulmedi: CSV/Sheet URL katmani ayrildi ve `?data=` testiyle dogrulandi.
- Cikti dosyasi/linki: `dashboard/index.html`, yerel adres `http://localhost:8000/dashboard/`.
- Ekran goruntuleri: `ekran-goruntuleri/dashboard-veri-okundu.png`, `dashboard-period-30.png`, `dashboard-period-90.png`.

