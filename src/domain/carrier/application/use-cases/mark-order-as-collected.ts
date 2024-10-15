import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import {
  OrderStatus,
  Status,
} from '../../enterprise/entities/value-objects/order-status'
import { OrdersRepository } from '../repositories/order-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CouriersRepository } from '../repositories/courier-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface MarkOrderAsCollectedUseCaseRequest {
  orderId: string
  courierId: string
}

type MarkOrderAsCollectedUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

export class MarkOrderAsCollectedUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private couriersRepository: CouriersRepository,
  ) {
    //
  }

  async execute({
    orderId,
    courierId,
  }: MarkOrderAsCollectedUseCaseRequest): Promise<MarkOrderAsCollectedUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      return left(new ResourceNotFoundError())
    }

    order.courierId = new UniqueEntityId(courierId)
    order.status = new OrderStatus(Status.Collected)
    order.collectedAt = new Date()

    await this.ordersRepository.save(order)

    return right({ order })
  }
}
