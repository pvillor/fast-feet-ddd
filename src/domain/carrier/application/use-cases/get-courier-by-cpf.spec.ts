import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers-repository'

import { GetCourierByCpfUseCase } from './get-courier-by-cpf'

import { makeCourier } from 'test/factories/make-courier'

let inMemoryCouriersRepository: InMemoryCouriersRepository

let sut: GetCourierByCpfUseCase

describe('Get Courier By CPF', () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()

    sut = new GetCourierByCpfUseCase(inMemoryCouriersRepository)
  })

  it('should be able to create a courier', async () => {
    const newCourier = makeCourier({
      cpf: '1234',
    })

    await inMemoryCouriersRepository.create(newCourier)

    const { courier } = await sut.execute({
      cpf: '1234',
    })

    expect(courier.id).toBeTruthy()

    expect(courier.name).toEqual(newCourier.name)
  })
})
