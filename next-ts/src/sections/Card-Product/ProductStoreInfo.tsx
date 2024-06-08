"use client"

import Image from 'next/image';
import {useParams} from "next/navigation";
import React, {useState, useEffect, useCallback} from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Link from "@mui/material/Link";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import {Grid, CardMedia} from "@mui/material";
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";

import Iconify from 'src/components/iconify';

import {useCart} from "./addToCart";
import {Product} from "./CardProduct";
import CartButton from "./CartButton";
import CartSideMenu from "./CartSideMenu";
import noPhoto from '../../assets/no_photo.jpg'
import {useSettingsContext} from "../../components/settings";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import {getProduct, getProductPhoto, addProductToCart} from "../../api/ProductRequest";
import {useTranslate} from "../../locales";

const ProductStoreInfo: React.FC = () => {
  const settings = useSettingsContext();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslate();

  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart, cart } = useCart(); // Використайте контекст кошика тут
  const [addedToCart, setAddedToCart] = useState<boolean>(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<{ [productId: number]: Product }>({});
  const [currentTab, setCurrentTab] = useState('description');
  const [rating, setRating] = useState<number | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null); // Оголошення imageURL
  const [quantity, setQuantity] = useState<number>(1);
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || '' : '';

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const toggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProduct(token, Number(id));
        setProduct(fetchedProduct);
        setProducts(fetchedProduct);
        const photoBlob = await getProductPhoto(Number(id));
        const imageURLS = URL.createObjectURL(photoBlob);
        setImageURL(imageURLS);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [token, id]);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      setAddedToCart(true);
    } else {
      setAddedToCart(false);
    }
  }, [cart]);


  const handleAddToCart = async () => {
    if (product) {
      const response = await addProductToCart(token,  Number(id), quantity);
      if (response.status === 401) {
        console.error('Unauthorized request');
        return;
      }
      const addedProduct = await response;
      addToCart(addedProduct);
      console.log('Product added to cart:', addedProduct);
    }
  };


  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };


  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mt: 5,
        mb: 15,
      }}
    >
      <CustomBreadcrumbs
        links={[
          { name: t('shop'), href: '/shop' },
          { name: product?.name },
        ]}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {imageURL !== null ? (
            <CardMedia
              component="img"
              height="400"
              image={imageURL}
              alt={product?.name || 'Product Image'}
            />
          ) : (
            <Image src={noPhoto} alt="No photo" width={500} height={300} />
          )}

        </Grid>

        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h5">
            {product?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
            {t('price')}: ${product?.price?.toFixed(2) || 'N/A'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
            {t('categories')}: {product?.categories ? product.categories.map((category) => category.name).join(', ') : 'N/A'}
          </Typography>

          <Link  href="/shop/chart" color="primary"  sx={{ mt: 2 }}>
            {t('go_to_cart')}
          </Link>
          <Stack direction="row" alignItems="center" mt={2}>
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
              Quantity
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                p: 0.5,
                width: 88,
                borderRadius: 1,
                typography: 'subtitle2',
                border: (theme) => `solid 1px ${theme.palette.grey[500]}`,
              }}
            >
              <IconButton
                size="small"
                onClick={handleDecrease}
                disabled={quantity === 1}
                sx={{ borderRadius: 0.75 }}
              >
                <Iconify icon="eva:minus-fill" width={16} />
              </IconButton>
              {quantity}
              <IconButton
                size="small"
                onClick={handleIncrease}
                sx={{ borderRadius: 0.75 }}
              >
                <Iconify icon="mingcute:add-line" width={16} />
              </IconButton>
            </Stack>
          </Stack>



          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="warning"
              variant="contained"
              startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
              onClick={handleAddToCart}
              sx={{
                m:2,
                whiteSpace: 'nowrap' }}
            >
              {t('add_to_cart')}
            </Button>

          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ my: 10 }}>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${theme.palette.grey[500]}08`,
          }}
        >
          <Tab value="description" label="Description" />
          <Tab value="category" label="Category" />

        </Tabs>

        {currentTab === 'description' && (
          <Typography
            sx={{
              m:5,
            }}
          >{product?.description}</Typography>
        )}
        {currentTab === 'category' && (
          <Typography
            sx={{
              m:5,
            }}
          >
            {t('')}  Категорії: {product?.categories ? product.categories.map((category) => category.name).join(', ') : 'N/A'}

          </Typography>
        )}
      </Box>

      <CartSideMenu open={isSideMenuOpen} onClose={toggleSideMenu} cart={cart} products={{ [product?.objectID!]: product! }} />
      <Button onClick={toggleSideMenu} >
        <CartButton />
      </Button>
    </Container>
  );
};



export default ProductStoreInfo;

