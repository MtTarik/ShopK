import {useParams} from "next/navigation";
import React, { useState, useEffect} from "react";

import List from "@mui/material/List";
import {CardMedia} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";

import {Product} from "./CardProduct";
import { getProductPhoto} from "../../api/ProductRequest";

interface CartSideMenuProps {
  open: boolean;
  onClose: () => void;
  cart: { [productId: number]: number };
  products: { [productId: number]: Product }; // Add products prop
}
const CartSideMenu: React.FC<CartSideMenuProps> = ({ open, onClose, cart, products }) => {
  const { id } = useParams<{ id: string }>();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const totalPrice = Object.entries(cart).reduce((total, [productId, quantity]) => {
    const product = products[parseInt(productId, 10)]; // Додано параметр radix
    return total + (product ? product.price * quantity : 0);
  }, 0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {

        const photoBlob = await getProductPhoto(Number(id));
        const imageURLS = URL.createObjectURL(photoBlob);
        setImageURL(imageURLS);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [ id]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List sx={{ width: 400 }} >
        <ListItem>
          <ListItemText primary="Cart Contents" />
        </ListItem>
        {Object.entries(cart).map(([productId, quantity]) => {
          const product = products[parseInt(productId, 10)]; // Додано параметр radix
          return (
            <ListItem key={productId} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {imageURL && (
                <CardMedia
                  component="img"
                  height="400"
                  image={imageURL}
                  alt={product?.name || 'Product Image'}
                />
              )}
              <ListItemText
                primary={product ? product.name : "Unknown Product"}
                secondary={
                  <>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary">
                      Quantity: {quantity}
                    </Typography>
                    <br />
                  </>
                }
              />
            </ListItem>
          );
        })}
        <ListItem>
          <ListItemText primary={`Total Price: $${totalPrice.toFixed(2)}`} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default CartSideMenu;
