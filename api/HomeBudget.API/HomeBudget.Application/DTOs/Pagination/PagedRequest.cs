using HomeBudget.Domain.Enums;

namespace HomeBudget.Application.DTOs.Pagination
{
    public class PagedRequest
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string? Search { get; set; }
        public string? SortBy { get; set; }
        public string? SortDir { get; set; }
        public GroupByEnum GroupBy { get; set; } = GroupByEnum.Pessoa;
        public int Tipo { get; set; } = -1;
    }
}
