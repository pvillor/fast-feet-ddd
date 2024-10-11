import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"

interface RecipientProps {
  name: string
  address: string
}

export class Recipient extends Entity<RecipientProps> {
  static create(
    props: RecipientProps,
    id?: UniqueEntityId
  ) {
    const recipient = new Recipient({
      ...props
    }, id)

    return recipient
  }
}