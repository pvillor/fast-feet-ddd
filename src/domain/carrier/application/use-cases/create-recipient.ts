import { RecipientsRepository } from '../repositories/recipient-repository'
import { Recipient } from '../../enterprise/entities/recipient'

interface CreateRecipientUseCaseRequest {
  name: string
  address: string
}

interface CreateRecipientUseCaseResponse {
  recipient: Recipient
}

export class CreateRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {
    //
  }

  async execute({
    name,
    address,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      name,
      address,
    })

    await this.recipientsRepository.create(recipient)

    return { recipient }
  }
}
