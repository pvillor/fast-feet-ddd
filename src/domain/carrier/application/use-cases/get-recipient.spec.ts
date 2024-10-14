import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { GetRecipientUseCase } from './get-recipient'
import { makeRecipient } from 'test/factories/make-recipient'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: GetRecipientUseCase

describe('Get Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    sut = new GetRecipientUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to create a recipient', async () => {
    const newRecipient = makeRecipient({}, new UniqueEntityId('recipient-1'))

    await inMemoryRecipientsRepository.create(newRecipient)

    const { recipient } = await sut.execute({
      recipientId: 'recipient-1',
    })

    expect(recipient.id).toBeTruthy()
    expect(recipient.name).toEqual(newRecipient.name)
  })
})
