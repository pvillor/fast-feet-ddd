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
      cpf: '000000000000',
    })

    expect(courier.id).toBeTruthy()
    expect(inMemoryCouriersRepository.items[0].id).toEqual(courier.id)
  })
})
