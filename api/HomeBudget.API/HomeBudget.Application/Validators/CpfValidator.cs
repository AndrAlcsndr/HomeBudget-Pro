namespace HomeBudget.Application.Validators
{
    public static class CpfValidator
    {
        public static string OnlyDigits(string? v) =>
            new string((v ?? string.Empty).Where(char.IsDigit).ToArray());

        public static bool IsValid(string? value)
        {
            var digits = OnlyDigits(value);
            if (digits.Length == 11) return IsValidCpf(digits);
            return false;
        }

        private static bool IsValidCpf(string cpf)
        {
            if (cpf.Length != 11) return false;
            if (cpf.Distinct().Count() == 1) return false;

            int[] mult1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] mult2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

            var temp = cpf.Substring(0, 9);
            var sum = 0;
            for (int i = 0; i < 9; i++) sum += (temp[i] - '0') * mult1[i];
            var resto = sum % 11;
            var dig1 = (resto < 2) ? 0 : 11 - resto;

            temp += dig1;
            sum = 0;
            for (int i = 0; i < 10; i++) sum += (temp[i] - '0') * mult2[i];
            resto = sum % 11;
            var dig2 = (resto < 2) ? 0 : 11 - resto;

            return cpf.EndsWith($"{dig1}{dig2}");
        }
    }
}
