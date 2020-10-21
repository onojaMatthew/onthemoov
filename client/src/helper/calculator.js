
export const shipmentTotal = (pieces, weight, amount) => {
  const charge = pieces * weight * amount;
   
  return charge;
}