'use client';

import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {
  DataGrid,
  GridColDef,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridRowSelectionModel,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';

import {IProductTableFilters} from 'src/types/product';

import {Product} from "../../../../Card-Product/CardProduct";
import {getCategories} from "../../../../../api/CategoryRequest";
import { deleteCartItem} from "../../../../../api/CartItemsRequest";
import ProductTableFiltersResult from '../product-table-filters-result';
import ProductTableToolbar, {CategoryOption} from '../product-table-toolbar';
import {getProductPhoto, getSellerProducts} from "../../../../../api/ProductRequest";
import {
  RenderCellStock,
  RenderCellPrice,
  RenderCellProduct,
  RenderCellCategory, RenderCellCreatedAt,
} from '../product-table-row';



const defaultFilters = {
  categories: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

export default function ProductListView() {
  const { enqueueSnackbar } = useSnackbar();
  const confirmRows = useBoolean();
  const router = useRouter();
  const settings = useSettingsContext();
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [tableData, setTableData] = useState<Product[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(HIDE_COLUMNS);
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') || '' : '';
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || '' : '';

  console.log(categoryOptions)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSellerProducts(token, username);
        if (response.status === 401) {
          console.error('Unauthorized request');
          return;
        }
        const data = await response; // Assuming the API returns a JSON response
        console.log('Fetched cart items:', data);

        const productsWithPhotos = await Promise.all(
          data.map(async (product: Product) => {
            const photoBlob = await getProductPhoto(product.objectID);
            const imageURL = URL.createObjectURL(photoBlob);
            return { ...product, categories: product.categories.map((category: any) => category.name), image: imageURL };
          })
        );

        const productsWithIds = productsWithPhotos.map((product, index) => ({ ...product, id: product.objectID }));

        // Встановіть дані для DataGrid з унікальними id
        setCartItems(productsWithIds);
        setTableData(productsWithIds);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchData();
  }, [token, username]);


  useEffect(() => {
    setTableData(cartItems);
  }, [cartItems]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(token);
        if (response.status === 401) {
          console.error('Unauthorized request');
          return;
        }
        const data = await response.json();
        const categories = data.map((category: any) => ({ id: category.id, name: category.name }));
        setCategoryOptions(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [token]);

  const handleDelete = async (cartId: number) => {
    try {
      const response = await deleteCartItem(token, cartId);
      if (response.status === 401) {
        console.error('Unauthorized request');
        return;
      }
      const data = await response.json();
      console.log('Deleted item:', data);
      enqueueSnackbar('Delete success!');

      const updatedCartItems = cartItems.filter(item => item.objectID !== cartId);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const handleFilters = useCallback((name: string, selectedCategoryIds: CategoryOption[]) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: selectedCategoryIds,
    }));
  }, []);




  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDeleteRow = useCallback(
    (id: number) => {
      const deleteRow = tableData.filter((row) => row.objectID !== id);
      enqueueSnackbar('Delete success!');
      setTableData(deleteRow);
    },
    [enqueueSnackbar, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.objectID));
    enqueueSnackbar('Delete success!');
    setTableData(deleteRows);
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id: number) => {
      router.push(paths.home.go);
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: number) => {
      router.push(paths.home.go);
    },
    [router]
  );

  const columns: GridColDef[] = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },
    {
      field: 'name',
      headerName: 'Product',
      flex: 1,
      minWidth: 360,
      hideable: false,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },
    {
      field: 'categories', // Встановлюємо поле як 'categories'
      headerName: 'Category', // Назва колонки
      flex: 1,
      minWidth: 200,
      hideable: false,
      renderCell: (params) => <RenderCellCategory params={params} />, // Використовуємо компонент RenderCellCategory
    },
    {
      field: 'createdAt',
      headerName: 'Create at',
      width: 160,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      field: 'inventoryType',
      headerName: 'Stock',
      width: 160,
      type: 'singleSelect',
      valueOptions: PRODUCT_STOCK_OPTIONS,
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellPrice params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => handleViewRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(params.row.id);
          }}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>


        <Card sx={{ height: { xs: 800, md: 2 }, flexGrow: { md: 1 }, display: { md: 'flex' }, flexDirection: { md: 'column' } }}>
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            onRowSelectionModelChange={(newSelectionModel) => {
              setSelectedRowIds(newSelectionModel);
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: () => (
                <>
                  <GridToolbarContainer>
                    <ProductTableToolbar filters={filters} onFilters={handleFilters} categoryOptions={categoryOptions} />
                    <GridToolbarQuickFilter />
                    <Stack spacing={1} flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end">
                      {!!selectedRowIds.length && (
                        <Button size="small" color="error" startIcon={<Iconify icon="solar:trash-bin-trash-bold" />} onClick={confirmRows.onTrue}>
                          Delete ({selectedRowIds.length})
                        </Button>
                      )}
                      <GridToolbarColumnsButton />
                      <GridToolbarFilterButton />
                      <GridToolbarExport />
                    </Stack>
                  </GridToolbarContainer>
                  {canReset && (
                    <ProductTableFiltersResult filters={filters} onFilters={handleFilters} onResetFilters={handleResetFilters} results={dataFiltered.length} sx={{ p: 2.5, pt: 0 }} />
                  )}
                </>
              ),
              noRowsOverlay: () => <EmptyContent title="No Data" />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              columnsPanel: {
                getTogglableColumns,
              },
            }}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong>{selectedRowIds.length}</strong> items?
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={() => { handleDeleteRows(); confirmRows.onFalse(); }}>
            Delete
          </Button>
        }
      />
    </>
  );
}

function applyFilter({
                       inputData,
                       filters,
                     }: {
  inputData: Product[];
  filters: IProductTableFilters;
}) {
  const { categories } = filters;

  if (categories.length) {
    inputData = inputData.filter((product) => {
      const productCategoryIds = product.categories.map(category => category.id);
      return productCategoryIds.some(categoryId => categories.map(category => category.id).includes(categoryId));
    });
  }

  return inputData;
}
