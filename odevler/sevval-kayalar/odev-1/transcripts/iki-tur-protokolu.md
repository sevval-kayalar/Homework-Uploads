# Iki Tur Protokolu - Donatimsiz vs Donanimli

Bu dosya Bolum 4 kanitlarini tek yerde takip etmek icin hazirlandi.

## Secilen senaryo

- Senaryo: S6 - Enerji ve Surdurulebilirlik Panosu
- Persona: Tesis / Facility yoneticisi
- Ana karar: Hangi hatlarda enerji verimliligi aksiyonu oncelikli alinmali?

## Tur A - Donatimsiz kontrol turu

Kurulum:

- Bos sohbet acilir.
- Chat Codex baglami/proje dosyalari kullanilmaz.
- Kalici talimat kullanilmaz.
- Uretim standardi bilgi dosyasi yuklenmez.
- Google Sheet / Drive baglantisi kullanilmaz.
- Tek serbest prompt ile dashboard istenir.

Kullanilacak prompt:

```text
VALEO icin S6 Enerji ve Surdurulebilirlik senaryosunda bir dashboard uret.
Tesis yoneticisi hangi hatlarda enerji verimliligi aksiyonu alacagina karar
verebilsin. En az 4 ekran olsun: ozet KPI, trend, kirilim ve aksiyon detayi.
```

Beklenen kanit:

- `transcripts/tur-A.md` icinde kesintisiz gercek sohbet kaydi.
- `ekran-goruntuleri/tur-A-*.png` adiyla kirpilmamis ekran goruntuleri.
- Dashboard ciktisi veya paylasim linki README icinde.

Kontrol notu:

- Bu tur, yonetisim katmani olmadiginda tasarim, veri baglama ve metrik
  tanimlarinin ne kadar saptigini gostermek icindir.

## Tur B - Donanimli uretim turu

Kurulum:

- Chat Codex baglami olusturulur.
- `talimatlar/kalici-talimat.md` talimat alanina yapistirilir.
- `talimatlar/uretim-standardi.md` bilgi/knowledge dosyasi olarak yuklenir.
- `veri/veri.csv` Google Sheet'e yuklenir ve arac Google Drive/Sheets uzerinden
  bu kaynaga erisir.
- Veri sohbet metnine kopyala-yapistir yapilmaz.

Kullanilacak prompt:

```text
Bagli Google Sheet'teki S6 enerji ve surdurulebilirlik verisini oku. Veriyi
koda gommeden, uretim standardina ve kalici talimatlara uyan 4 ekranli
dashboard uret: E1 Ozet/KPI, E2 Trend, E3 Kirilim/Pareto, E4 Detay/Aksiyon.
Bos veri, hata ve yuklenme durumlarini ele al. Metrikleri veri sozlesmesindeki
alanlardan hesapla.
```

Beklenen kanit:

- `transcripts/tur-B.md` icinde kesintisiz gercek sohbet kaydi.
- `dashboard/index.html`, `dashboard/styles.css`, `dashboard/app.js` donanimli
  ciktinin dosyalari olarak tutulur.
- `ekran-goruntuleri/dashboard-veri-okundu.png` ve ek canli veri kanitlari.
- README icinde Tur B paylasim linki.

Kontrol notu:

- Bu turda standart uygulanmali, veri canli kaynaktan okunmali ve kalici
  talimatlar davranisi sinirlamalidir.

## Tekrarlanabilirlik

Yapilacak deneme:

- Tur B ayni kurulumla iki kez urettirilir.
- Ekran anatomisi, renk anlami, veri katmani ve metrik tanimlari karsilastirilir.
- Tur A mumkunse iki kez urettirilir ve olusan sapmalar not edilir.

Beklenen kanit:

- `transcripts/dogrulama.md` icinde 1. deneme bolumu doldurulur.
- `transcripts/tekrarlanabilirlik-notu.md` icinde kisa farklilik tablosu tutulur.

## Rapor icin karsilastirma eksenleri

- Tasarim tutarliligi
- Kural uyumu
- Veri baglama: kopyala-yapistir / gomulu veri yerine canli baglanti
- Tekrar uretilebilirlik

