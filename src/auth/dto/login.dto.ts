import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class LoginDto {
    @ApiProperty({
        description: 'Email do Usuário!',
        example: 'jonasfortes@gmail.com'
    })
    @IsEmail({}, {message: 'O email precisa ser válido!'})
    email: string

    @ApiProperty({
        description: 'Senha do Usuário',
        example: 'Turista123'
    })
    @IsString({message: 'A senha precisa ser textual!'})
    password: string
}