import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import {
  OrderStatus,
  Status,
} from '../../enterprise/entities/value-objects/order-status'
import { OrdersRepository } from '../repositories/order-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface MarkOrderAsDeliveredUseCaseRequest {
  orderId: string
}

type MarkOrderAsDeliveredUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

export class MarkOrderAsDeliveredUseCase {
  constructor(private ordersRepository: OrdersRepository) {
    //
  }

  async execute({
    orderId,
  }: MarkOrderAsDeliveredUseCaseRequest): Promise<MarkOrderAsDeliveredUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    order.status = new OrderStatus(Status.Delivered)

    await this.ordersRepository.save(order)

    return right({ order })
  }
}
