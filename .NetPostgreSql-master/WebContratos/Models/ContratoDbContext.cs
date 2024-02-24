using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebContratos.Models;

public partial class ContratoDbContext : DbContext
{
    public ContratoDbContext()
    {
    }

    public ContratoDbContext(DbContextOptions<ContratoDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Modulo> Modulos { get; set; }

    public virtual DbSet<Permiso> Permisos { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<RolPermisoModulo> RolPermisoModulos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<UsuarioRol> UsuarioRols { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Modulo>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("modulo");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Permiso>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("permiso");

            entity.Property(e => e.Descripcion).HasColumnName("descripcion");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("rol");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<RolPermisoModulo>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("rol_permiso_modulo");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.ModuloId).HasColumnName("modulo_id");
            entity.Property(e => e.PermisoId).HasColumnName("permiso_id");
            entity.Property(e => e.RolId).HasColumnName("rol_id");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("usuario");

            entity.Property(e => e.Clave)
                .HasMaxLength(50)
                .HasColumnName("clave");
            entity.Property(e => e.Correo)
                .HasMaxLength(100)
                .HasColumnName("correo");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<UsuarioRol>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("usuario_rol");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.RolId).HasColumnName("rol_id");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
