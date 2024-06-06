'use client';

import {useState, useEffect} from "react";

import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";

import {token} from "../../utils/axios";
import {getProducts} from "../../api/ProductRequest";

interface Product {
  objectID: string;
  name: string;
  price: number;
  categories: { id: number; name: string }[];
  description: string;
}

export default function PricingView() {
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts(token);
        if (response.status === 401) {
          console.error("Authorization failed");
        } else {
          const productsData = await response.json();
          console.log("Products:", productsData);
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ pt: 15, pb: 10, minHeight: 1 }}>
      {products.map((product) => (
        <Card key={product.objectID} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Categories:{" "}
              {product.categories.map((category) => category.name).join(", ")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description: {product.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};
