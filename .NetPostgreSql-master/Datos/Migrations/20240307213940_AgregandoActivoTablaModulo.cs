using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Datos.Migrations
{
    /// <inheritdoc />
    public partial class AgregandoActivoTablaModulo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "modulo",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Eliminado = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("modulo_pk", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "permiso",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("permiso_pk", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "rol",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("rol_pk", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "rol_permiso_modulo",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    rol_id = table.Column<int>(type: "integer", nullable: false),
                    permiso_id = table.Column<int>(type: "integer", nullable: false),
                    modulo_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("rol_permiso_modulo_pk", x => x.id);
                    table.ForeignKey(
                        name: "rol_permiso_modulo___fk_modulo",
                        column: x => x.modulo_id,
                        principalTable: "modulo",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "rol_permiso_modulo___fk_pemiso",
                        column: x => x.permiso_id,
                        principalTable: "permiso",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "rol_permiso_modulo___fk_rol",
                        column: x => x.rol_id,
                        principalTable: "rol",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    correo = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    clave = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    telefono = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    rol_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("usuario_pk", x => x.id);
                    table.ForeignKey(
                        name: "usuario___fk",
                        column: x => x.rol_id,
                        principalTable: "rol",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_rol_permiso_modulo_modulo_id",
                table: "rol_permiso_modulo",
                column: "modulo_id");

            migrationBuilder.CreateIndex(
                name: "IX_rol_permiso_modulo_permiso_id",
                table: "rol_permiso_modulo",
                column: "permiso_id");

            migrationBuilder.CreateIndex(
                name: "IX_rol_permiso_modulo_rol_id",
                table: "rol_permiso_modulo",
                column: "rol_id");

            migrationBuilder.CreateIndex(
                name: "IX_usuario_rol_id",
                table: "usuario",
                column: "rol_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "rol_permiso_modulo");

            migrationBuilder.DropTable(
                name: "usuario");

            migrationBuilder.DropTable(
                name: "modulo");

            migrationBuilder.DropTable(
                name: "permiso");

            migrationBuilder.DropTable(
                name: "rol");
        }
    }
}
