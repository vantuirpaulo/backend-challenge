export class GeneralError extends Error {
  constructor(message: string){
    super();
    this.message = message;
  }

  getStatusCode() {
    if(this instanceof BadRequest){
      return 400;
    }
    if(this instanceof NotFound){
      return 404;
    }
    return 500;
  }
}

export class BadRequest extends GeneralError {};
export class NotFound extends GeneralError {};
