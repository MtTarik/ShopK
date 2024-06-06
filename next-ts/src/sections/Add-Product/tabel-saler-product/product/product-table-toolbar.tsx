import { useState, useCallback } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { IProductTableFilters, IProductTableFilterValue } from 'src/types/product';

export type CategoryOption = {
  id: number;
  name: string;
};

type ProductTableToolbarProps = {
  filters: IProductTableFilters;
  onFilters: (name: string, value: IProductTableFilterValue) => void;
  categoryOptions: CategoryOption[];
};

export default function ProductTableToolbar({
                                              filters,
                                              onFilters,
                                              categoryOptions,
                                            }: ProductTableToolbarProps) {
  const popover = usePopover();
  const [categories, setCategories] = useState<string[]>(
    filters.categories ? filters.categories.flat().map((category) => category.name) : []
  );

  const handleChangeCategories = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const {
        target: { value },
      } = event;
      setCategories(typeof value === 'string' ? value.split(',') : value);
    },
    [setCategories]
  );

  const handleCloseCategories = useCallback(() => {
    const selectedCategories: IProductTableFilterValue = categories.map((categoryName) => {
      const category = categoryOptions.find(option => option.name === categoryName);
      return category ? { id: category.id, name: categoryName } : { id: -1, name: categoryName };
    });
    onFilters('categories', selectedCategories);
  }, [onFilters, categories, categoryOptions]);

  return (
    <>
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel>Категорії</InputLabel>
        <Select
          multiple
          value={categories}
          onChange={handleChangeCategories}
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) => selected.map((value) => value).join(', ')}
          onClose={handleCloseCategories}
          sx={{ textTransform: 'capitalize' }}
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              <Checkbox disableRipple size="small" checked={categories.includes(option.name)} />
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top" sx={{ width: 140 }}>
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}
