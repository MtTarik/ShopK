import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      {
        subheader: t('management'),
        items: [
          // USER
          {
            title: t('user'),
            path: paths.home.user.profile,
            icon: ICONS.user,
            children: [
              { title: t('profile'),             path: paths.home.user.profile,
              },
              { title: t('edit'), path: paths.home.user.demo.edit },
            ],
          },
          // PRODUCT

          {
            title: t('product'),
            path: paths.home.product.root,
            icon: ICONS.product,
            children: [
              { title: t('list'), path: paths.home.product.list },
              { title: t('create'), path: paths.home.product.new },
              { title: t('edit'), path: paths.home.product.demo.edit },
            ],
          },
          // ORDER
          {
            title: t('order'),
            path: paths.home.order.root,
            icon: ICONS.order,
            children: [
              { title: t('list'), path: paths.home.order.root },
            ],
          },

        ],
      },

    ],
    [t]
  );

  return data;
}
