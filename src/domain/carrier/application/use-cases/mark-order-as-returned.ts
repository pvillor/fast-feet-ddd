import { Order } from '../../enterprise/entities/order'
import {
  OrderStatus,
  Status,
} from '../../enterprise/entities/value-objects/order-status'
import { OrdersRepository } from '../repositories/order-repository'

interface MarkOrderAsReturnedUseCaseRequest {
  orderId: string
}

interface MarkOrderAsReturnedUseCaseResponse {
  order: Order
}

export class MarkOrderAsReturnedUseCase {
  constructor(private ordersRepository: OrdersRepository) {
    //
  }

  async execute({
    orderId,
  }: MarkOrderAsReturnedUseCaseRequest): Promise<MarkOrderAsReturnedUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    order.status = new OrderStatus(Status.Returned)

    await this.ordersRepository.save(order)

    return { order }
  }
}
