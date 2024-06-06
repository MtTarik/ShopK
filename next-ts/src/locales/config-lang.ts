'use client';

import merge from 'lodash/merge';
// date fns
import {
  enUS as enUSAdapter,
  uk as ukUAAdapter,
} from 'date-fns/locale';

// date pickers (MUI)
import {
  enUS as enUSDate,
  ukUA as ukUADate,
} from '@mui/x-date-pickers/locales';
// core (MUI)
import {
  enUS as enUSCore,
  ukUA as ukUACore,
} from '@mui/material/locale';
// data grid (MUI)
import {
  enUS as enUSDataGrid,
  ukUA as ukUADataGrid,
} from '@mui/x-data-grid';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'Англіська',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
    numberFormat: {
      code: 'en-US',
      currency: 'USD',
    },
  },

  {
    label: 'Українська', // Додана українська мова
    value: 'uk',
    systemValue: merge(ukUADate, ukUADataGrid, ukUACore),
    adapterLocale: ukUAAdapter,
    icon: 'flagpack:ua',
    numberFormat: {
      code: 'uk',
      currency: 'UAH',
    },
  },
];

export const defaultLang = allLangs[0]; // English
