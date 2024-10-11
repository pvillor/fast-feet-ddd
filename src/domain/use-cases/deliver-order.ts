import { UniqueEntityId } from "../../core/entities/unique-entity-id"
import { OrdersRepository } from "../repositories/order-repository"

interface DeliverOrderUseCaseRequest {
  courierId: UniqueEntityId
  recipientId: UniqueEntityId
  orderId: UniqueEntityId
}

export class DeliverOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository
  ) { }

  async execute({ courierId, recipientId, orderId }: DeliverOrderUseCaseRequest) {

  }
}