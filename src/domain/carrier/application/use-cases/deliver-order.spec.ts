import { DeliverOrderUseCase } from './deliver-order'
import { OrdersRepository } from '../repositories/order-repository'
import { Order } from '../../enterprise/entities/order'

const fakeOrdersRepository: OrdersRepository = {
  create: async (order: Order) => { },
}

test('deliver an order', async () => { })
