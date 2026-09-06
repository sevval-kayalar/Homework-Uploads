# Homework Uploads — Kurumsal YZ Eğitimi

Bu repo, eğitim katılımcılarının ödevlerini teslim ettiği yerdir.

## Ödevini nasıl yüklersin?

Bu repoya **doğrudan yazma yetkin yok** (herkese açık ama sadece okunabilir).
Teslim akışı **fork + pull request** şeklindedir.

### 1. Repoyu fork'la

Sağ üstteki **Fork** düğmesine bas. Kendi hesabında
`https://github.com/<kullanici-adin>/Homework-Uploads` kopyası oluşur.

### 2. Dosyanı ekle

En kolay yol tarayıcıdan:

1. Kendi fork'unda `odevler/` klasörüne gir.
2. **Add file → Upload files** (veya **Create new file**).
3. Dosya yolunu şu kalıba göre yaz:

```
odevler/<kullanici-adin>/<odev-no>/<dosya-adi>
```

Örnek:

```
odevler/aysegul-demir/odev-1/cozum.ipynb
odevler/aysegul-demir/odev-1/README.md
```

Komut satırını tercih edersen:

```bash
git clone https://github.com/<kullanici-adin>/Homework-Uploads.git
cd Homework-Uploads
mkdir -p odevler/<kullanici-adin>/odev-1
# dosyalarını bu klasöre kopyala
git add odevler/<kullanici-adin>/odev-1
git commit -m "odev-1 teslim: <kullanici-adin>"
git push origin main
```

### 3. Pull request aç

Fork'unda **Contribute → Open pull request** de.
PR başlığı: `odev-1 — <Ad Soyad>`

PR açıldıktan sonra teslim alınmış sayılır. Değerlendirme yorum olarak PR'a yazılır.

## Kurallar

- **Sadece kendi klasörüne dosya ekle.** Başkasının klasöründeki dosyaları
  değiştiren PR'lar kapatılır.
- Her ödev için ayrı PR aç.
- Büyük veri setlerini (>25 MB) repoya koyma; bağlantı ver.
- API anahtarı, şifre, `.env` dosyası **yükleme**. Yüklersen anahtarı hemen iptal et.

## Sorun mu var?

Fork/PR akışında takılırsan **Issues** sekmesinden bir kayıt aç.
