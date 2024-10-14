import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { makeOrder } from 'test/factories/make-order'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { MarkOrderAsReturnedUseCase } from './mark-order-as-returned'
import { Status } from '../../enterprise/entities/value-objects/order-status'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: MarkOrderAsReturnedUseCase

describe('Edit Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new MarkOrderAsReturnedUseCase(inMemoryOrdersRepository)
  })

  it('should be able to mark a order as returned', async () => {
    const newOrder = makeOrder({}, new UniqueEntityId('order-1'))

    await inMemoryOrdersRepository.create(newOrder)

    const { order } = await sut.execute({
      orderId: newOrder.id.toValue(),
    })

    expect(order.status.value).toEqual(Status.Returned)
  })
})
