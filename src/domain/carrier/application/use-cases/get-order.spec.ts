import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { GetOrderUseCase } from './get-order'
import { makeOrder } from 'test/factories/make-order'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: GetOrderUseCase

describe('Get Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new GetOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to create a order', async () => {
    const newOrder = makeOrder({}, new UniqueEntityId('order-1'))
    await inMemoryOrdersRepository.create(newOrder)

    const { order } = await sut.execute({
      orderId: 'order-1',
    })

    expect(order.id).toBeTruthy()
    expect(order.courierId).toEqual(newOrder.courierId)
    expect(order.ordererId).toEqual(newOrder.ordererId)
  })
})
