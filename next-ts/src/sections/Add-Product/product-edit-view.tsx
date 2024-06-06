'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetProduct } from 'src/api/product';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';


// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function ProductEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { product: currentProduct } = useGetProduct(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Shop', href: paths.home.go },
          {
            name: 'Product',
            href: paths.home.product.root,
          },
          { name: currentProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
    </Container>
  );
}
