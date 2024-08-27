export class SupportCase {
  TrackingNumber: string ="";
  Type: any;
  Description: string ="";
  CreatedOn: string ="";
  Status: Status = Status.PENDING;
}

enum Status {
  COMPLETE = 'Complete',
  INPROGRESS = 'In Progress',
  PENDING = 'Pending',
}