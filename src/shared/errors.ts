export class UserAlreadyInUse extends Error {
    constructor(msg: string) {
      super(msg);
    }
};

export class UserWasNotCreated extends Error {
  constructor(msg: string) {
    super(msg);
  }
};