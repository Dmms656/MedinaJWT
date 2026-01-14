import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsIn,
    MinLength
} from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty({
        message: 'El nombre es obligatorio'
    })
    firstName: string;

    @IsNotEmpty({
        message: 'El apellido es obligatorio'
    })
    lastName: string;

    @IsEmail({}, {
        message: 'El correo electrónico no tiene un formato válido'
    })
    email: string;

    @MinLength(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    })
    password: string;

    @IsOptional()
    @IsIn(['ADMIN', 'USER', 'MODERATOR'], {
        message: 'El rol debe ser ADMIN, USER o MODERATOR'
    })
    role?: string;

    @IsOptional()
    @IsBoolean({
        message: 'El estado activo debe ser verdadero o falso'
    })
    isActive?: boolean;
}
