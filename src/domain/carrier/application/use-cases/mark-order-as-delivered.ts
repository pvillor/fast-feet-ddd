import { Order } from '../../enterprise/entities/order'
import {
  OrderStatus,
  Status,
} from '../../enterprise/entities/value-objects/order-status'
import { OrdersRepository } from '../repositories/order-repository'

interface MarkOrderAsDeliveredUseCaseRequest {
  orderId: string
}

interface MarkOrderAsDeliveredUseCaseResponse {
  order: Order
}

export class MarkOrderAsDeliveredUseCase {
  constructor(private ordersRepository: OrdersRepository) {
    //
  }

  async execute({
    orderId,
  }: MarkOrderAsDeliveredUseCaseRequest): Promise<MarkOrderAsDeliveredUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    order.status = new OrderStatus(Status.Delivered)

    await this.ordersRepository.save(order)

    return { order }
  }
}
