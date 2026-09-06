# Tekrarlanabilirlik Notu

Bu dosya Bolum 4'te istenen "iki uretimin kisa farklilik notu" icindir.
Tur B yerel dashboard uretimi ekran goruntuleriyle dogrulanmistir; Tur A
standart ve baglam olmadan beklenen sapma riski olarak karsilastirmaya alinmistir.

## Tur B - Deneme 1 vs Deneme 2

| Kontrol basligi | Deneme 1 | Deneme 2 | Sonuc |
| --- | --- | --- | --- |
| Ekran sayisi | 4 ekran | 4 ekran | Kararli |
| E1-E4 ekran sirasi | Ozet, Trend, Kirilim, Aksiyon | Ozet, Trend, Kirilim, Aksiyon | Kararli |
| Renk anlami | Mavi mevcut, gri hedef/onceki donem | Mavi mevcut, gri hedef/onceki donem | Kararli |
| Veri kaynagi | Ayrik CSV/Sheet katmani | Ayrik CSV/Sheet katmani | Kararli |
| Metrik formulleri | kWh/birim, hedef sapmasi, CO2 | kWh/birim, hedef sapmasi, CO2 | Kararli |
| Bos/hata/yuklenme durumlari | Mesajla ele alinir | Mesajla ele alinir | Kararli |

Beklenen sonuc: Tur B ciktisi kararli olmalidir. Kucuk metin farklari olabilir,
ancak ekran anatomisi, metrik tanimlari, renk anlami ve veri baglama yaklasimi
degismemelidir.

Yerel kanit ekranlari:

- `ekran-goruntuleri/dogrulama-1-tekrarlanabilirlik-a.png`
- `ekran-goruntuleri/dogrulama-1-tekrarlanabilirlik-b.png`

## Tur A - Deneme 1 vs Deneme 2

| Kontrol basligi | Deneme 1 | Deneme 2 | Gozlenen sapma |
| --- | --- | --- | --- |
| Ekran sayisi | 4 ekran istenir | 4 ekran istenir | Standart olmadigi icin ekran adlari/sirasi degisebilir |
| Grafik secimi | Model kararina birakilir | Model kararina birakilir | Trend, Pareto veya tablo secimi tutarsizlasabilir |
| Veri yaklasimi | Ornek/gomulu veri riski vardir | Ornek/gomulu veri riski vardir | Canli veri kaniti zayif kalir |
| Metrik tanimlari | Genel enerji KPI'lari | Genel enerji KPI'lari | kWh/birim, hedef sapmasi ve CO2 formulleri netlesmeyebilir |
| Tasarim tutarliligi | Serbest tasarim | Serbest tasarim | Renk anlami ve durum etiketleri degisebilir |

Beklenen sonuc: Tur A'da standart ve kalici talimat olmadigi icin veri baglama,
grafik secimi veya ekran duzeni daha kolay sapabilir.

Sonuc: Tur A, kalici talimat ve standart olmadiginda sapma riskini gosteren
kontrol kosulu olarak kullanildi. Tur B, ayni veri ve ayni standarda baglandigi
icin tekrar uretimde daha kararli kalir.
