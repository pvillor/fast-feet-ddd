import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { OrdersRepository } from '@/domain/carrier/application/repositories/order-repository'
import { OrderCreatedEvent } from '@/domain/carrier/enterprise/events/order-created'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnOrderCreated implements EventHandler {
  constructor(
    private ordersRepository: OrdersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewOrderNotification.bind(this),
      OrderCreatedEvent.name,
    )
  }

  private async sendNewOrderNotification({ order }: OrderCreatedEvent) {
    await this.sendNotification.execute({
      recipientId: order.recipientId.toString(),
      title: 'New order confirmed!',
      content: `Order confirmed at ${order.orderedAt.getHours()}:${order.orderedAt.getMinutes()}`,
    })
  }
}
