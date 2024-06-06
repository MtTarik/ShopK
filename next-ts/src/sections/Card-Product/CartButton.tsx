// CartButton.tsx
import React from 'react';

import { Badge } from '@mui/material';

import { useCart } from './addToCart';

const CartButton: React.FC = () => {
  const { cart } = useCart();
  const totalItems = Object.values(cart).reduce((acc, curr) => acc + curr, 0);

  return (

      <Badge  sx={{ mt: 2 }} badgeContent={totalItems} color="primary">
        Кошик
      </Badge>
  );
};

export default CartButton;
