import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { NotFoundException } from "@nestjs/common";

const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    UpdateUser: jest.fn(),
    remove: jest.fn(),
};

describe("User Controller Test", () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it("isso deve criar um usuário", async () => {
        const userDto = { name: "Breny Lucas", email: "breny@gmail.com" };
        mockUsersService.create.mockResolvedValue(userDto);
        const result = await controller.create(userDto);
        expect(result).toEqual(userDto);
        expect(mockUsersService.create).toHaveBeenCalledWith(userDto);
    });

    it("deve listar todos os usuários", async () => {
        const users = [
            { name: "Breny Lucas", email: "brenylucas@gmail.com" },
            { name: "Bianca Lucas", email: "biazinha@gmail.com" },
        ];
        mockUsersService.findAll.mockResolvedValue(users);
        const result = await controller.findAll();
        expect(result).toEqual(users);
        expect(mockUsersService.findAll).toHaveBeenCalled();
    })

    it("deve buscar um usuário por ID", async () => {
        const user = { id: '550e8400-e29b-41d4-a716-446655440000', name: "Breny Lucas", email: "breny@gmail.com" };
        mockUsersService.findOne.mockResolvedValue(user);
        const result = await controller.findOne(user.id);
        expect(result).toEqual(user);
        expect(mockUsersService.findOne).toHaveBeenCalledWith(user.id);
    });

    it("deve lançar NotFoundException ao buscar usuário por ID inexistente", async () => {
        const userId = '550e8400-e29b-41d4-a716-446655440000';
        mockUsersService.findOne.mockRejectedValue(new NotFoundException(`Usuário com o ${userId} fornecido não existente!`));
        
        await expect(controller.findOne(userId)).rejects.toThrow(NotFoundException);
        expect(mockUsersService.findOne).toHaveBeenCalledWith(userId);
    });

    it("deve atualizar um usuário", async () => {
        const userDto = { name: "Breny da Silva", email: "breny@gmail.com" };
        mockUsersService.UpdateUser.mockResolvedValue(userDto);
        const result = await controller.UpdateUser('550e8400-e29b-41d4-a716-446655440000', userDto);
        expect(result).toEqual(userDto);
        expect(mockUsersService.UpdateUser).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440000', userDto);
    });

    it("deve remover um usuário", async () => {
        const user = { id: '550e8400-e29b-41d4-a716-446655440000', name: "Breny Lucas", email: "breny@gmail.com" };
        mockUsersService.remove.mockResolvedValue(user);
        const result = await controller.remove(user.id);
        expect(result).toEqual(user);
        expect(mockUsersService.remove).toHaveBeenCalledWith(user.id);
    });

    it("deve lançar NotFoundException ao remover usuário inexistente", async () => {
        const userId = '550e8400-e29b-41d4-a716-446655440000';
        mockUsersService.remove.mockRejectedValue(new NotFoundException(`Usuário com o ${userId} fornecido não existente!`));
        
        await expect(controller.remove(userId)).rejects.toThrow(NotFoundException);
        expect(mockUsersService.remove).toHaveBeenCalledWith(userId);
    });
});