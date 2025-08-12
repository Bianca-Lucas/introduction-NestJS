import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

const mockPrisma = {
    user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}

describe("UsersService", () => {
    let service: UsersService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: PrismaService, useValue: mockPrisma },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    })

    // -> 1. Teste de Método de Criação
    it("deve criar um usuário", async () => {
        const dto = { name: "Bianca Lucas", email: "bia05@gmail.com" };
        mockPrisma.user.create.mockResolvedValue(dto);
        const result = await service.create(dto as any);
        expect(result).toEqual(dto);
        expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: dto });
    })

    // -> 2. Teste de Listagem de Todos os Usuários
    it("deve listar todos os usuários", async () => {
        const users = [
            { id: '550e8400-e29b-41d4-a716-446655440000', name: "Bianca Lucas", email: "bia05@gmail.com" },
            { id: '550e8400-e29b-41d4-a716-446655440001', name: "Breny Lucas", email: "breny@gmail.com" },
            { id: '550e8400-e29b-41d4-a716-446655440002', name: "Thayro Holanda", email: "thayrin@gmail.com" },
        ];

        mockPrisma.user.findMany.mockResolvedValue(users);
        const result = await service.findAll();
        expect(result).toEqual(users);
        expect(mockPrisma.user.findMany).toHaveBeenCalled();
    })
})