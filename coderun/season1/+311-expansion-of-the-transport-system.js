function extendTransportSystem(EarthRoute, MoonRoute) {
  // Массив для хранения посылок, отправляемых на "Mothership"
  const mothershipStorage = [];

  // Сохраняем оригинальные методы transfer
  const originalEarthTransfer = EarthRoute.prototype.transfer;
  const originalMoonTransfer = MoonRoute.prototype.transfer;

  // Переопределяем метод transfer для EarthRoute
  EarthRoute.prototype.transfer = function (parcel) {
    // Добавляем посылку в хранилище Земли
    originalEarthTransfer.call(this, parcel);

    // Создаем копию посылки для Mothership
    const mothershipParcel = {
      ...parcel,
      origin: "Earth",
      destination: "Mothership",
    };
    mothershipStorage.push(mothershipParcel);
  };

  // Переопределяем метод transfer для MoonRoute
  MoonRoute.prototype.transfer = function (parcel) {
    // Добавляем посылку в хранилище Луны
    originalMoonTransfer.call(this, parcel);

    // Создаем копию посылки для Mothership
    const mothershipParcel = {
      ...parcel,
      origin: "Moon",
      destination: "Mothership",
    };
    mothershipStorage.push(mothershipParcel);
  };

  // Возвращаем массив для хранения посылок, отправляемых на Mothership
  return mothershipStorage;
}

module.exports = extendTransportSystem;
