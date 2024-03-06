using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Datos.Models;
namespace Datos;

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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Modulo>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("modulo");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Permiso>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("permiso_pk");

            entity.ToTable("permiso");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Descripcion).HasColumnName("descripcion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("rol");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<RolPermisoModulo>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("rol_permiso_modulo");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ModuloId).HasColumnName("modulo_id");
            entity.Property(e => e.PermisoId).HasColumnName("permiso_id");
            entity.Property(e => e.RolId).HasColumnName("rol_id");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("usuario_pk");

            entity.ToTable("usuario");

            entity.HasIndex(e => e.Id, "usuario_pk_2").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Clave)
                .HasMaxLength(50)
                .HasColumnName("clave");
            entity.Property(e => e.Correo)
                .HasMaxLength(100)
                .HasColumnName("correo");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.RolId).HasColumnName("rol_id");
            entity.Property(e => e.Telefono)
                .HasColumnType("character varying")
                .HasColumnName("telefono");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
