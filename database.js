const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

const veri = express();
veri.use(express.json());
veri.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "alısverisyonetimidb",
  password: "1",
  port: 5432,
});

// Giriş Yapma
veri.post("/giris", async (req, res) => {
  const { kullanici_adi, sifre } = req.body;
  try {
    const sorgu = "SELECT * FROM kullanicilar WHERE kullanici_adi=$1 AND sifre=$2";
    const sonuc = await pool.query(sorgu, [kullanici_adi, sifre]);
    
    if (sonuc.rows.length > 0) {
      res.json({ 
        message: "Giriş Başarılı", 
        id: sonuc.rows[0].id 
      });
    } else {
      res.status(401).json({ message: "Bilgiler hatalı" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sunucu Hatası" });
  }
});

// Kayıt Olma
veri.post("/kayit", async (req, res) => {
  const { kullanici_adi, sifre } = req.body;
  try {
    const sorgu = "INSERT INTO kullanicilar (kullanici_adi, sifre) VALUES ($1, $2) RETURNING *";
    const sonuc = await pool.query(sorgu, [kullanici_adi, sifre]);
    res.json({ message: "Kayıt Başarılı", id: sonuc.rows[0].id }); 
  } catch (err) {
    res.status(500).json({ message: "Kayıt sırasında hata oluştu" });
  }
});

// database.js içindeki GET (liste çekme) kısmı
veri.get("/liste/:id", async (req, res) => {
    const { id } = req.params;
    try {
        // BURAYI "urunler" yerine "alisverilistesi" yapıyoruz:
        const sonuc = await pool.query(
            "SELECT * FROM alisverilistesi WHERE kullanici_id = $1", 
            [id] 
        );
        res.status(200).json(sonuc.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Sunucu hatası" });
    }
});

// Liste Ekleme
veri.post("/liste-ekle", async (req, res) => {
  const { kullanici_id, alinacak_ismi, alinacak_miktar } = req.body;
  try {
    const sorgu = "INSERT INTO alisverilistesi (kullanici_id, alinacak_ismi, alinacak_miktar) VALUES ($1, $2, $3) RETURNING *";
    const cevap = await pool.query(sorgu, [kullanici_id, alinacak_ismi, alinacak_miktar]);
    res.status(201).json({
      message: "Ürün Eklendi",
      urun: cevap.rows[0]
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Hata Eklenemedi" });
  }
});

veri.listen(3000, "0.0.0.0", () => {
  console.log("Sunucu 3000 portunda başladı!");
});