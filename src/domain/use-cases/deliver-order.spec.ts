import { DeliverOrderUseCase } from './deliver-order'
import { OrdersRepository } from '../repositories/order-repository'
import { Order } from '../entities/order'

const fakeOrdersRepository: OrdersRepository = {
  create: async (order: Order) => {
    return
  }
}

test('deliver an order', async () => {

})