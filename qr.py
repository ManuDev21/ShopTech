import qrcode

url = "https://manudev21.github.io/ShopTech/"

qr = qrcode.QRCode(
    version=1,
    box_size=25,
    border=5
)

qr.add_data(url)

qr.make(fit=True)

imagen = qr.make_image()


imagen.save("MiQR.png")