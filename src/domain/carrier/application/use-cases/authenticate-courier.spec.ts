import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers-repository'
import { AuthenticateCourierUseCase } from './authenticate-courier'
import { makeCourier } from 'test/factories/make-courier'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryCouriersRepository: InMemoryCouriersRepository
let sut: AuthenticateCourierUseCase

describe('Authenticate Courier', () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    sut = new AuthenticateCourierUseCase(inMemoryCouriersRepository)
  })

  it('should be able to authenticate as courier', async () => {
    const newCourier = await makeCourier(
      {
        cpf: '00000000000',
        passwordHash: '1234',
      },
      new UniqueEntityId('courier-1'),
    )

    inMemoryCouriersRepository.create(newCourier)

    const { courier } = await sut.execute({
      cpf: '00000000000',
      password: '1234',
    })

    expect(courier.id.toString()).toEqual('courier-1')
  })
})
