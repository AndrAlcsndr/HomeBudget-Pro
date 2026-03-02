namespace HomeBudget.Application.DTOs
{
    public class GenericOptionsDto
    {
        public string Label { get; set; } = string.Empty;
        public string ValueString { get; set; } = string.Empty;
        public Guid Value { get; set; }
    }
}
