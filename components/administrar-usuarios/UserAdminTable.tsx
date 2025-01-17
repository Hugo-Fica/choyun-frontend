'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { useUsers } from '@/hooks/useUsers'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/store/useUserStore'
import { User } from '@/types/user'
import { DataTablePagination } from '../DataTablePagination'

export const UserAdminTable = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const { getUsers } = useUsers()
  const setUsers = useUserStore((state) => state.setUsers)
  const users = useUserStore((state) => state.users)

  const { data: userData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'names',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Nombres <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className='capitalize pl-4'>{row.getValue('names')}</div>
    },
    {
      accessorKey: 'lastnames',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Apellidos <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className='capitalize pl-4'>{row.getValue('lastnames')}</div>
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            variant='ghost'>
            Email <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className='capitalize pl-4'>{row.getValue('email')}</div>
    },
    {
      accessorKey: 'phone',
      header: 'Telefono',
      cell: ({ row }) => <div className='capitalize '>{row.getValue('phone')}</div>
    },
    {
      accessorKey: 'role',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Permiso <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className='capitalize pl-4'>{row.getValue('role')}</div>
    },
    {
      accessorKey: 'age',
      header: 'Edad',
      cell: ({ row }) => <div className='capitalize pl-1'>{row.getValue('age')}</div>
    },
    {
      accessorKey: 'birthday',
      header: 'Cumpleaños',
      cell: ({ row }) => <div className='capitalize '>{row.getValue('birthday')}</div>
    }
  ]

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  useEffect(() => {
    if (userData) setUsers(userData)
  }, [isLoadingUsers, userData, setUsers])

  return (
    <div className='w-full'>
      <div className='flex items-center py-4 gap-4'>
        <Input
          placeholder='Filtrar nombres...'
          value={table.getColumn('names')?.getFilterValue() as string}
          onChange={(event) => table.getColumn('names')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <Input
          placeholder='Filtrar apellidos...'
          value={table.getColumn('lastnames')?.getFilterValue() as string}
          onChange={(event) => table.getColumn('lastnames')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <Input
          placeholder='Filtrar correo...'
          value={table.getColumn('email')?.getFilterValue() as string}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='ml-auto'>
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='my-10 max-h-[510px]  overflow-y-auto rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-center space-x-2 py-4'>
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
