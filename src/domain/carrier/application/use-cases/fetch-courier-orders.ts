import { OrdersRepository } from '../repositories/order-repository'
import { Order } from '../../enterprise/entities/order'
import { CouriersRepository } from '../repositories/courier-repository'

interface FetchCourierOrdersUseCaseRequest {
  courierId: string
}

interface FetchCourierOrdersUseCaseResponse {
  orders: Order[]
}

export class FetchCourierOrdersUseCase {
  constructor(
    private couriersRepository: CouriersRepository,
    private ordersRepository: OrdersRepository,
  ) {
    //
  }

  async execute({
    courierId,
  }: FetchCourierOrdersUseCaseRequest): Promise<FetchCourierOrdersUseCaseResponse> {
    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      throw new Error('Courier not found')
    }

    const orders = await this.ordersRepository.findManyByCourierId(
      courier.id.toString(),
    )

    return { orders }
  }
}
