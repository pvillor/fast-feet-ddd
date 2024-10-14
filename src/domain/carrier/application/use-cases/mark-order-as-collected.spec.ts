import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { makeOrder } from 'test/factories/make-order'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { MarkOrderAsCollectedUseCase } from './mark-order-as-collected'
import { Status } from '../../enterprise/entities/value-objects/order-status'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: MarkOrderAsCollectedUseCase

describe('Mark Order As Collected', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new MarkOrderAsCollectedUseCase(inMemoryOrdersRepository)
  })

  it('should be able to mark an order as collected', async () => {
    const newOrder = makeOrder({}, new UniqueEntityId('order-1'))

    await inMemoryOrdersRepository.create(newOrder)

    const { order } = await sut.execute({
      orderId: newOrder.id.toValue(),
    })

    expect(order.status.value).toEqual(Status.Collected)
  })
})
