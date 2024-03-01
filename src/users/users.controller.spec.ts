import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('UsersController', () => {
	let controller: UsersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
		})
		.useMocker((token) => {
			const results = [
				{"id": 1, "username": "devlink", "password": "secret"}
			];
			if (token === UsersService) {
				return { findAll: jest.fn().mockResolvedValue(results),  };
			}
			if (typeof token === 'function') {
				const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
				const Mock = moduleMocker.generateFromMetadata(mockMetadata);
				return new Mock();
			}
		})
		.compile();

		controller = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return an empty array', async () => {
		const result = [{"id": 1, "username": "devlink", "password": "secret"}];
		expect(await controller.findAll()).toStrictEqual(result);
	});
/* 
	it('should return a new user after insert', async () => {
		const result = {"username": "developer", "password": "secret" };
		expect(await controller.create(result)).toEqual(result);
	});

	it('should return a user', async () => {
		const result = {};
		expect(await controller.findOne('1')).not.toBe(null);
	}) */
});
