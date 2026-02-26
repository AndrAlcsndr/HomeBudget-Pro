namespace HomeBudget.Application.Common
{
    public class OperationResult<T>
    {
        public bool Success { get; init; }
        public T? Data { get; init; }
        public string? Message { get; init; }
        public string? Title { get; init; }
        public int StatusCode { get; init; } = 200;

        public static OperationResult<T> Ok(T data, string? message = null)
            => new() { Success = true, Data = data, Message = message, StatusCode = 200 };

        public static OperationResult<T> NoContent(string? message = null)
            => new() { Success = true, Data = default, Message = message, StatusCode = 204 };

        public static OperationResult<T> Fail(string message, int statusCode = 400, string? title = null)
            => new() { Success = false, Message = message, Title = title, StatusCode = statusCode };
    }
}
