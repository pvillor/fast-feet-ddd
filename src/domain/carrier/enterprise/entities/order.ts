import { OrderStatus, Status } from './value-objects/order-status'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface OrderProps {
  recipientId: UniqueEntityId
  courierId: UniqueEntityId
  status: OrderStatus
  orderedAt: Date
  dispatchedAt?: Date | null
  retrievedAt?: Date | null
  deliveredAt?: Date | null
}

export class Order extends Entity<OrderProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get courierId() {
    return this.props.courierId
  }

  get status() {
    return this.props.status
  }

  set status(status: OrderStatus) {
    this.props.status = status
  }

  get orderedAt() {
    return this.props.orderedAt
  }

  get dispatchedAt() {
    return this.props.dispatchedAt
  }

  get retrievedAt() {
    return this.props.retrievedAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  static create(
    props: Optional<OrderProps, 'status' | 'orderedAt'>,
    id?: UniqueEntityId,
  ) {
    const order = new Order(
      {
        ...props,
        status: new OrderStatus(Status.Processing),
        orderedAt: new Date(),
      },
      id,
    )

    return order
  }
}
