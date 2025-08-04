import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { GoogleService } from './google.auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private googleService: GoogleService){}

    @Post('register')
    @ApiBody({type: RegisterUserDto})
    @ApiCreatedResponse({description: 'Usuário registrado com sucesso!'})
    @ApiConflictResponse({description: 'Email está em uso!'})
    @ApiOperation({summary: 'Registrar novo usuário'})
    async registerUser(@Body() userData: RegisterUserDto) {
        return this.authService.registerUser(userData)
    }

    @Post('login')
    @ApiBody({type: LoginDto})
    @ApiOperation({summary: 'Login do Usuário'})
    async login(@Body() userData: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(userData)
    }

    @Post('google')
    async loginWithGoogle(@Body() body: {idToken: string}){
        const access_token = await this.googleService.verify(body.idToken)

        return {access_token}
    }
}
