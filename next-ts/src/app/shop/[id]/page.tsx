
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import ProductStoreInfo from "../../../sections/Card-Product/ProductStoreInfo";
import {CartProvider} from "../../../sections/Card-Product/addToCart";
import CartPage from "../../../sections/Card-Product/CartPage";

export const metadata = {
  title: 'Pricing',
};



export default function PricingPage() {
  return (
      <CartProvider>
        <ProductStoreInfo />
      </CartProvider>
  );
}
