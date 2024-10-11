export enum Status {
  Processing = 'processing',
  Dispatched = 'dispatched',
  Pending = 'pending',
  Collected = 'collected',
  Delivered = 'delivered',
  Canceled = 'canceled',
}

export class OrderStatus {
  public value: Status

  constructor(value: Status) {
    this.value = value
  }
}
