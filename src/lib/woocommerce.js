import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.WOO_URL,
  consumerKey: process.env.WOO_KEY,
  consumerSecret: process.env.WOO_SECRET,
  version: "wc/v3"
});

export default api;
