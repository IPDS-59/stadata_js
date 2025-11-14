import { Result } from 'neverthrow';
import { Failure } from '../failures/Failure';

/**
 * Abstract base class for all use cases
 * Implements the Command pattern for business logic
 *
 * @template Params - The input parameters type
 * @template Type - The return type on success
 */
export abstract class UseCase<Params, Type> {
  /**
   * Executes the use case
   *
   * @param params - Input parameters for the use case
   * @returns A Result containing either the success value or a Failure
   */
  abstract execute(params: Params): Promise<Result<Type, Failure>>;

  /**
   * Optional cleanup method called when use case is disposed
   */
  dispose?(): void;
}

/**
 * Use case that doesn't require parameters
 */
export abstract class NoParamsUseCase<Type> extends UseCase<void, Type> {
  /**
   * Executes the use case without parameters
   */
  abstract execute(): Promise<Result<Type, Failure>>;

  /**
   * Convenience method to call execute without parameters
   */
  call(): Promise<Result<Type, Failure>> {
    return this.execute();
  }
}
