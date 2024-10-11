import { expect, test } from 'vitest'
import { DeliverOrderUseCase } from './deliver-order'
import { OrdersRepository } from '../repositories/order-repository'
import { Order } from '../entities/order'

const fakeOrdersRepository: OrdersRepository = {
  create: async (order: Order) => {
    return
  }
}

test('deliver an order', async () => {
  const deliverOrder = new DeliverOrderUseCase(fakeOrdersRepository)

  const order = await deliverOrder.execute({
    courierId: '1',
    recipientId: '1',
    orderId: '1'
  })

  expect(order.status).toEqual('delivered')
})