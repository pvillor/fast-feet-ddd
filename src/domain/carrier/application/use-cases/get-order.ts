import { OrdersRepository } from '../repositories/order-repository'
import { Order } from '../../enterprise/entities/order'

interface GetOrderUseCaseRequest {
  orderId: string
}

interface GetOrderUseCaseResponse {
  order: Order
}

export class GetOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {
    //
  }

  async execute({
    orderId,
  }: GetOrderUseCaseRequest): Promise<GetOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    return { order }
  }
}
