using System.ComponentModel.DataAnnotations;
using Backend.Validaciones;

namespace Backend.Entidades;

public class Genero : IValidatableObject
{
    public int Id { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [StringLength(maximumLength: 10)]
    //[FirstLetterUpperCase]
    public string? Nombre { get; set; }

    [Range(18, 120)]
    public int Edad { get; set; }

    [CreditCard]
    public string? TarjetaCredito { get; set; }

    [Url]
    public string? URL { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (!string.IsNullOrEmpty(Nombre))
        {
            var firstLetter = Nombre[0].ToString();
            if (firstLetter != firstLetter.ToUpper())
            {
                yield return new ValidationResult("La primera letra debe de ser mayúscula",
                [nameof(Nombre)]);
            }
        }
    }
}
