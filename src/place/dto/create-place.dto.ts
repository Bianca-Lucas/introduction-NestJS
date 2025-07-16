import { ApiProperty } from "@nestjs/swagger";
import { PlaceType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlaceDto {
    @ApiProperty({example: 'Praça Central'})
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({enum: PlaceType, example: 'RESTAURANTE'})
    @IsEnum(PlaceType)
    type: PlaceType

    @ApiProperty({example: '(88) 99999-9999'})
    @IsString()
    phone: string

    @ApiProperty({example: -3.7327})
    @IsNumber()
    @Type(() => Number)
    latitude: number

    @ApiProperty({example: -38.5267})
    @IsNumber()
    @Type(() => Number)
    longitude: number
}