export const brand = {
  name: "Apogix",
  whatsappNumber: "919818639441",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
