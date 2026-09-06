# Uretim Standardi - Skill/Gem bilgi dosyasi

Bu standart, VALEO enerji ve surdurulebilirlik panolarinin her uretimde ayni anatomi, gorsel dil ve veri davranisiyla uretilmesini saglar.

## Tasarim sistemi

- Renk anlami sabittir: mavi mevcut donem, gri hedef/referans, yesil hedef icinde, sari izlenecek sapma, kirmizi kritik sapma.
- Dekoratif golge, 3B efekt ve veri okumayi zorlastiran susleme kullanilmaz.
- Kartlar ve tablolar yogun ama okunakli olur; gereksiz aciklama metni eklenmez.
- Kontrast WCAG AA seviyesine yakin tutulur; anlam yalnizca renge baglanmaz.
- Tarihler kullanici arayuzunde `GG.AA.YYYY` biciminde gosterilir.

## Her ekranin anatomisi

- Ustte baslik ve son guncelleme tarihi.
- Hemen altinda filtre alani: hat, enerji tipi ve donem.
- Ilk ekranda en kritik 4-6 KPI karti.
- Grafikler ve tablolar ekranin ana karar sorusuna hizmet eder.
- Onemli bilgi ilk ekranda kaydirmadan okunabilecek sekilde onceliklendirilir.

## Grafik secimi

- Zamana gore degisim icin cizgi grafik kullanilir.
- Trend ekraninda mevcut donem, ayni uzunluktaki onceki donem ile karsilastirilir.
- Hat, bolge, neden veya kategori kiyasinda sutun/bar grafik kullanilir.
- Asamadan asamaya azalma gerekiyorsa huni grafik kullanilir.
- Pasta grafik yalnizca 2-3 parca varsa kullanilir.
- Enerji karmasi gibi dagilimlarda grafik etiketleri yuzde veya degerle desteklenir.

## S6 metrik tanimlari

- Toplam tuketim: secili filtrelerdeki `Tuketim (kWh)` toplami.
- Birim enerji: `Tuketim (kWh) / Uretim Adedi`.
- Hedef sapmasi: `(Birim enerji - Hedef kWh/birim) / Hedef kWh/birim`.
- CO2 etkisi: `Tuketim (kWh) x CO2 Faktoru`.
- Kritik aksiyon: hedef sapmasi %10 uzeri olan hat/enerji tipi kombinasyonlari.

## Zorunlu cikti davranislari

- Dashboard en az 4 ekrandan olusur: Ozet/KPI, Trend, Kirilim/Pareto, Detay/Aksiyon.
- Veri dashboard koduna sabitlenmez; ayri CSV/JSON dosyasindan veya Google Sheet baglantisindan okunur.
- Bos veri, bozuk veri ve veri yuklenememe durumlari icin anlamli mesaj gosterilir.
- Cikti tekrar uretildiginde ayni renk, ayni ekran anatomisi ve ayni metrik tanimlari korunur.
