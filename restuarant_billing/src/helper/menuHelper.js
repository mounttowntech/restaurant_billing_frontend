export const getMenuPrice = (item, orderType) => {
  switch (orderType) {
    case "TAKEAWAY":
      return item.takeawayPrice;

    case "DELIVERY":
      return item.deliveryPrice;

    case "DINE_IN":
    default:
      return item.dineInPrice;
  }
};