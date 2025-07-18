import { Body, Get, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {User, Prisma} from '@prisma/client'

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService) {}

    async create(data: Prisma.UserCreateInput): Promise <User> {
        return this.prisma.user.create({data})
    }

    async findAll() : Promise <User[]> {
        return this.prisma.user.findMany()
    }

    async findOne(id: string) : Promise <User | null>  {
        const foundUser = await this.prisma.user.findUnique(
            {where: {id}}
        )
        if (!foundUser) {
            throw new NotFoundException(`

                Usuário com o  ${id} fornecido não existente!

                `)
        }
        return foundUser
    }
    
    async UpdateUser(id: string, data: Prisma.UserUpdateInput): Promise <User | null> {
        try {
            return await this.prisma.user.update({where: {id}, data})
        } catch {
                throw new NotFoundException(`
    
                    Usuário com o  ${id} fornecido não existente!
    
                    `)
        }
    }

    async remove(id: string): Promise <User | null> {
        try {
            return await this.prisma.user.delete({where: {id}})
        } catch {
            throw new NotFoundException(`
    
                Usuário com o  ${id} fornecido não existente!
    
                `)
        }
    }
}