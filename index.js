const express = require('express');
const tcKimlikDogrulama = require('tc-kimlik-dogrulama');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ana sayfa (HTML formunu gösterir)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Formdan gelen POST isteğini işleme
app.post('/verify', async (req, res) => {
  const { ad, soyad, dogumYili, tcKimlikNo } = req.body;

  try {
    // TC Kimlik doğrulama işlemi
    const verification = await tcKimlikDogrulama({
      ad,
      soyad,
      dogumYili,
      tcKimlikNo
    });

    // Doğrulama sonucunu döndürme
    if (verification) {
      res.send('<h3>Doğrulama Başarılı!</h3><a href="/">Yine dene</a>');
    } else {
      res.send('<h3>Doğrulama Başarısız!</h3><a href="/">Yine dene</a>');
    }
  } catch (error) {
    res.send('<h3>Hata oluştu: ' + error.message + '</h3><a href="/">Yine dene</a>');
  }
});

// Sunucuyu çalıştırma
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
