export default interface ModelBase {
  id: bigint;
  createdAt: Date;
  modifiedAt?: Date | null | undefined;
}