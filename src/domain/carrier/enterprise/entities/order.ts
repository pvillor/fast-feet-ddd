import { AggregateRoot } from '@/core/entities/aggregate-root'
import { OrderStatus, Status } from './value-objects/order-status'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { OrderCreatedEvent } from '../events/order-created'

export interface OrderProps {
  recipientId: UniqueEntityId
  courierId?: UniqueEntityId | null
  photoId?: UniqueEntityId | null
  status: OrderStatus
  orderedAt: Date
  availableAt?: Date | null
  collectedAt?: Date | null
  deliveredAt?: Date | null
}

export class Order extends AggregateRoot<OrderProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get courierId() {
    return this.props.courierId
  }

  set courierId(courierId: UniqueEntityId | null | undefined) {
    this.props.courierId = courierId
  }

  get photoId() {
    return this.props.photoId
  }

  set photoId(photoId: UniqueEntityId | null | undefined) {
    this.props.photoId = photoId
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

  get availableAt() {
    return this.props.availableAt
  }

  set availableAt(availableAt: Date | null | undefined) {
    this.props.availableAt = availableAt
  }

  get collectedAt() {
    return this.props.collectedAt
  }

  set collectedAt(collectedAt: Date | null | undefined) {
    this.props.collectedAt = collectedAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  set deliveredAt(deliveredAt: Date | null | undefined) {
    this.props.deliveredAt = deliveredAt
  }

  static create(
    props: Optional<OrderProps, 'status' | 'orderedAt' | 'courierId'>,
    id?: UniqueEntityId,
  ) {
    const order = new Order(
      {
        ...props,
        courierId: props.courierId ?? null,
        status: new OrderStatus(Status.Processing),
        orderedAt: new Date(),
      },
      id,
    )

    const isNewOrder = !id

    if (isNewOrder) {
      order.addDomainEvent(new OrderCreatedEvent(order))
    }

    return order
  }
}
