import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import {
  OrderStatus,
  Status,
} from '../../enterprise/entities/value-objects/order-status'
import { OrdersRepository } from '../repositories/order-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface MarkOrderAsCollectedUseCaseRequest {
  orderId: string
}

type MarkOrderAsCollectedUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

export class MarkOrderAsCollectedUseCase {
  constructor(private ordersRepository: OrdersRepository) {
    //
  }

  async execute({
    orderId,
  }: MarkOrderAsCollectedUseCaseRequest): Promise<MarkOrderAsCollectedUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    order.status = new OrderStatus(Status.Collected)

    await this.ordersRepository.save(order)

    return right({ order })
  }
}
