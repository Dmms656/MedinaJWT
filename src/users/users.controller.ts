import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) { }

  /* =========================
     CREAR USUARIO
  ==========================*/
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /* =========================
     LISTAR TODOS
  ==========================*/
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /* =========================
     BUSCAR POR ID
  ==========================*/
  @Get(':id')
  findOne(@Param('id') id: string) {

    const user = this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException(
        `Usuario con ID ${id} no encontrado`
      );
    }

    return user;
  }

  /* =========================
     ACTUALIZAR
  ==========================*/
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {

    const user = this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException(
        `Usuario con ID ${id} no encontrado`
      );
    }

    Object.assign(user, updateUserDto);
    return user;
  }

  /* =========================
     ELIMINAR
  ==========================*/
  @Delete(':id')
  remove(@Param('id') id: string) {

    const user = this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException(
        `Usuario con ID ${id} no encontrado`
      );
    }

    this.usersService.delete(id);
    return {
      message: 'Usuario eliminado correctamente'
    };
  }
}
