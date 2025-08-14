import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CloudinaryService } from './cloudinary.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { File as MulterFile } from 'multer'
import { Express } from 'express'; 
import { UpdatePlaceDto } from './dto/uptade-place.dto';

@Controller('places')
export class PlaceController {
    constructor(
        private placeService: PlaceService,
        private cloudinaryService: CloudinaryService,
    ) {}

    @Get()
    @ApiOperation({summary: 'Listar todos os locais'})
    findAll(){
        return this.placeService.findAll()
    }

    @Get('paginated')
    @ApiOperation({summary: 'Listar locais paginados'})
    findPaginated(
        @Param('page') page: number = 1,
        @Param('limit') limit: number = 10
    ) {
        return this.placeService.findPaginated(page, limit);
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([{name: 'images', maxCount: 3}]))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({summary: 'Cadastrar novo local com imagens'})
    @ApiBody({
        description: 'Formulário com os dados do local + imagens',
        schema: {
            type: 'object',
            required: ['name', 'type', 'phone', 'latitude', 'longitude', 'images'],
            properties: {
                name: {type: 'string', example: 'Praça Central'},
                type: {type: 'string', enum: ['RESTAURANTE', 'BAR', 'HOTEL', 'PIZZARIA', 'ACAI', 'SORVETERIA']},
                phone: {type: 'string', example: '(88) 99999-9999'},
                latitude: {type: 'number', example: -3.7327},
                longitude: {type: 'number', example: -38.52670},
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                    description: 'Máximo de 3 imagens.'
                }
            }
        }
    })
    @ApiResponse({status: 201, description: 'Place criado com sucesso'})
    async create(
        @Body() data: CreatePlaceDto,
        @UploadedFiles() files: {images?: Express.Multer.File[]},
    ) {
        if(!files.images || files.images.length === 0) {
            throw new BadRequestException('Pelo menos uma imagem deve ser enviada')
        }

        const imageUrls = await Promise.all(
            files.images.map((file) => this.cloudinaryService.uploadImage(file.buffer))
        )

        return this.placeService.create({
            ...data,
            images: imageUrls,
        })
    }

    @Put(':id')
    @UseInterceptors(FileFieldsInterceptor([{name: 'images', maxCount: 3}]))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({summary: 'Atualizar local com ou sem novas imagens'})
    @ApiBody({
        description: 'Formulário com dados opcionais do local a serem atualizados. Se enviar imagens, elas substituirão as anteriores.',
        schema: {
            type: 'object',
            required: ['name', 'type', 'phone', 'latitude', 'longitude', 'images'],
            properties: {
                name: {type: 'string', example: 'Praça Central'},
                type: {type: 'string', enum: ['RESTAURANTE', 'BAR', 'HOTEL', 'PIZZARIA', 'ACAI', 'SORVETERIA']},
                phone: {type: 'string', example: '(88) 99999-9999'},
                latitude: {type: 'number', example: -3.7327},
                longitude: {type: 'number', example: -38.52670},
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                    description: 'Máximo de 3 imagens.'
                }
            }
        }})
    @ApiResponse({status: 200, description: 'Place atualizado com sucesso'})
    async updatePlace(
        @Param('id') id: string,
        @Body() data: UpdatePlaceDto,
        @UploadedFiles() files: {images?: Express.Multer.File[]}
    ) {
        const newImages = files.images?.map(file => file.buffer)
        return this.placeService.update(id, data, newImages)
    }

    @Delete(':id')
    @ApiOperation({summary: 'Deletar local e imagens no Cloudinary'})
    @ApiResponse({status: 200, description: 'Place deletado com sucesso'})
    async deletePlace(@Param('id') id: string) {
        this.placeService.delete(id)
    }
}