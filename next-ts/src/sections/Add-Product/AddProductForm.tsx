"use client"


import Image from "next/image";
import React, {useRef, useState, useEffect} from "react";

import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import CardHeader from "@mui/material/CardHeader";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";

import {useTranslate} from "../../locales";
import {useSnackbar} from "../../components/snackbar";
import {getCategories} from "../../api/CategoryRequest";
import {useSettingsContext} from "../../components/settings";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import {Category, addProduct, setProductPhoto} from "../../api/ProductRequest";




const AddProductForm: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || '' : '';
  const settings = useSettingsContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      setImage(files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setImageURL(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError([]);
    setIsSuccess(false);
    setLoading(true);

    const categoriesDTO = selectedCategories.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? { id: category.id, name: category.name } : null;
    }).filter((cat) => cat !== null) as Category[];

    try {
      const productResponse = await addProduct(token, name, categoriesDTO, Number(price), description);
      enqueueSnackbar(t('you_have_added_a_product'));

      if (productResponse.status === 401) {

        enqueueSnackbar(t('something_is_wrong'), { variant: 'error' });
        throw new Error('Unauthorized');
      }

      const productData = productResponse;

      const productId = productData.id;

      if (image) {
        const photoResponse = await setProductPhoto(token, productId, image);

        if (photoResponse.status === 401) {
          enqueueSnackbar(t('something_is_wrong'), { variant: 'error' });
          throw new Error('Unauthorized');
        }
      }

      setIsSuccess(true);
      setName('');
      setPrice('');
      setDescription('');
      setSelectedCategories([]);
      setImage(null);
      setImageURL(null);
    } catch (err) {
      setError((prevErrors) => [...prevErrors, err.message || 'Error occurred']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Створення товару"
        links={[
          { name: t('shop'), href: '/shop' },
          { name: t('add_to_product'), href: '/add-product' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CardHeader
        title="Заповніть форму"
        sx={{
          mb: 2,
        }}
      />


        <Grid item xs={12} md={8}>
          <Card>
            <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
              <TextField
                id="name"
                label="Назва Товару"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                id="price"
                label="Ціна товару"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                id="description"
                label="Опис"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
              />
              <FormControl
                sx={{
                  mt:2,
                }}
                fullWidth required>
                <InputLabel>Категорії</InputLabel>
                <Select

                  label="Категорії"
                  id="categories"
                  multiple
                  value={selectedCategories}
                  onChange={(e) => setSelectedCategories(e.target.value as number[])}
                >
                  {Array.isArray(categories) && categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}

                </Select>
              </FormControl>
              <Box
                component="div"
                sx={{
                  mt: 5,
                }}
              >

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{display: 'none'}}
                />
                <Button
                  sx={{
                    mr:2,
                  }}
                  component="label"
                  variant="contained"
                  color="primary"
                >
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{display: 'none'}}
                  />
                </Button>

                <Button

                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit"/> : 'Submit'}
                </Button>
              </Box>

              {imageURL && (
                <Image
                  style={{
                    marginTop: 12,
                    borderRadius: 8,
                  }}
                  src={imageURL}
                  alt="Product"
                  width={200}
                  height={200}
                />
              )}
            </form>

          </Card>
        </Grid>
    </Container>

  );
};

export default AddProductForm;
