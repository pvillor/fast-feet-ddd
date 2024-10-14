import { OrdersRepository } from '../repositories/order-repository'

interface DeleteOrderUseCaseRequest {
  orderId: string
}

interface DeleteOrderUseCaseResponse {
  //
}

export class DeleteOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {
    //
  }

  async execute({
    orderId,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    await this.ordersRepository.delete(order)

    return {}
  }
}
