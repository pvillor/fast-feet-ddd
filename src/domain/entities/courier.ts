import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"

interface CourierProps {
  name: string
  cpf: string
}

export class Courier extends Entity<CourierProps> {
  static create(
    props: CourierProps,
    id?: UniqueEntityId
  ) {
    const courier = new Courier({
      ...props
    }, id)

    return courier
  }
}