import { Order } from '../../enterprise/entities/order'
import {
  OrderStatus,
  Status,
} from '../../enterprise/entities/value-objects/order-status'
import { OrdersRepository } from '../repositories/order-repository'

interface MarkOrderAsAwaitingUseCaseRequest {
  orderId: string
}

interface MarkOrderAsAwaitingUseCaseResponse {
  order: Order
}

export class MarkOrderAsAwaitingUseCase {
  constructor(private ordersRepository: OrdersRepository) {
    //
  }

  async execute({
    orderId,
  }: MarkOrderAsAwaitingUseCaseRequest): Promise<MarkOrderAsAwaitingUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    order.status = new OrderStatus(Status.Awaiting)

    await this.ordersRepository.save(order)

    return { order }
  }
}
