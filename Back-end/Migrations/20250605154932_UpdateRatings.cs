using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRatings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_AspNetUsers_UsuarioId1",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_UsuarioId1",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "UsuarioId1",
                table: "Ratings");

            migrationBuilder.AlterColumn<string>(
                name: "UsuarioId",
                table: "Ratings",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_UsuarioId",
                table: "Ratings",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_AspNetUsers_UsuarioId",
                table: "Ratings",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_AspNetUsers_UsuarioId",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_UsuarioId",
                table: "Ratings");

            migrationBuilder.AlterColumn<int>(
                name: "UsuarioId",
                table: "Ratings",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "UsuarioId1",
                table: "Ratings",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_UsuarioId1",
                table: "Ratings",
                column: "UsuarioId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_AspNetUsers_UsuarioId1",
                table: "Ratings",
                column: "UsuarioId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
