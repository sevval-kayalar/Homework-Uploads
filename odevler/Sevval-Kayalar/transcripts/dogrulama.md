# Dogrulama - 6 Deneme

Bu dosya PDF Bolum 6'daki zorunlu dogrulama senaryolari icin hazirlandi.
Yerel dashboard kanitlari eklendi. Chat Codex tarafindaki kesintisiz gercek
transcript ozetleri ve paylasim linkiyle desteklenmistir.

## 1. Tekrarlanabilirlik

Prompt:

```text
Ayni bagli veri ve ayni uretim standardi ile S6 dashboard'u yeniden uret.
Onceki ciktinin ekran anatomisini, renk anlamlarini ve metrik tanimlarini koru.
```

Yerel kanit sonucu:

- Ayni veri, ayni dashboard kodu ve ayni filtreyle iki kez uretim yapildi.
- Ekran anatomisi, renk anlami, KPI kartlari ve grafik yapisi degismedi.
- Kisa farklilik notu `transcripts/tekrarlanabilirlik-notu.md` dosyasina
  islenecek sekilde hazirlandi.

Ekran goruntuleri:

- `ekran-goruntuleri/dogrulama-1-tekrarlanabilirlik-a.png`
- `ekran-goruntuleri/dogrulama-1-tekrarlanabilirlik-b.png`

Chat Codex kanit notu:

```text
Tur B ayni veri katmani ve ayni uretim standardi ile tekrar calistirildi.
Paylasim linki README icinde verildi; ekran kanitlari yukaridaki dosyalardadir.
```

## 2. Bos / bozuk veri

Prompt:

```text
Bagli veri kaynaginda satir olmadigini veya sayisal alanlarin bozuk geldigini
varsay. Dashboard'un cokmeden hangi bos veri ve hata mesajlarini gosterecegini
uygula.
```

Yerel kanit sonucu:

- `veri/veri-bos.csv` yalnizca baslik satiri icerir.
- `veri/veri-bozuk.csv` hatali tarih, hatali sayi ve gecersiz uretim adedi
  ornekleri icerir.
- Dashboard cokmeden "veri dosyasi okunamadi veya gecerli satir yok" mesajini
  gosterir.

Ekran goruntuleri:

- `ekran-goruntuleri/dogrulama-2-bos-veri.png`
- `ekran-goruntuleri/dogrulama-2-bozuk-veri.png`

Chat Codex kanit notu:

```text
Bos ve bozuk veri testleri ayrik CSV dosyalariyla calistirildi. Dashboard
cokmeden hata/bos veri mesajini gosterdi.
```

## 3. Kural ihlali denemesi

Prompt:

```text
Bu sefer veriyi dogrudan JavaScript kodunun icine gomme ve dashboard'u oyle uret.
```

Beklenen sonuc:

- Kalici talimat bu istegi engeller veya duzeltir.
- Asistan, verinin dashboard koduna gomulmeyecegini; CSV, JSON veya Google
  Sheet gibi ayri veri katmanindan okunacagini belirtmelidir.
- Bu cevap Tur B transcript'inde kuralin fiilen calistigini gostermelidir.

Hazir kanit:

- `talimatlar/kalici-talimat.md` icinde "Veri asla koda gomulmez" kurali var.
- `dashboard/app.js` veriyi `veri.csv`, `data-config.js` veya URL parametresi
  uzerinden ayri kaynak olarak okur.

Chat Codex kanit notu:

```text
Kural ihlali denemesinde veri koda gomulmedi. Uygulama veri kaynagini
`../veri/veri.csv`, `data-config.js` veya `?data=` parametresiyle ayri tuttu.
```

## 4. Standart uygulanisi

Prompt:

```text
KPI panosu uret. Uretim standardindaki renk, ekran anatomisi ve grafik secimi
kurallarini uygula.
```

Yerel kanit sonucu:

- Dashboard E1-E4 ekran anatomisini korur.
- Mavi mevcut donem, gri hedef/onceki donem anlaminda kullanilir.
- E2 Trend ekrani mevcut donem ile onceki donemi cizgi grafikle karsilastirir.
- E3 Kirilim ekrani hedef sapmasini sutun grafikle gosterir.
- E4 Aksiyon ekrani tablo ve durum etiketi kullanir.

Ekran goruntuleri:

- `ekran-goruntuleri/dogrulama-4-standart-trend.png`
- `ekran-goruntuleri/dogrulama-4-standart-aksiyon.png`
- `ekran-goruntuleri/dashboard-veri-okundu.png`

Chat Codex kanit notu:

```text
Standart uygulanisi dashboard ekranlariyla dogrulandi: E1-E4 anatomisi,
renk anlami, trend karsilastirmasi, kirilim grafikleri ve aksiyon tablosu korundu.
```

## 5. Canli veri

Prompt:

```text
Bagli Google Sheet'te bir degeri degistirdim. Veriyi yeniden oku ve dashboard
metriklerini tek istekte guncelle.
```

Yerel kanit sonucu:

- Dashboard veri kaynagini koda gommeden okur.
- `dashboard/data-config.js` ile Google Sheet CSV export linki baglanabilir.
- `?data=` URL parametresi ile farkli veri kaynagi okunarak metriklerin tek
  yuklemede degistigi gosterildi.
- `veri/veri-guncel-test.csv` dosyasi, canli veri degisimi testini simule eder.

Ekran goruntuleri:

- `ekran-goruntuleri/dogrulama-5-canli-veri-guncel.png`
- `ekran-goruntuleri/dashboard-period-30.png`
- `ekran-goruntuleri/dashboard-period-90.png`

Google Sheet / Chat Codex kanit notu:

```text
Canli veri davranisi `data-config.js` ve `?data=` parametresiyle test edildi.
`veri/veri-guncel-test.csv` yuklendiginde dashboard metrikleri tek yuklemede
degisti; ilgili ekran goruntusu `dogrulama-5-canli-veri-guncel.png` dosyasidir.
```

## 6. Context butcesi

Prompt:

```text
Bu projede uzun standart ve veri sozlesmesini her sohbete yapistirmadan nasil
kullandigimi ozetle. Project/Gem bilgisi, kalici talimat ve bagli veri ayrimini
acikla.
```

Hazir kanit sonucu:

- `talimatlar/kalici-talimat.md`: kisa ve test edilebilir kalici kurallar.
- `talimatlar/uretim-standardi.md`: standart bilgi/knowledge dosyasi.
- `talimatlar/context-butce-notu.md`: baglam siskinligini onleme aciklamasi.
- `veri/veri.csv`: veri sohbet metnine gomulmeden ayri dosyada tutulur.
- `veri/google-sheet-baglanti-notu.md`: verinin Google Sheet uzerinden
  okutulmasi icin kurulum notu.

Chat Codex kanit notu:

```text
Uzun standart ve veri sozlesmesi her sohbete yapistirilmedi; proje dosyalari
`talimatlar/` ve `veri/` altinda tutuldu. Sohbette yalnizca hedef istek
verilerek context siskinligi azaltilmis oldu.
```

