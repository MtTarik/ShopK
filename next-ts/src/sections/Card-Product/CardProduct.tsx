"use client"

import React, {useState, useEffect} from "react";

import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {Grid, Button, TextField} from "@mui/material";
import Select, {SelectChangeEvent} from "@mui/material/Select";

import Image from 'src/components/image';

import {paths} from "../../routes/paths";
import {useTranslate} from "../../locales";
import Iconify from "../../components/iconify";
import {RouterLink} from "../../routes/components";
import {getCategories} from "../../api/CategoryRequest";
import ComponentHero from "../_examples/component-hero";
import {useSettingsContext} from "../../components/settings";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import {Category, getProducts, getProductPhoto} from "../../api/ProductRequest";
import {useSnackbar} from "../../components/snackbar";


export interface Product {
  objectID: number;
  name: string;
  price: number;
  categories: { id: number; name: string }[];
  description: string;
  image: string;
}

export default function CardProduct() {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const settings = useSettingsContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string[]>([]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || '' : '';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await getCategories(token);
        if (categoriesResponse.status === 401) {
          throw new Error('Unauthorized');
        }
        setCategories(categoriesResponse);
      } catch (errorC) {
        setError((prevErrors) => [...prevErrors, errorC.message || 'Error occurred while fetching categories']);
      }
    };
    fetchCategories();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await getProducts(token);
        if ('status' in productsResponse && productsResponse.status === 401) {
          console.log('Unauthorized');
        } else {
          const productsWithPhotos = await Promise.all(
            productsResponse.map(async (product: Product) => {
              const photoBlob = await getProductPhoto(product.objectID);
              const imageURL = URL.createObjectURL(photoBlob);
              return { ...product, image: imageURL };
            })
          );
          setProducts(productsWithPhotos);
        }
      } catch (errorP) {
        console.error("Error fetching products:", errorP);
      }
    };

    fetchData();
  }, [token]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };
  const filteredProducts = products.filter((product) =>
    (selectedCategory === 'all' || product.categories.some(cat => cat.name === selectedCategory)) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box sx={{ marginBottom: 2 }}>
      <ComponentHero>
        <CustomBreadcrumbs
          heading={t('shop')}
          links={[
            {
              name: t('shop'),
              href: paths.home.go,
            },
          ]}

        />
      </ComponentHero>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label={t('search')}
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="category-select-label">{t('categories')}</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
            fullWidth
          >
            <MenuItem value="all">{t('all')}</MenuItem>
            {Array.isArray(categories) && categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {filteredProducts.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No products found
        </Typography>
      ) : (
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid key={product.objectID} item xs={12} sm={6} md={10} lg={3} xl={2}>
                <Card sx={{ p: 1, width: '100%' }}>
                  <Box sx={{ position: 'relative' }}>
                    <Tooltip title={product.name} placement="bottom">
                      <Image
                        src={product.image}
                        alt={product.name}
                        height={200}
                        style={{ borderRadius: 5, width: '100%' }}
                      />
                    </Tooltip>
                    <Fab
                      color="warning"
                      size="small"
                      className="add-cart-btn"
                      sx={{ position: 'absolute', right: 8, bottom: 8, opacity: 0, transition: 'opacity 0.3s' }}
                      onClick={() => console.log('Add to cart clicked')}
                    >
                      <Iconify icon="solar:cart-plus-bold" width={16} />
                    </Fab>
                  </Box>
                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link component={RouterLink} href={`/shop/${product.objectID}`} color="inherit" variant="subtitle2" noWrap>
                      {product.name}
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {t('price')}: ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('categories')} : {
                      product.categories.length > 2 ?
                        `${product.categories[0].name}, ${product.categories[1].name}...` :
                        product.categories.map((category) => category.name).join(', ')
                    }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('description')}: {product.description}
                    </Typography>
                    <Button>{t('add_to_cart')}</Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
      )}
    </Container>


  );
}
