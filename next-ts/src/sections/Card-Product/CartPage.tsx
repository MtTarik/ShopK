"use client"

import React, { useState, useEffect } from 'react';

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import {Grid, Container, Typography} from '@mui/material';

import {getSellerProducts} from "../../api/ProductRequest";
import {useSettingsContext} from "../../components/settings";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import {getCartItems, deleteCartItem} from "../../api/CartItemsRequest";

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  cartId: number;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const settings = useSettingsContext();
  const username = typeof window !== 'undefined' ?  localStorage.getItem('username') || '' : '';
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || '' : '';
  const items = Array.isArray(cartItems) ? cartItems : [];

  const toggleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems(token, username);
        if (response.status === 401) {
          console.error('Unauthorized request');
          return;
        }
        const data = await response;
        setCartItems(data);
        const calculatedTotalPrice = data.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
        setTotalPrice(calculatedTotalPrice);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [token, username]);

  const handleDelete = async (cartId: number) => {
    try {
      const response = await deleteCartItem(token, cartId);
      if (response.status === 401) {
        console.error('Unauthorized request');
        return;
      }
      const data = await response.json();
      console.log('Deleted item:', data);

      setCartItems(cartItems.filter(item => item.productId !== cartId));
      const updatedTotalPrice = cartItems.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
      setTotalPrice(updatedTotalPrice);
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handlePurchase = async () => {
    try {
        const response = await getSellerProducts(token, username);
        if (response.status === 401) {
          console.error('Unauthorized request');
          return;
        }
        const data = await response;
        console.log('Fetched cart items:', data);

      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Кошик"
        links={[
          { name: 'Home', href: '/' },
          { name: 'Shop', href: '/shop' },
          { name: 'Chart', href: '/chart' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Grid  spacing={3}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {item.cartId}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="subtitle1">
                  Price: ${item.price.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="subtitle1">
                  Total Price: ${(item.price * item.quantity).toFixed(2)}
                </Typography>
                <Button onClick={() => handleDelete(item.cartId)} variant="contained" color="secondary" sx={{ mt: 2 }}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {cartItems.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#fff', zIndex: 999, borderTop: '1px solid #ccc', padding: '10px 20px' }}>
          <Typography variant="subtitle1">Total Price: ${totalPrice.toFixed(2)}</Typography>
          <Button onClick={handlePurchase} variant="contained" color="primary" sx={{ ml: 2 }}>Proceed to Purchase</Button>
        </div>
      )}

      {showSideMenu && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '300px', height: '100%', backgroundColor: '#fff', zIndex: 999 }}>
          <Typography variant="h6">Cart Menu</Typography>
          <Button onClick={toggleSideMenu}>Close</Button>
        </div>
      )}
    </Container>
  );
};

export default CartPage;
