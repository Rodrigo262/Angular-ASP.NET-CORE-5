using System.ComponentModel.DataAnnotations;

namespace Backend.Validaciones;

public class FirstLetterUpperCaseAttribute : ValidationAttribute
{

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null || string.IsNullOrEmpty(value.ToString())) return ValidationResult.Success;

        var firstLetter = value.ToString()[0].ToString();

        if (firstLetter != firstLetter.ToUpper())
        {
            return new ValidationResult("La primera letra debe ser mayúscula");
        }
        return ValidationResult.Success;
    }
}
