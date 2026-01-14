import {
    Injectable,
    ConflictException,
    UnauthorizedException,
    NotFoundException
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }


    async register(registerDto: RegisterDto) {

        const existingUser = this.usersService.findByEmail(registerDto.email);

        if (existingUser) {
            throw new ConflictException('El email ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(
            registerDto.password,
            10
        );

        const user = this.usersService.create({
            ...registerDto,
            password: hashedPassword,
        });

        const { password, ...userWithoutPassword } = user;

        return {
            message: 'Usuario registrado correctamente',
            user: userWithoutPassword
        };
    }

    async login(loginDto: LoginDto) {

        const user = this.usersService.findByEmail(loginDto.email);

        if (!user) {
            throw new UnauthorizedException(
                'No existe una cuenta registrada con este correo'
            );
        }

        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            user.password
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException(
                'La contraseña ingresada es incorrecta'
            );
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };

        const token = await this.jwtService.signAsync(payload);

        return {
            accessToken: token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        };
    }


    getProfile(userId: string) {

        const user = this.usersService.findById(userId);

        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }
}
