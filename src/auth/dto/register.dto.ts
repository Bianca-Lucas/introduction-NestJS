import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"

export class RegisterUserDto {

    @ApiProperty({
        description: 'O nome completo do turista',
        example: 'Bianca Lucas'
    })
    @IsString()
    name: string

    @ApiProperty({
        description: 'O email válido do turista',
        example: 'bianca@gmail.com'
    })
    @IsEmail({}, {message: 'O email deve ser válido'})
    email: string
    
    @ApiProperty({
        description: 'A senha do turista',
        example: 'Turista123'
    })
    @IsString()
    @MinLength(6, {message: 'A senha deve ter no mínimo 6 caracteres'})
    password: string

}