using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json;

namespace Backend.Utilidades;

public class TypeBinder<T> : IModelBinder
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        var propertyName = bindingContext.ModelName;
        var value = bindingContext.ValueProvider.GetValue(propertyName);

        if (value == ValueProviderResult.None) return Task.CompletedTask;

        try
        {
            // var deserializeValue = JsonConvert.DeserializeObject<T>(value.FirstValue);
            // bindingContext.Result = ModelBindingResult.Success(deserializeValue);
            var modelType = bindingContext.ModelMetadata.ModelType;
            var deserializeValue = JsonSerializer.Deserialize(
                value.FirstValue!,
                modelType, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            bindingContext.Result = ModelBindingResult.Success(deserializeValue);

        }
        catch (Exception)
        {
            bindingContext.ModelState.TryAddModelError(propertyName, "El valor dado no es del tipo adecuado");
        }

        return Task.CompletedTask;
    }
}
