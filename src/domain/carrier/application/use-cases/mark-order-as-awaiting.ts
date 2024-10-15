import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import {
  OrderStatus,
  Status,
} from '../../enterprise/entities/value-objects/order-status'
import { OrdersRepository } from '../repositories/order-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface MarkOrderAsAwaitingUseCaseRequest {
  orderId: string
}

type MarkOrderAsAwaitingUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

export class MarkOrderAsAwaitingUseCase {
  constructor(private ordersRepository: OrdersRepository) {
    //
  }

  async execute({
    orderId,
  }: MarkOrderAsAwaitingUseCaseRequest): Promise<MarkOrderAsAwaitingUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    order.status = new OrderStatus(Status.Awaiting)
    order.availableAt = new Date()

    await this.ordersRepository.save(order)

    return right({ order })
  }
}
