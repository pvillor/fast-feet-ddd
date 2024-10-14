import { RecipientsRepository } from '../repositories/recipient-repository'

interface DeleteRecipientUseCaseRequest {
  recipientId: string
}

interface DeleteRecipientUseCaseResponse {
  //
}

export class DeleteRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {
    //
  }

  async execute({
    recipientId,
  }: DeleteRecipientUseCaseRequest): Promise<DeleteRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipientId)

    if (!recipient) {
      throw new Error('Recipient not found')
    }

    await this.recipientsRepository.delete(recipient)

    return {}
  }
}
