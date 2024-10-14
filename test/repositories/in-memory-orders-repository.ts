import { OrdersRepository } from '@/domain/carrier/application/repositories/order-repository'
import { Order } from '@/domain/carrier/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(order: Order) {
    this.items.push(order)
  }
}
