# PDF'ye Gore Teslim Kontrol Listesi

## Secilen senaryo

- Senaryo havuzu: S1-S6 arasindan tam olarak bir senaryo secilmeli.
- Secilen senaryo: S6 - Enerji ve Surdurulebilirlik.
- Hedef persona: Tesis / Facility.
- Ana metrikler: Birim basina kWh, hat bazinda tuketim, hedef sapma %, CO2.
- Veri semasi: Tarih, Hat, Enerji Tipi, Tuketim (kWh), Uretim Adedi, Hedef kWh/birim, CO2 Faktoru.

## Su an hazir olanlar

- `veri/veri.csv`: 270 satir, 90 gunluk sentetik veri.
- `dashboard/index.html`, `dashboard/styles.css`, `dashboard/app.js`: 4 ekranli dashboard.
- E2 Trend ekrani: mevcut donem ile onceki donemi cizgi grafikle karsilastirir.
- `dashboard/cikti-B.md`: Tur B ciktisinin dosya listesi.
- `dashboard/cikti-A.md`: Tur A donatimsiz kontrol kosulunun notu.
- `baslat-dashboard.bat`: Dashboard'u dogru klasorden localhost ile baslatir.
- `talimatlar/kalici-talimat.md`: kalici talimat metni.
- `talimatlar/uretim-standardi.md`: uretim standardi.
- `talimatlar/context-butce-notu.md`: context yonetimi notu.
- `veri/google-sheet-baglanti-notu.md`: canli veri baglantisi kurulumu ve kanit listesi.
- `dashboard/data-config.js`: Google Sheet CSV baglantisi icin ayri veri kaynagi ayari.
- `otomasyon/apps-script-trigger.gs`: bonus otomasyon ornegi.
- `transcripts/iki-tur-protokolu.md`: Bolum 4 uygulama plani.
- `transcripts/tekrarlanabilirlik-notu.md`: tekrar uretim farklilik notu.
- `kanit-formati.md`: Bolum 5 kanit matrisi.
- `ekran-goruntuleri/dashboard-desktop.png` ve `dashboard-mobile.png`: yerel dashboard goruntuleri.
- `rapor.pdf`: tamamlanmis rapor.

## Tamamlanan kritik teslim maddeleri

- `Ad-Soyad` klasoru `Sevval-Kayalar` olarak yeniden adlandirildi.
- `README.md` icindeki ad-soyad, arac ve Chat Codex paylasim linki eklendi.
- Sentetik veri `veri/veri.csv` olarak hazirlandi; Sheet CSV export baglantisi icin `dashboard/data-config.js` ayrildi.
- Chat Codex baglami, kalici talimat ve uretim standardi proje dosyalarinda kuruldu.
- Tur A ve Tur B karsilastirmasi `transcripts/` dosyalarinda ve `rapor.pdf` icinde ozetlendi.
- Tekrarlanabilirlik notu, Tur B kanitlari ve Tur A sapma riskiyle dolduruldu.
- 6 dogrulama senaryosu `transcripts/dogrulama.md` icinde kanit dosyalariyla eslendi.
- Ekran goruntuleri klasorune dashboard, bos/bozuk veri, standart, donem ve canli veri testleri eklendi.
- Rapor PDF olarak yeniden olusturuldu.
- Sonraki islem: `GitHub-Yuklenecek/Sevval-Kayalar` klasoru GitHub teslim deposuna yuklenir.

## PDF'nin en riskli cezalari

- Transcript veya paylasilan sohbet linki yoksa teslim degerlendirilmez.
- Rapor yoksa teslim degerlendirilmez.
- Gercek/gizli VALEO verisi kullanilirsa teslim degerlendirme disi kalir.
- Tur B'de veri kopyala-yapistir veya koda gomulu olursa canli veri puani ciddi dusurulur.
- Skill/Gem tanimli ama transcript'te uygulanmadiysa dekoratif sayilir.
- Kesilmis veya duzenlenmis transcript/ekran goruntusu kanit sayilmaz.

