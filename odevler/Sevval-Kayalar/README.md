# Ara Donem Odevi #1 - Teslim Klasoru

## Bilgiler

- Ad-Soyad: Şevval Kayalar
- Ekip: After-Market
- Kullanilan arac: Chat Codex
- Secilen senaryo: S6 - Enerji ve Surdurulebilirlik Panosu

## Panonuz kimin icin?

- Kim kullanacak: Tesis / Facility yoneticisi
- Hangi karari verecek: Hangi uretim hatlarinda enerji verimliligi aksiyonunun oncelikli alinacagi
- Cevapladigi 3 soru:
  - Toplam enerji tuketimi ve kWh/birim hedefe gore nerede?
  - Hangi hat veya enerji tipi hedef sapmasini yukseltiyor?
  - Hangi aksiyonlar kritik ve takipte?

## Paylasilan sohbet baglantilari

- Tur A (donatimsiz) konusmasi: Chat Codex calisma linki - https://chatgpt.com/s/cx_6a9c908be5c08191a7846d05476b7761
- Tur B (donanimli) konusmasi: Chat Codex calisma linki - https://chatgpt.com/s/cx_6a9c908be5c08191a7846d05476b7761
- Dogrulama konusmasi: Chat Codex calisma linki - https://chatgpt.com/s/cx_6a9c908be5c08191a7846d05476b7761

## Dosya yapisi

- `talimatlar/kalici-talimat.md`: Chat Codex talimat/baglam alanina yapistirilir.
- `talimatlar/uretim-standardi.md`: Chat Codex bilgi/baglam dosyasi olarak kullanilir.
- `talimatlar/context-butce-notu.md`: Baglamin nasil sade tutuldugunu aciklar.
- `veri/veri.csv`: 270 satir, 90 gunluk sentetik S6 enerji verisi. Ayni veri Google Sheet'e yuklenmelidir.
- `veri/google-sheet-baglanti-notu.md`: Canli veri baglantisi kurulum ve kanit notu.
- `dashboard/index.html`: CSV dosyasindan okuyan 4 ekranli dashboard.
- `dashboard/data-config.js`: Istenirse Google Sheet CSV linki buraya yazilir.
- `dashboard/cikti-A.md`: Tur A donatimsiz kontrol notu.
- `dashboard/cikti-B.md`: Donanimli Tur B dashboard ciktisinin dosya listesi.
- `otomasyon/apps-script-trigger.gs`: Bonus Apps Script tetikleyici taslagi.
- `transcripts/*.md`: Tur A, Tur B ve dogrulama akisini ozetleyen kanit kayitlari.
- `transcripts/iki-tur-protokolu.md`: Tur A/Tur B uygulama ve kanit plani.
- `transcripts/tekrarlanabilirlik-notu.md`: Iki uretimin farklilik notu.
- `kanit-formati.md`: Bolum 5 kanit matrisi.
- `rapor.pdf`: Tamamlanmis odev raporu.

## Calistirma

Degerlendiren kisi once bu `README.md` dosyasini okuyabilir. Dashboard'u
yerelde test etmek icin Windows'ta `baslat-dashboard.bat` dosyasina cift
tiklanir; bu dosya yerel sunucuyu baslatir ve `http://localhost:8000/dashboard/`
adresini acar.

Elle calistirmak isterseniz `Sevval-Kayalar` klasorunde asagidaki komutu calistirin:

```bash
python -m http.server 8000
```

Sonra tarayicida `http://localhost:8000/dashboard/` adresini acin.

Not: `dashboard/index.html` dosyasini dogrudan cift tiklayarak acarsaniz tarayici
guvenlik nedeniyle `veri/veri.csv` dosyasini okuyamayabilir. Bu durumda filtreler
veriyle dolmaz. Mutlaka yukaridaki yerel sunucu adresinden acin.

Google Sheet kullanilacaksa normal paylasim linki yerine yayina alinmis CSV
export linki `dashboard/data-config.js` icine yazilir. Bos birakilirsa pano
teslimle gelen yerel `veri/veri.csv` dosyasini okur.

## Yuklemeden once son kontrol

- Kurallar yazildi mi? Evet
- Uretim standardi yazildi mi? Evet
- Veri sentetik mi? Evet
- Dashboard veri dosyasindan okuyor mu? Evet
- Google Sheet canli baglantisi kanitlandi mi? Veri katmani ayrildi; `data-config.js`, `?data=` testi ve ekran goruntuleri eklendi
- Konusma kayitlari eklendi mi? Chat Codex calisma linki ve transcript ozetleri eklendi
- Ekran goruntuleri eklendi mi? Evet, `ekran-goruntuleri/` altinda dogrulama gorselleri var
- Rapor PDF olarak eklendi mi? Evet, `rapor.pdf` yeniden olusturuldu
