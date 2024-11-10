const tcKimlikDogrulama = require('tc-kimlik-dogrulama');

exports.handler = async function(event, context) {
  
    const { ad, soyad, dogumYili, tcKimlikNo } = JSON.parse(event.body);

    try {
      
        const result = await tcKimlikDogrulama({ ad, soyad, dogumYili, tcKimlikNo });

      
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
