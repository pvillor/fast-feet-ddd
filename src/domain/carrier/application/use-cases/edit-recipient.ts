import { RecipientsRepository } from '../repositories/recipient-repository'

interface EditRecipientUseCaseRequest {
  recipientId: string
  name: string
  address: string
}

interface EditRecipientUseCaseResponse {
  //
}

export class EditRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {
    //
  }

  async execute({
    recipientId,
    name,
    address,
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipientId)

    if (!recipient) {
      throw new Error('Recipient not found')
    }

    recipient.name = name
    recipient.address = address

    await this.recipientsRepository.save(recipient)

    return {}
  }
}
