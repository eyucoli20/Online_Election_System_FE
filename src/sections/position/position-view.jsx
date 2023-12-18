/* eslint-disable import/named */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable spaced-comment */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useMemo } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';

import { useGet } from '../../service/useGet';
import { usePost } from '../../service/usePost';
// import { validateUser } from "../utils/validation";
import { useUpdate } from '../../service/useUpdate';
import { useDelete } from '../../service/useDelete';

function UserPage() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Position Name',
        Cell: ({ cell }) => cell.getValue().split('T')[0],
      },

      {
        accessorKey: 'createdAt',
        header: 'Created At',
        enableEditing: false,
        Cell: ({ cell }) => cell?.getValue()?.split('T')[0],
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        enableEditing: false,
        Cell: ({ cell }) => cell?.getValue()?.split('T')[0],
      },
    ],
    []
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } = usePost('/api/v1/positions');
  //call READ hook
  const {
    data: fetchedUsers,
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGet('/api/v1/positions');
  // eslint-disable-next-line spaced-comment
  //call read hook of role api

  // eslint-disable-next-line spaced-comment
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdate('/api/v1/positions');
  //call DELETE hook
  const { isPending: isDeletingUser } = useDelete();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    // setValidationErrors({});

    const transformedData = {
      name: values.name,
    };
    await createUser(transformedData);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    // setValidationErrors({});
    const data = {
      fullName: values.fullName,
    };

    await updateUser(data);
    table.setEditingRow(null); //exit editing mode
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers || [],
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    positionActionsColumn: 'last',
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    // onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    // onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Create New Position For Election</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        style={{width:'10%', margin:'5px', padding:'10px',backgroundColor:"green",color:'white'}}
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New Position
      </Button>
    ),

    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Position List
      </Typography>
      <MaterialReactTable table={table} />
    </>
  );
}

export default UserPage;
