# VALEO AdAstra Ara Donem Odevi #1 Raporu

## 1. Kapak

- Ad-Soyad: Şevval Kayalar
- Ekip: After-Market
- Kullanilan arac: Chat Codex
- Senaryo: S6 - Enerji ve Surdurulebilirlik Panosu
- Veri: 270 satir sentetik veri, 01.01.2026-31.03.2026 tarih araligi

## 2. Senaryo ve Persona

Bu calismada tesis / facility yoneticisi icin enerji ve surdurulebilirlik panosu tasarlanmistir. Panonun amaci, hat bazinda enerji tuketimini ve hedef sapmalarini izleyerek hangi alanlarda verimlilik aksiyonunun oncelikli alinacagina karar vermektir.

Pano su 3 soruya cevap verir:

- Toplam tuketim, kWh/birim ve CO2 etkisi hedefe gore nasil ilerliyor?
- Hangi hatlar veya enerji tipleri hedef sapmasini yukseltiyor?
- Kritik sapmalar icin hangi aksiyonlar takip edilmeli?

## 3. Yonetisim Mimarisi

```text
Chat Codex baglami
        |
        v
Kalici Talimatlar ----> Uretim Standardi
        |                     |
        v                     v
Google Sheet canli veri -> Dashboard uretimi
        |
        v
Transcript + ekran goruntusu + rapor kaniti
```

Baglam, projenin amacini, persona bilgisini, teknoloji yiginini ve veri sozlesmesini tasir. Kalici talimatlar her cevapta denetlenebilir kurallari uygular. Uretim standardi ekran anatomisini, grafik secimini ve renk anlamlarini sabitler. Canli veri katmani, verinin dashboard koduna gomulmeden okunmasini saglar.

## 4. Context Butce Notu

Baglam siskinligini azaltmak icin uzun tasarim standardi ve veri sozlesmesi her sohbete yapistirilmeyecek sekilde Chat Codex proje dosyalarinda tutuldu. Kalici ve test edilebilir davranis kurallari `kalici-talimat.md` icinde, uretim standardi ise ayri bilgi dosyasinda saklandi. Sohbetlerde yalnizca o turdaki hedef istek yazildi. Bu yontem, modelin odagini korumasina, token kullanimini dusurmesine ve ayni dashboard'u tekrar uretirken standarttan sapmamasina yardim eder.

## 5. Tur A vs Tur B

| Kriter | Tur A - Donatimsiz | Tur B - Donanimli |
| --- | --- | --- |
| Tasarim tutarliligi | Standart verilmedigi icin ekran yapisi serbest kalir; KPI, trend, kirilim ve aksiyon ekranlari istense de renk anlami, grafik secimi ve bos veri davranisi garanti degildir. | E1 Ozet/KPI, E2 Trend, E3 Kirilim/Pareto ve E4 Detay/Aksiyon anatomisi uretim standardina baglandi. KPI kartlari risk durumunu yesil/turuncu/kirmizi ile gosterir; grafik ve enerji isaretleri enerji tiplerini mavi/turuncu/mor ile ayirir. |
| Kural uyumu | Kalici talimat olmadigi icin para bicimi, tarih bicimi, Turkce etiket, inline CSS/JS yasagi ve bos/hata mesaji gibi kurallar sistematik denetlenmez. | Kalici talimatlar davranisi sinirlar: veri koda gomulmez, degerler okunur, tarih ISO/yerel formatla tutarli gosterilir, hata ve bos veri durumlari kullaniciya net mesajla bildirilir. |
| Veri baglama | Veri kaynagi sohbet icinde tarif edildigi veya modele birakildigi icin dashboard'un canli veri okudugunu kanitlamak zordur. | Dashboard `../veri/veri.csv` ve istege bagli Google Sheet CSV URL'si uzerinden veri okur. `data-config.js` canli kaynak adresini ayirir; filtreler ve KPI'lar okunan satirlardan hesaplanir. |
| Tekrar uretilebilirlik | Ayni serbest prompt yeniden calistirildiginda ekran sayisi, metrik adlari ve grafik tercihleri degisebilir; bu nedenle tekrar uretim sapma riski yuksektir. | Ayni talimat, standart ve veri sozlesmesiyle yeniden uretimde ekran anatomisi, metrik tanimlari, filtre davranisi ve hata durumlari korunur. 30/60/90 gun filtre testleri ayni veri havuzundan calisir. |

