using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Book_Review_Store.Migrations
{
    /// <inheritdoc />
    public partial class Updatedreviewtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Books_BookModelId",
                table: "Reviews");

            migrationBuilder.AlterColumn<int>(
                name: "BookModelId",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Books_BookModelId",
                table: "Reviews",
                column: "BookModelId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Books_BookModelId",
                table: "Reviews");

            migrationBuilder.AlterColumn<int>(
                name: "BookModelId",
                table: "Reviews",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Books_BookModelId",
                table: "Reviews",
                column: "BookModelId",
                principalTable: "Books",
                principalColumn: "Id");
        }
    }
}
