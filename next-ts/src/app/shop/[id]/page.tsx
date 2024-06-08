
import {CartProvider} from "../../../sections/Card-Product/addToCart";
import CarouselView from "../../../sections/_examples/extra/carousel-view";
import ProductStoreInfo from "../../../sections/Card-Product/ProductStoreInfo";

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
