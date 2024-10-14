import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { CreateOrderUseCase } from './create-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: CreateOrderUseCase

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new CreateOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to create an order', async () => {
    const { order } = await sut.execute({
      courierId: '1',
      recipientId: '1',
    })

    expect(order.id).toBeTruthy()
    expect(inMemoryOrdersRepository.items[0].id).toEqual(order.id)
  })
})
