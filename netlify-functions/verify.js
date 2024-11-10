const tcKimlikDogrulama = require('tc-kimlik-dogrulama');

exports.handler = async function(event, context) {
    // Body verilerini JSON olarak alıyoruz
    const { ad, soyad, dogumYili, tcKimlikNo } = JSON.parse(event.body);

    try {
        // TC Kimlik doğrulama işlemini yapıyoruz
        const result = await tcKimlikDogrulama({ ad, soyad, dogumYili, tcKimlikNo });

        // Başarılıysa true, başarısızsa false döndürüyoruz
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Doğrulama hatası' })
        };
    }
};
