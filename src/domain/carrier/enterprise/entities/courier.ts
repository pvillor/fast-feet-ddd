import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CourierProps {
  name: string
  cpf: string
}

export class Courier extends Entity<CourierProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  set cpf(cpf: string) {
    if (cpf.length > 11) {
      throw new Error('Invalid cpf length.')
    }
  }

  static create(props: CourierProps, id?: UniqueEntityId) {
    const courier = new Courier(
      {
        ...props,
      },
      id,
    )

    return courier
  }
}
