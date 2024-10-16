import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Order, OrderProps } from '@/domain/carrier/enterprise/entities/order'

export function makeOrder(override: Partial<OrderProps>, id?: UniqueEntityId) {
  const order = Order.create(
    {
      recipientId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return order
}
