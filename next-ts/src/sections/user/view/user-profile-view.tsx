'use client';

import {useState, useEffect, useCallback} from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';


import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
import {useTranslate} from "../../../locales";
import {IUserProfile} from "../../../types/user";
import {getUserInfo, getUserPhoto} from "../../../api/UserRequest";
import {ProductListView} from "../../Add-Product/tabel-saler-product/product/view";






// ----------------------------------------------------------------------

export default function UserProfileView() {
  const { t } = useTranslate();
  const settings = useSettingsContext();
  const [userInfo, setUserInfo] = useState<IUserProfile | null>(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  const [searchFriends, setSearchFriends] = useState('');
  const [currentTab, setCurrentTab] = useState('profile');


  const TABS = [
    {
      value: 'profile',
      label: t('edit_profile'),
      icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
    {
      value: 'gallery',
      label: t('created_items'),
      icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
    },
  ];

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      getUserInfo(username).then(setUserInfo);
      getUserPhoto(username).then(photoBlob => {
        if (photoBlob) {
          setUserPhotoUrl(URL.createObjectURL(photoBlob as Blob));
        }
      });
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUserPhotoUrl(URL.createObjectURL(e.target.files[0] as Blob));
    }
  };

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const handleSearchFriends = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFriends(event.target.value);
  }, []);

  if (!userInfo) return null; // Or a loading indicator

  const displayName = userInfo.firstName && userInfo.lastName
    ? `${userInfo.firstName} ${userInfo.lastName}`
    : userInfo.email;
  const role = userInfo.roles && userInfo.roles.length > 0
    ? userInfo.roles[0].name
    : 'No role';
  return (
    <>
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('profile')}
        links={[
          { name: t('shop'), href: '/shop' },
          { name: displayName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover
          role={role}
          name={displayName}
          avatarUrl={userPhotoUrl}
        />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>

      {currentTab === 'profile' && <ProfileHome info={userInfo}  />}

    </Container>
      {currentTab === 'gallery' && <ProductListView />}
    </>
  );
}
