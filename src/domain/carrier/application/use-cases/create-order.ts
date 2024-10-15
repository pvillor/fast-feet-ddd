import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { OrdersRepository } from '../repositories/order-repository'

import { Order } from '../../enterprise/entities/order'
import { Either, right } from '@/core/either'

interface CreateOrderUseCaseRequest {
  courierId: string
  recipientId: string
}

type CreateOrderUseCaseResponse = Either<
  null,
  {
    order: Order
  }
>

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {
    //
  }

  async execute({
    courierId,
    recipientId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      recipientId: new UniqueEntityId(recipientId),
      courierId: new UniqueEntityId(courierId),
    })

    await this.ordersRepository.create(order)

    return right({ order })
  }
}
