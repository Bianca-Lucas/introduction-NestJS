import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty} from "class-validator"

export class CreateUserDto {
    
    @ApiProperty({
        example: 'Bianca Lucas',
        description: 'Nome completo do usuário'
    })
    @IsNotEmpty({message: "O nome é obrigatório!"})
    name: string

    @ApiProperty({
        example: 'bianca@gmail.com',
        description: 'Email do usuário'
    })
    @IsEmail({}, {message: 'O email deve ser um endereço válido!'})
    email: string 
}