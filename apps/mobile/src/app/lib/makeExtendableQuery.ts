import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query'

export type ExtendableQueryCallback<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends Record<string, unknown> = Record<string, unknown>
> = (
  queryKey: TQueryKey,
  options: UseQueryOptions<TQueryFnData, TError, TData, [TQueryKey]>
) => ReturnType<typeof useQuery<TQueryFnData, TError, TData, [TQueryKey]>>

export function makeExtendableQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends Record<string, unknown> = Record<string, unknown>
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, [TQueryKey]>,
  options: UseQueryOptions<TQueryFnData, TError, TData, [TQueryKey]> = {}
): ExtendableQueryCallback<TQueryFnData, TError, TData, TQueryKey> {
  return (
    extendedQueryKey: TQueryKey,
    extendedOptions: UseQueryOptions<TQueryFnData, TError, TData, [TQueryKey]>
  ) => {
    return useQuery<TQueryFnData, TError, TData, [TQueryKey]>(
      [{ ...queryKey, ...extendedQueryKey }],
      queryFn,
      {
        ...options,
        ...extendedOptions,
      }
    )
  }
}
