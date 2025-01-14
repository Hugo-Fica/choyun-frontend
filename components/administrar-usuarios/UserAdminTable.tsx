'use client'

import { useState } from 'react'
import { Search, Edit2, UserPlus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion, AnimatePresence } from 'framer-motion'

type User = {
  id: string
  name: string
  email: string
  permissions: string[]
}

const initialUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', permissions: ['read', 'write'] },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', permissions: ['read'] },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    permissions: ['read', 'write', 'delete']
  }
]

const allPermissions = ['read', 'write', 'delete', 'admin']

export default function UserAdminTable() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [newUser, setNewUser] = useState({ name: '', email: '', permissions: [] })
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePermissionChange = (userId: string, permission: string) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          const updatedPermissions = user.permissions.includes(permission)
            ? user.permissions.filter((p) => p !== permission)
            : [...user.permissions, permission]
          return { ...user, permissions: updatedPermissions }
        }
        return user
      })
    )
  }

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: String(users.length + 1) }])
      setNewUser({ name: '', email: '', permissions: [] })
    }
  }

  const handleEditUser = () => {
    if (editingUser) {
      setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)))
      setEditingUser(null)
    }
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  return (
    <div className='py-20 px-4 sm:px-6 lg:px-8 bg-purple-400 w-full'>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
        <div className='relative w-full sm:w-64'>
          <Input
            placeholder='Search users...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
          <Search
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={18}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='w-full sm:w-auto'>
              <UserPlus className='mr-2 h-4 w-4' /> Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                {`
                
                Enter the details of the new user here. Click save when you're done.
                
                `}
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='name'
                  className='text-right'>
                  Name
                </Label>
                <Input
                  id='name'
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='email'
                  className='text-right'>
                  Email
                </Label>
                <Input
                  id='email'
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Permissions</Label>
                <div className='col-span-3 flex flex-wrap gap-2'>
                  {allPermissions.map((permission) => (
                    <Badge
                      key={permission}
                      variant={newUser.permissions.includes(permission) ? 'default' : 'outline'}
                      className='cursor-pointer'
                      onClick={() =>
                        setNewUser({
                          ...newUser,
                          permissions: newUser.permissions.includes(permission)
                            ? newUser.permissions.filter((p) => p !== permission)
                            : [...newUser.permissions, permission]
                        })
                      }>
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddUser}>Save User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className='shadow-md rounded-lg overflow-hidden w-auto bg-cyan-200'>
        <ScrollArea className='h-[calc(100vh-200px)]'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[200px]'>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className='text-right'>Permissions</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <TableCell className='font-medium'>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className='text-right'>
                      <div className='flex flex-wrap justify-end gap-1'>
                        {user.permissions.map((permission) => (
                          <Badge
                            key={permission}
                            variant='secondary'>
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'>
                            <Edit2 className='h-4 w-4' />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                          <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                            <DialogDescription>
                              {`
                              Make changes to user details here. Click save when you're done.
                                
                                `}
                            </DialogDescription>
                          </DialogHeader>
                          <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <Label
                                htmlFor='edit-name'
                                className='text-right'>
                                Name
                              </Label>
                              <Input
                                id='edit-name'
                                value={editingUser?.name || user.name}
                                onChange={(e) => setEditingUser({ ...user, name: e.target.value })}
                                className='col-span-3'
                              />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <Label
                                htmlFor='edit-email'
                                className='text-right'>
                                Email
                              </Label>
                              <Input
                                id='edit-email'
                                value={editingUser?.email || user.email}
                                onChange={(e) => setEditingUser({ ...user, email: e.target.value })}
                                className='col-span-3'
                              />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <Label className='text-right'>Permissions</Label>
                              <div className='col-span-3 flex flex-wrap gap-2'>
                                {allPermissions.map((permission) => (
                                  <Badge
                                    key={permission}
                                    variant={
                                      (editingUser || user).permissions.includes(permission)
                                        ? 'default'
                                        : 'outline'
                                    }
                                    className='cursor-pointer'
                                    onClick={() =>
                                      setEditingUser({
                                        ...(editingUser || user),
                                        permissions: (editingUser || user).permissions.includes(
                                          permission
                                        )
                                          ? (editingUser || user).permissions.filter(
                                              (p) => p !== permission
                                            )
                                          : [...(editingUser || user).permissions, permission]
                                      })
                                    }>
                                    {permission}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleEditUser}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='ml-2 text-red-500 hover:text-red-700'>
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                          <DialogHeader>
                            <DialogTitle>Delete User</DialogTitle>
                            <DialogDescription>
                              {`
                              Are you sure you want to delete this user? This action cannot be undone.
                             `}
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant='outline'
                              onClick={() => {}}>
                              Cancel
                            </Button>
                            <Button
                              variant='destructive'
                              onClick={() => handleDeleteUser(user.id)}>
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}
