const tcKimlikDogrulama = require('tc-kimlik-dogrulama');

exports.handler = async (event, context) => {
  // Formdan gelen verileri alıyoruz
  const { ad, soyad, dogumYili, tcKimlikNo } = JSON.parse(event.body);

  try {
    // TC Kimlik doğrulama işlemini yapıyoruz
    const verification = await tcKimlikDogrulama({
      ad,
      soyad,
      dogumYili,
      tcKimlikNo
    });

    // Sonuç olarak true veya false döndürüyoruz
    return {
      statusCode: 200,
      body: JSON.stringify({ isValid: verification })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Bir hata oluştu", error: error.message })
    };
  }
};
