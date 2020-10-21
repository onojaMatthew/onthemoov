

exports.meterConversion = () => {
  const mToKm = (distance) => parseFloat(distance / 1000);
  const kmToM = (distance) => parseFloat(distance * 1000);
  return {
      mToKm,
      kmToM
  };
};