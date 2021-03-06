"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FakeUserRepository_1 = require("@/data/protocols/database/user/fake/FakeUserRepository");
const Createuser_1 = require("./Createuser");
let fakeUserRepository;
let createUser;
const makeFakeRequest = () => ({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
});
describe('# CreateUser use case', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository_1.FakeUserRepository();
        createUser = new Createuser_1.CreateUser(fakeUserRepository);
    });
    it('should throw error if password and passwordConfirmation not match', async () => {
        const promise = createUser.execute({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password',
            passwordConfirmation: 'invalid_password',
        });
        await expect(promise).rejects.toThrow();
    });
    it('should calls UserRepository.findByEmail with correct email', async () => {
        const findByEmailSpy = jest.spyOn(fakeUserRepository, 'findByEmail');
        await createUser.execute(makeFakeRequest());
        expect(findByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
    });
    it('should throw error if UserRepository.findByEmail find a user', async () => {
        await createUser.execute(makeFakeRequest());
        const promise = createUser.execute(makeFakeRequest());
        await expect(promise).rejects.toThrow();
    });
    it('should returns a new user on success', async () => {
        const response = await createUser.execute(makeFakeRequest());
        expect(response).toBeTruthy();
        expect(response.name).toEqual('any_name');
    });
});
