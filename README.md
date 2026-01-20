Bu proje hem mobil arayüzü hem de arkada çalışan sunucuyu içeren bir alışveriş listesi uygulamasıdır. İhtiyacın olan şeyleri listeye ekleyip adetlerini takip edebiliyorsun.

Proje Nasıl Çalışıyor?
Uygulama iki ana kısımdan oluşuyor:

Mobil (Frontend): React Native ve Expo ile hazırladım. Şık bir arayüzü var, giriş yapıp listeni görebiliyorsun.

Sunucu (Backend): Node.js ve Express kullanarak yazdım. PostgreSQL veritabanına bağlanıp verileri kaydediyor.

Veritabanı Yapısı
PostgreSQL tarafında iki tane basit tablom var:

kullanicilar: İnsanların kayıt olup giriş yapmasını sağlıyor (id, kullanici_adi, sifre).

alisverilistesi: Eklenen ürünleri tutuyor (id, kullanici_id, alinacak_ismi, alinacak_miktar).

Kurulum ve Çalıştırma
Sunucu tarafı için:

Bilgisayarında PostgreSQL kurulu olmalı.

alısverisyonetimidb adında bir database oluşturman lazım.

Sunucu klasöründe npm install komutuyla paketleri yükle.

node index.js komutuyla 3000 portunda sunucuyu ayağa kaldır.

Mobil tarafı için:

Expo yüklü olmalı.

npm install ile bağımlılıkları indir.

Kodun içindeki IP adreslerini kendi bilgisayarının IP'siyle değiştir.

npx expo start yazıp uygulamayı telefonundan veya simülatörden aç.

Yapılabilen İşler
Kullanıcı hesabı oluşturma ve giriş yapma.

Kişiye özel alışveriş listesi görüntüleme.

Listeye ürün ismi ve miktarı (adet/br) ekleme.

Çıkış yapıp hesaptan ayrılma.
