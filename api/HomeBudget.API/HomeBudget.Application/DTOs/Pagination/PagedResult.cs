namespace HomeBudget.Application.DTOs.Pagination
{
    public class PagedResult<T>
    {
        public IReadOnlyList<T> Items { get; set; } = Array.Empty<T>();
        public int Total { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)Total / Math.Max(1, PageSize));
        public bool HasNext => Page < TotalPages;
        public bool HasPrev => Page > 1;
    }
}
