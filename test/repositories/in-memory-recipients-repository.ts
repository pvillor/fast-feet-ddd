import { RecipientsRepository } from '@/domain/carrier/application/repositories/recipient-repository'
import { Recipient } from '@/domain/carrier/enterprise/entities/recipient'

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient) {
    this.items.push(recipient)
  }
}
