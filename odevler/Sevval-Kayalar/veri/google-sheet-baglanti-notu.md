# Google Sheet Canli Veri Baglanti Notu

Bu dosya 3.5 Canli Veri - Connector / MCP kaniti icin hazirlandi.

## Hazirlik

1. `veri/veri.csv` dosyasini Google Drive'a yukleyin.
2. Dosyayi Google Sheets olarak acin.
3. Chat Codex kullanirken Google Sheet'i CSV export linki veya bagli veri kaynagi olarak kullanin.
4. Tur B'de veriyi kopyala-yapistir yapmadan, bagli Sheet/CSV kaynagindan okutun.

## Tur B icin kullanilacak ifade

```text
Bagli Google Sheet'teki S6 enerji ve surdurulebilirlik verisini oku. Veriyi
koda gommeden dashboard'u bu kaynaktan uret. Sheet'teki veri degistiginde ayni
dashboard metrikleri tek istekle guncellenebilmeli.
```

## Dashboard'u Google Sheet CSV ile calistirma

Google Sheet'i CSV olarak yayinlarsaniz `dashboard/data-config.js` icindeki
`window.DASHBOARD_DATA_URL` alanina CSV export linkini yazabilirsiniz. Normal
Google Sheets "Paylas" linki bazen dashboard tarafindan okunmaz; degerlendirme
icin en guvenli format `.../pub?output=csv` ile biten yayina alinmis CSV linkidir.

Alternatif olarak URL parametresi kullanabilirsiniz:

```text
http://localhost:8000/dashboard/?data=GERCEK_CSV_EXPORT_LINKI
```

Not: Linki URL parametresiyle kullanirken `&` karakterleri varsa link
tarayici tarafindan bolunebilir. Bu durumda en saglam yontem linki
`dashboard/data-config.js` icindeki tirnaklarin arasina yazmaktir.

## Kanit ekran goruntuleri

- `dashboard-veri-okundu.png`: Yerel CSV veri katmaninin okundugunu gosterir.
- `dashboard-placeholder-link-duzeldi.png`: Ornek link girilse bile dashboard'un hata vermeden yerel veriye dondugunu gosterir.
- `dashboard-google-link-fallback.png`: Okunamayan Google Sheet linkinde kullaniciya net uyari verildigini gosterir.
- `dogrulama-5-canli-veri-guncel.png`: Farkli veri kaynagi kullanildiginda metriklerin guncellendigini gosterir.

