'use client';

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import {paths} from "../../../routes/paths";
import {useTranslate} from "../../../locales";
import Iconify from "../../../components/iconify";
import {RouterLink} from "../../../routes/components";
import {useSettingsContext} from "../../../components/settings";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import {ProductListView} from "../../../sections/Add-Product/tabel-saler-product/product/view";


export default function ProductListPage() {
  const settings = useSettingsContext();
  const { t } = useTranslate();

  return(

    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading={t('list')}
        links={[
          { name: t('shop'), href: '/shop' },
          { name: t('list'), href: '/list' },
        ]}
        action={
          <Button component={RouterLink} href={paths.home.product.new} variant="contained" startIcon={<Iconify icon="mingcute:add-line" />}>
            {t('new')}
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <ProductListView />
    </Container>
  )
}