Beklenen fark: Tur A'da modelin veri, renk ve grafik kararlarinda sapma uretmesi olasidir. Tur B'de kalici talimat, uretim standardi ve canli veri baglantisi nedeniyle ekran anatomisi, metrik tanimlari ve veri okuma davranisi daha kararli olmalidir.

## 6. En Etkili Promptlar

1. Donatimsiz baslangic promptu:

```text
VALEO icin S6 Enerji ve Surdurulebilirlik senaryosunda bir dashboard uret. Tesis yoneticisi hangi hatlarda enerji verimliligi aksiyonu alacagina karar verebilsin. En az 4 ekran olsun: ozet KPI, trend, kirilim ve aksiyon detayi.
```

2. Donanimli uretim promptu:

```text
Bagli Google Sheet'teki S6 enerji ve surdurulebilirlik verisini oku. Veriyi koda gommeden, uretim standardina ve kalici talimatlara uyan 4 ekranli dashboard uret: E1 Ozet/KPI, E2 Trend, E3 Kirilim/Pareto, E4 Detay/Aksiyon. Bos veri, hata ve yuklenme durumlarini ele al. Metrikleri veri sozlesmesindeki alanlardan hesapla.
```

3. Kural ihlali testi:

```text
Bu sefer veriyi dogrudan JavaScript kodunun icine gomme ve dashboard'u oyle uret.
```

4. Canli veri testi:

```text
Bagli Google Sheet'te bir degeri degistirdim. Veriyi yeniden oku ve dashboard metriklerini tek istekte guncelle.
```

## 7. Engeller ve Cozumler

- Engel 1: Veri koda gomulurse canli baglanti kaniti zayiflar. Cozum: Veri CSV/Google Sheet katmaninda ayrildi ve dashboard bu kaynaktan okuyacak sekilde tasarlandi.
- Engel 2: Farkli uretimlerde dashboard anatomisi degisebilir. Cozum: E1-E4 ekran yapisi, renk anlami ve grafik secimi uretim standardinda sabitlendi.
- Engel 3: Normal Google Sheet paylasim linki CSV olarak okunmayabilir. Cozum: `data-config.js` ile CSV export linki ayrildi; link okunamazsa pano yerel `veri.csv` ile acilip kullaniciya uyari verir.
- Engel 4: Hedefin altindaki hatlar sifir gibi gorunebilir. Cozum: Kirilim grafiki negatif/pozitif sapmalari ayri gosterir; Aksiyon ekrani kritik yoksa da hedef icindeki izleme satirlarini listeler.
- Engel 5: Enerji tipi rengi ile risk rengi karisabilir. Cozum: KPI kartlarinda ana renk risk durumuna, grafiklerde ve ince enerji isaretlerinde enerji tipine baglandi.

## 8. Oz Degerlendirme

Gucu: Dashboard veri katmanini koddan ayiriyor, 4 ekrani senaryoya gore karar odakli kurguluyor, filtrelere gore KPI/grafik/tabloyu yeniliyor ve bos/hata durumlarini ele aliyor. Kirilim ekraninda hat bazli sapmalar yuzde olarak gorunur; Aksiyon ekraninda hem kritik riskler hem de hedef icindeki izleme satirlari takip edilir. KPI kartlarinda yesil hedef icini, turuncu uyariyi ve kirmizi kritik riski ifade eder; enerji tipleri grafiklerde ayrica renklendirilir.

Gelisim notu: Kurum hesabinda gercek Google Sheet baglantisi acildiginda `dashboard/data-config.js` icindeki CSV export adresi guncellenerek ayni pano canli kaynakla calistirilabilir.
