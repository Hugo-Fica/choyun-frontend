import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import bcrypt from 'bcrypt'
import dayjs from 'dayjs'

export async function GET() {
  try {
    const usuarios = await prisma.users.findMany({
      include: { role: { select: { name: true } } }
    })
    if (usuarios.length < 1) return NextResponse.json({ message: 'No se encontraron usuarios' })
    const usuariosFinal = usuarios.map(({ password, role_id, ...u }) => {
      const adjustedDate = dayjs(u?.birthday).add(4, 'hour')
      const formattedBirthday = adjustedDate.format('DD/MM/YYYY')
      return {
        ...u,
        role: u.role?.name,
        birthday: formattedBirthday
      }
    })
    return NextResponse.json({ usuarios: usuariosFinal })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Hubo un error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, names, lastnames, password, age, phone, role_id, birthday } = await req.json()
    if (!email || !names || !lastnames || !password || !age || !phone || !role_id || !birthday) {
      return NextResponse.json(
        {
          message:
            'Error no se proporciono el nombres o apellidos o contraseña o edad o número de celular o el rol del usuario'
        },
        { status: 400 }
      )
    }
    const existeUsuario = await prisma.users.findFirst({ where: { email } })
    if (existeUsuario)
      return NextResponse.json({ message: 'El correo electrónico ya se encuentra registrado' })
    const hashedPassword = await bcrypt.hash(password, 10)
    const nuevoUsuario = await prisma?.users.create({
      data: {
        email,
        names,
        lastnames,
        password: hashedPassword,
        age,
        phone,
        role_id,
        birthday: new Date(birthday)
      }
    })
    if (nuevoUsuario) return NextResponse.json({ message: 'Usuario creado' })
  } catch (error) {
    return NextResponse.json({ error: 'Hubo un error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, email, names, lastnames, password, new_password, phone, role_id } = await req.json()
    if (!id || !email || !names || !lastnames || !password || !new_password || !phone || !role_id) {
      return NextResponse.json(
        { message: 'Error no se proporciono el nombre o descripción del usuario' },
        { status: 400 }
      )
    }
    const existeUsuario = await prisma.users.findFirst({ where: { id } })
    if (!existeUsuario) return NextResponse.json({ message: 'No existe el usuario' })
    const isValidPassword = await bcrypt.compare(password, existeUsuario.password)
    if (!isValidPassword) return NextResponse.json({ message: 'La contraseña no es correcta' })
    const hashedPassword = await bcrypt.hash(new_password, 10)
    const editarUsuario = await prisma?.users.update({
      where: { id },
      data: { email, names, lastnames, password: hashedPassword, phone, role_id }
    })
    if (!editarUsuario) return NextResponse.json({ message: 'No se pudo actualizar el usuario' })
    if (editarUsuario) return NextResponse.json({ message: 'Se actualizo el usuario' })
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json(
        { message: 'Error no se proporciono el id del usuario' },
        { status: 400 }
      )
    }
    const existeUsuario = await prisma.users.findFirst({ where: { id } })
    if (!existeUsuario) return NextResponse.json({ message: 'No existe el usuario' })
    const eliminarUsuario = await prisma?.users.delete({ where: { id } })
    if (!eliminarUsuario) return NextResponse.json({ message: 'No se pudo eliminar el usuario' })
    if (eliminarUsuario) return NextResponse.json({ message: 'Se elimino el usuario' })
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}
