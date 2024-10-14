import { Order } from '../../enterprise/entities/order'
import {
  OrderStatus,
  Status,
} from '../../enterprise/entities/value-objects/order-status'
import { OrdersRepository } from '../repositories/order-repository'

interface MarkOrderAsCollectedUseCaseRequest {
  orderId: string
}

interface MarkOrderAsCollectedUseCaseResponse {
  order: Order
}

export class MarkOrderAsCollectedUseCase {
  constructor(private ordersRepository: OrdersRepository) {
    //
  }

  async execute({
    orderId,
  }: MarkOrderAsCollectedUseCaseRequest): Promise<MarkOrderAsCollectedUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    order.status = new OrderStatus(Status.Collected)

    await this.ordersRepository.save(order)

    return { order }
  }
}
