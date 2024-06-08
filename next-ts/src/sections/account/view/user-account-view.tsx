'use client';

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _userPayment, _userInvoices, _userAddressBook } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import {useTranslate} from "../../../locales";
import AccountGeneral from '../account-general';
import AccountBilling from '../account-billing';
import AccountNotifications from '../account-notifications';
import AccountChangePassword from '../account-change-password';


export default function AccountView() {
  const settings = useSettingsContext();
  const { t } = useTranslate();

  const TABS = [
    {
      value: 'general',
      label: t('general') ,
      icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
  ];

  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Account"
        links={[
          { name: t('shop'), href: '/shop' },
          { name: t('user'), href: paths.home.user.profile },
          { name: t('account') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {currentTab === 'general' && <AccountGeneral />}

      {currentTab === 'billing' && (
        <AccountBilling
          cards={_userPayment}
          invoices={_userInvoices}
          addressBook={_userAddressBook}
        />
      )}

      {currentTab === 'notifications' && <AccountNotifications />}

      {currentTab === 'security' && <AccountChangePassword />}
    </Container>
  );
}
