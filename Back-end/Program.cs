using System.IdentityModel.Tokens.Jwt;
using System.Text;
using AutoMapper;
using Backend;
using Backend.Utilidades;
using Backend.Servicios;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NetTopologySuite;
using NetTopologySuite.Geometries;

var builder = WebApplication.CreateBuilder(args);

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton(proveedor => new MapperConfiguration(configuration =>
{
    var geometryFactory = proveedor.GetRequiredService<GeometryFactory>();
    configuration.AddProfile(new AutoMapperProfiles(geometryFactory));
}).CreateMapper());


builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("defaultConnection"),
        sqlServer => sqlServer.UseNetTopologySuite()));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opciones =>
    opciones.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["llavejwt"])),
        ClockSkew = TimeSpan.Zero
    });

builder.Services.AddAuthorization(opciones =>
{
    opciones.AddPolicy("esadmin", policy => policy.RequireClaim("esadmin"));
});

builder.Services.AddSingleton<GeometryFactory>(NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326));
builder.Services.AddOutputCache(opcions =>
{
    opcions.DefaultExpirationTimeSpan = TimeSpan.FromSeconds(60);
});

builder.Services.AddCors(opcions =>
{
    var frontURL = builder.Configuration.GetValue<string>("frontend_url")!.Split(",");
    opcions.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(frontURL)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowAnyOrigin()
        .WithExposedHeaders(["TotalItems"]);
    });
});

builder.Services.AddTransient<IStorageFiles, StorageFilesLocal>();
builder.Services.AddTransient<IServicioUsuarios, ServicioUsuarios>();
builder.Services.AddHttpContextAccessor();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseStaticFiles();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

