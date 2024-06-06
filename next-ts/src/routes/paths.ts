import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  HOME: '/',
  SHOP: '/shop'
};

// ----------------------------------------------------------------------

export const paths = {
  addproduct:'/shop/addproduct',
  d:'/dashboard',
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  components: '/components',
  docs: 'https://taras-partpholio.vercel.app/',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id: string) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title: string) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },

  // AUTH
  shop:{
    hs: `${ROOTS.HOME}`,
  },
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
  },
  // DASHBOARD
  home: {
    go: ROOTS.SHOP,
    chat: `${ROOTS.SHOP}/chat`,


    user: {
      profile: `${ROOTS.HOME}/user`,
      new: `${ROOTS.HOME}/user/new`,
      list: `${ROOTS.HOME}/user/list`,
      cards: `${ROOTS.HOME}/user/cards`,
      account: `${ROOTS.HOME}/user/account`,
      edit: (id: string) => `${ROOTS.HOME}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.HOME}/user/${MOCK_ID}/edit`,
      },
    },
    product: {
      root: `${ROOTS.SHOP}`,
      new: `${ROOTS.SHOP}/add-product`,
      list: `${ROOTS.SHOP}/list-product`,
      edit: (id: string) => `${ROOTS.SHOP}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.SHOP}/product/${MOCK_ID}`,
        edit: `${ROOTS.SHOP}/product/${MOCK_ID}/edit`,
      },
    },

    order: {
      root: `${ROOTS.HOME}/order`,
      details: (id: string) => `${ROOTS.HOME}/order/${id}`,
      demo: {
        details: `${ROOTS.HOME}/order/${MOCK_ID}`,
      },
    },
  },
};
