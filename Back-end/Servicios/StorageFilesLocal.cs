using System;

namespace Backend.Servicios;

public class StorageFilesLocal : IStorageFiles
{
    private readonly IWebHostEnvironment env;
    private readonly IHttpContextAccessor httpContextAccessor;

    public StorageFilesLocal(IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor)
    {
        this.env = env;
        this.httpContextAccessor = httpContextAccessor;
    }
    public Task DeleteFile(string path, string container)
    {
        if (string.IsNullOrEmpty(path)) return Task.CompletedTask;

        var fileName = Path.GetFileName(path);
        var fileDirectory = Path.Combine(env.WebRootPath, container, fileName);

        if (File.Exists(fileDirectory))
        {
            File.Delete(fileDirectory);
        }
        return Task.CompletedTask;
    }

    public async Task<string> EditFile(string container, IFormFile file, string path)
    {
        await DeleteFile(path, container);
        return await SaveFile(container, file);
    }

    public async Task<string> SaveFile(string container, IFormFile file)
    {
        var extension = Path.GetExtension(file.FileName);
        var filenName = $"{Guid.NewGuid()}{extension}";
        string folder = Path.Combine(env.WebRootPath, container);

        if (!Directory.Exists(folder))
        {
            Directory.CreateDirectory(folder);
        }

        string path = Path.Combine(folder, filenName);
        using (var memoryStream = new MemoryStream())
        {
            await file.CopyToAsync(memoryStream);
            var content = memoryStream.ToArray();
            await File.WriteAllBytesAsync(path, content);
        }

        var currentURL = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
        var pathDB = Path.Combine(currentURL, container, filenName).Replace("\\", "/");
        return pathDB;
    }
}
