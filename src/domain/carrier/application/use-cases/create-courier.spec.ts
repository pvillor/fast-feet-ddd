import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers-repository'
import { CreateCourierUseCase } from './create-courier'

let inMemoryCouriersRepository: InMemoryCouriersRepository
let sut: CreateCourierUseCase

describe('Create Courier', () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    sut = new CreateCourierUseCase(inMemoryCouriersRepository)
  })

  it('should be able to create a courier', async () => {
    const { courier } = await sut.execute({
      name: 'John Doe',
      cpf: '00000000000',
      password: '1234',
    })

    expect(courier.id).toBeTruthy()
    expect(inMemoryCouriersRepository.items[0].id).toEqual(courier.id)

    expect(() =>
      sut.execute({
        name: 'John Doe',
        cpf: '1234',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
