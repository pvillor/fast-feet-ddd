import { OrderStatus, Status } from "./value-objects/order-status"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"
import { Optional } from "../../core/types/optional"

interface OrderProps {
  ordererId: UniqueEntityId
  courierId: UniqueEntityId
  status: OrderStatus
  orderedAt: Date
  dispatchedAt?: Date
  retrievedAt?: Date
  deliveredAt?: Date
}

export class Order extends Entity<OrderProps> {

  static create(props: Optional<OrderProps, 'status' | 'orderedAt'>, id?: UniqueEntityId) {
    const order = new Order({
      ...props,
      status: new OrderStatus(Status.Processing),
      orderedAt: new Date()
    }, id)

    return order
  }
}